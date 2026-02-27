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
        if (pos1 == null || pos2 == null) return null;

        int minX = Math.min(pos1.getX(), pos2.getX());
        int maxX = Math.max(pos1.getX(), pos2.getX());
        int minY = Math.min(pos1.getY(), pos2.getY());
        int maxY = Math.max(pos1.getY(), pos2.getY());
        int minZ = Math.min(pos1.getZ(), pos2.getZ());
        int maxZ = Math.max(pos1.getZ(), pos2.getZ());

        int width = maxX - minX + 1;
        int height = maxY - minY + 1;
        int depth = maxZ - minZ + 1;

        List<ExportBlockData> blocks = new ArrayList<>();
        
        for (int y = 0; y < height; y++) {
            for (int z = 0; z < depth; z++) {
                for (int x = 0; x < width; x++) {
                    BlockPos pos = new BlockPos(minX + x, minY + y, minZ + z);
                    BlockState state = level.getBlockState(pos);
                    String blockId = getBlockStateString(state);
                    if (!blockId.equals("minecraft:air")) {
                        blocks.add(new ExportBlockData(x, y, z, blockId));
                    }
                }
            }
        }

        return generatePythonCode(blocks, width, depth, height, description);
    }

    private static String generatePythonCode(List<ExportBlockData> blocks, int width, int depth, int height, String description) {
        StringBuilder py = new StringBuilder();
        py.append("# ").append(description != null ? description : "Exported structure").append("\n");
        py.append("# Size: ").append(width).append("x").append(depth).append("x").append(height).append("\n");
        py.append("def build_creation(start_x, start_y, start_z):\n");
        
        for (ExportBlockData block : blocks) {
            String blockName = block.blockId.replace("minecraft:", "");
            String baseBlock = blockName.split("\\[")[0];
            
            if (block.blockId.contains("[")) {
                String statesStr = block.blockId.substring(block.blockId.indexOf('[') + 1, block.blockId.indexOf(']'));
                py.append("    placeBlock(start_x + ").append(block.x).append(", start_y + ").append(block.y)
                  .append(", start_z + ").append(block.z).append(", \"").append(baseBlock)
                  .append("\", block_states={");
                
                String[] pairs = statesStr.split(",");
                for (int i = 0; i < pairs.length; i++) {
                    String[] kv = pairs[i].split("=");
                    py.append("\"").append(kv[0]).append("\": \"").append(kv[1]).append("\"");
                    if (i < pairs.length - 1) py.append(", ");
                }
                py.append("})\n");
            } else {
                py.append("    placeBlock(start_x + ").append(block.x).append(", start_y + ").append(block.y)
                  .append(", start_z + ").append(block.z).append(", \"").append(blockName).append("\")\n");
            }
        }
        
        return py.toString();
    }

    public static boolean saveStructureToFile(String pyCode, String filename) {
        try {
            Path exportDir = Paths.get("../../promptcraft_backend/priv/examples/exported");
            Files.createDirectories(exportDir);
            String cleanFilename = filename.replaceAll("[^a-zA-Z0-9_-]", "_").toLowerCase();
            if (!cleanFilename.endsWith(".py")) cleanFilename += ".py";
            Files.writeString(exportDir.resolve(cleanFilename), pyCode, 
                StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            PromptCraftMod.LOGGER.info("Structure saved: {}", cleanFilename);
            return true;
        } catch (IOException e) {
            PromptCraftMod.LOGGER.error("Failed to save structure", e);
            return false;
        }
    }

    private static String getBlockStateString(BlockState state) {
        String blockId = state.getBlock().builtInRegistryHolder().key().location().toString();
        Collection<Property<?>> properties = state.getProperties();
        
        if (properties.isEmpty() || blockId.equals("minecraft:air")) return blockId;

        StringBuilder props = new StringBuilder();
        boolean first = true;
        for (Property<?> property : properties) {
            if (!first) props.append(",");
            props.append(property.getName()).append("=").append(state.getValue(property));
            first = false;
        }
        return blockId + "[" + props + "]";
    }

    private static class ExportBlockData {
        final int x, y, z;
        final String blockId;

        ExportBlockData(int x, int y, int z, String blockId) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.blockId = blockId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ExportBlockData that = (ExportBlockData) o;
            return x == that.x && y == that.y && z == that.z;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y, z);
        }
    }
}
