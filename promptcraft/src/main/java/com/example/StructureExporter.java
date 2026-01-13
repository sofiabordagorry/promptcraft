package com.example;

import net.minecraft.core.BlockPos;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.block.state.properties.Property;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.*;

public class StructureExporter {
    private static final Map<UUID, BlockPos> pos1Map = new HashMap<>();
    private static final Map<UUID, BlockPos> pos2Map = new HashMap<>();

    public static void setPos1(ServerPlayer player, BlockPos pos) {
        pos1Map.put(player.getUUID(), pos);
    }

    public static void setPos2(ServerPlayer player, BlockPos pos) {
        pos2Map.put(player.getUUID(), pos);
    }

    public static BlockPos getPos1(ServerPlayer player) {
        return pos1Map.get(player.getUUID());
    }

    public static BlockPos getPos2(ServerPlayer player) {
        return pos2Map.get(player.getUUID());
    }

    public static boolean hasSelection(ServerPlayer player) {
        return pos1Map.containsKey(player.getUUID()) && pos2Map.containsKey(player.getUUID());
    }

    public static String exportStructure(ServerPlayer player, ServerLevel level, String description) {
        BlockPos pos1 = getPos1(player);
        BlockPos pos2 = getPos2(player);

        if (pos1 == null || pos2 == null) {
            return null;
        }

        // Calculate bounds (min/max corners)
        int minX = Math.min(pos1.getX(), pos2.getX());
        int maxX = Math.max(pos1.getX(), pos2.getX());
        int minY = Math.min(pos1.getY(), pos2.getY());
        int maxY = Math.max(pos1.getY(), pos2.getY());
        int minZ = Math.min(pos1.getZ(), pos2.getZ());
        int maxZ = Math.max(pos1.getZ(), pos2.getZ());

        int width = maxX - minX + 1;
        int height = maxY - minY + 1;
        int depth = maxZ - minZ + 1;

        // Collect all blocks with their positions
        List<BlockData> blocks = new ArrayList<>();
        
        for (int y = 0; y < height; y++) {
            for (int z = 0; z < depth; z++) {
                for (int x = 0; x < width; x++) {
                    BlockPos pos = new BlockPos(minX + x, minY + y, minZ + z);
                    BlockState state = level.getBlockState(pos);
                    String blockId = getBlockStateString(state);
                    
                    // Skip air blocks
                    if (!blockId.equals("minecraft:air")) {
                        blocks.add(new BlockData(x, y, z, blockId));
                    }
                }
            }
        }

        // Generate JavaScript code
        return generateJavaScriptCode(blocks, width, depth, height, description);
    }

    private static String generateJavaScriptCode(List<BlockData> blocks, int width, int depth, int height, String description) {
        StringBuilder js = new StringBuilder();
        
        // Add description as comment
        js.append("// ").append(description != null ? description : "Exported structure").append("\n");
        js.append("// Size: ").append(width).append("x").append(depth).append("x").append(height).append("\n");
        js.append("function buildCreation(startX, startY, startZ) {\n");
        
        // Analyze structure to use safeFill where possible
        Map<String, List<BlockData>> blocksByType = new HashMap<>();
        for (BlockData block : blocks) {
            blocksByType.computeIfAbsent(block.blockId, k -> new ArrayList<>()).add(block);
        }
        
        // Try to optimize with safeFill for common patterns
        Set<BlockData> processedBlocks = new HashSet<>();
        
        // Look for rectangular fills
        for (Map.Entry<String, List<BlockData>> entry : blocksByType.entrySet()) {
            String blockType = entry.getKey();
            List<BlockData> blocksOfType = entry.getValue();
            
            // Try to find rectangular regions (foundations, walls, floors)
            List<Rectangle> rectangles = findRectangles(blocksOfType, processedBlocks);
            
            for (Rectangle rect : rectangles) {
                String blockName = blockType.replace("minecraft:", "");
                
                if (rect.hasBlockStates()) {
                    js.append("  safeFill(startX + ").append(rect.minX).append(", startY + ").append(rect.minY)
                      .append(", startZ + ").append(rect.minZ).append(", startX + ").append(rect.maxX)
                      .append(", startY + ").append(rect.maxY).append(", startZ + ").append(rect.maxZ)
                      .append(", \"").append(blockName).append("\", {blockStates: ")
                      .append(rect.blockStates).append("});\n");
                } else {
                    js.append("  safeFill(startX + ").append(rect.minX).append(", startY + ").append(rect.minY)
                      .append(", startZ + ").append(rect.minZ).append(", startX + ").append(rect.maxX)
                      .append(", startY + ").append(rect.maxY).append(", startZ + ").append(rect.maxZ)
                      .append(", \"").append(blockName).append("\");\n");
                }
            }
        }
        
        // Place remaining individual blocks
        for (BlockData block : blocks) {
            if (processedBlocks.contains(block)) {
                continue;
            }
            
            String blockName = block.blockId.replace("minecraft:", "");
            String baseBlock = blockName.split("\\[")[0];
            
            if (block.blockId.contains("[")) {
                // Has block states
                String statesStr = block.blockId.substring(block.blockId.indexOf('[') + 1, block.blockId.indexOf(']'));
                js.append("  safeSetBlock(startX + ").append(block.x).append(", startY + ").append(block.y)
                  .append(", startZ + ").append(block.z).append(", \"").append(baseBlock)
                  .append("\", {blockStates: {");
                
                String[] pairs = statesStr.split(",");
                for (int i = 0; i < pairs.length; i++) {
                    String[] kv = pairs[i].split("=");
                    js.append(kv[0]).append(": \"").append(kv[1]).append("\"");
                    if (i < pairs.length - 1) {
                        js.append(", ");
                    }
                }
                js.append("}});\n");
            } else {
                js.append("  safeSetBlock(startX + ").append(block.x).append(", startY + ").append(block.y)
                  .append(", startZ + ").append(block.z).append(", \"").append(blockName).append("\");\n");
            }
        }
        
        js.append("}\n");
        
        return js.toString();
    }

    private static List<Rectangle> findRectangles(List<BlockData> blocks, Set<BlockData> processedBlocks) {
        List<Rectangle> rectangles = new ArrayList<>();
        
        // Group blocks by Y level to find floors/ceilings
        Map<Integer, List<BlockData>> blocksByY = new HashMap<>();
        for (BlockData block : blocks) {
            if (!processedBlocks.contains(block)) {
                blocksByY.computeIfAbsent(block.y, k -> new ArrayList<>()).add(block);
            }
        }
        
        // For each Y level, try to find rectangular regions
        for (Map.Entry<Integer, List<BlockData>> entry : blocksByY.entrySet()) {
            int y = entry.getKey();
            List<BlockData> levelBlocks = entry.getValue();
            
            // Sort by position
            levelBlocks.sort(Comparator.comparingInt((BlockData b) -> b.z).thenComparingInt(b -> b.x));
            
            // Try to find filled rectangles on this level
            for (int i = 0; i < levelBlocks.size(); i++) {
                BlockData start = levelBlocks.get(i);
                if (processedBlocks.contains(start)) continue;
                
                // Try to extend in X and Z directions
                int maxX = start.x;
                int maxZ = start.z;
                
                // Find max Z that forms a line
                for (int j = i + 1; j < levelBlocks.size(); j++) {
                    BlockData next = levelBlocks.get(j);
                    if (next.x == start.x && next.z == maxZ + 1 && !processedBlocks.contains(next)) {
                        maxZ = next.z;
                    } else {
                        break;
                    }
                }
                
                // Try to extend in X direction maintaining the Z range
                boolean canExtendX = true;
                int testX = start.x + 1;
                while (canExtendX) {
                    boolean foundAll = true;
                    for (int z = start.z; z <= maxZ; z++) {
                        boolean found = false;
                        for (BlockData block : levelBlocks) {
                            if (block.x == testX && block.z == z && !processedBlocks.contains(block)) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            foundAll = false;
                            break;
                        }
                    }
                    
                    if (foundAll) {
                        maxX = testX;
                        testX++;
                    } else {
                        canExtendX = false;
                    }
                }
                
                // If we found a rectangle of at least 2x2, use it
                if ((maxX - start.x + 1) * (maxZ - start.z + 1) >= 4) {
                    Rectangle rect = new Rectangle(start.x, start.x == maxX ? start.x : maxX, 
                                                   y, y, 
                                                   start.z, start.z == maxZ ? start.z : maxZ,
                                                   start.blockId);
                    rectangles.add(rect);
                    
                    // Mark all blocks in this rectangle as processed
                    for (BlockData block : levelBlocks) {
                        if (block.x >= start.x && block.x <= maxX && 
                            block.z >= start.z && block.z <= maxZ && 
                            block.y == y) {
                            processedBlocks.add(block);
                        }
                    }
                }
            }
        }
        
        return rectangles;
    }

    public static boolean saveStructureToFile(String jsCode, String filename) {
        try {
            Path exportDir = Paths.get("../../promptcraft_backend/priv/examples/exported");
            Files.createDirectories(exportDir);
            
            // Clean filename (remove special characters)
            String cleanFilename = filename.replaceAll("[^a-zA-Z0-9_-]", "_").toLowerCase();
            if (!cleanFilename.endsWith(".js")) {
                cleanFilename += ".js";
            }
            
            Path filePath = exportDir.resolve(cleanFilename);
            
            // Write JavaScript to file
            Files.writeString(filePath, jsCode, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            
            ExampleMod.LOGGER.info("Structure saved to: {}", filePath.toAbsolutePath());
            return true;
        } catch (IOException e) {
            ExampleMod.LOGGER.error("Failed to save structure to file", e);
            return false;
        }
    }

    private static String getBlockStateString(BlockState state) {
        String blockId = state.getBlock().builtInRegistryHolder().key().location().toString();
        
        // Check if block has properties
        Collection<Property<?>> properties = state.getProperties();
        if (properties.isEmpty() || blockId.equals("minecraft:air")) {
            return blockId;
        }

        // Build property string
        StringBuilder props = new StringBuilder();
        boolean first = true;
        for (Property<?> property : properties) {
            if (!first) {
                props.append(",");
            }
            props.append(property.getName()).append("=").append(state.getValue(property).toString());
            first = false;
        }

        return blockId + "[" + props.toString() + "]";
    }

    private static class BlockData {
        final int x, y, z;
        final String blockId;

        BlockData(int x, int y, int z, String blockId) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.blockId = blockId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            BlockData blockData = (BlockData) o;
            return x == blockData.x && y == blockData.y && z == blockData.z;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y, z);
        }
    }

    private static class Rectangle {
        final int minX, maxX, minY, maxY, minZ, maxZ;
        final String blockId;
        final String blockStates;

        Rectangle(int minX, int maxX, int minY, int maxY, int minZ, int maxZ, String blockId) {
            this.minX = minX;
            this.maxX = maxX;
            this.minY = minY;
            this.maxY = maxY;
            this.minZ = minZ;
            this.maxZ = maxZ;
            this.blockId = blockId;
            
            // Extract block states if present
            if (blockId.contains("[")) {
                this.blockStates = "{" + blockId.substring(blockId.indexOf('[') + 1, blockId.indexOf(']'))
                    .replace("=", ": \"")
                    .replace(",", "\", ")
                    + "\"}";
            } else {
                this.blockStates = null;
            }
        }

        boolean hasBlockStates() {
            return blockStates != null;
        }
    }
}
