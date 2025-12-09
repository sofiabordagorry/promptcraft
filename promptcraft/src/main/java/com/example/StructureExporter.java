package com.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
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

        // Scan blocks and build palette
        Map<String, Character> blockToSymbol = new HashMap<>();
        Map<Character, String> palette = new LinkedHashMap<>();
        char currentSymbol = 'A';

        // Reserve # for air
        palette.put('#', "minecraft:air");
        blockToSymbol.put("minecraft:air", '#');

        // Store layers
        List<LayerData> layers = new ArrayList<>();

        for (int y = 0; y < height; y++) {
            List<String> rows = new ArrayList<>();
            
            for (int z = 0; z < depth; z++) {
                StringBuilder row = new StringBuilder();
                
                for (int x = 0; x < width; x++) {
                    BlockPos pos = new BlockPos(minX + x, minY + y, minZ + z);
                    BlockState state = level.getBlockState(pos);
                    String blockId = getBlockStateString(state);

                    // Get or create symbol for this block
                    Character symbol = blockToSymbol.get(blockId);
                    if (symbol == null) {
                        symbol = currentSymbol++;
                        blockToSymbol.put(blockId, symbol);
                        palette.put(symbol, blockId);
                        
                        // Skip letters that might be confusing
                        if (currentSymbol == '[' || currentSymbol == '\\' || currentSymbol == ']' || currentSymbol == '^') {
                            currentSymbol = 'a';
                        }
                    }
                    
                    row.append(symbol);
                }
                
                rows.add(row.toString());
            }
            
            layers.add(new LayerData(y, rows));
        }

        // Build JSON
        JsonObject root = new JsonObject();
        root.addProperty("description", description != null ? description : "Exported structure");

        JsonObject structure = new JsonObject();
        
        // Add palette
        JsonObject paletteJson = new JsonObject();
        for (Map.Entry<Character, String> entry : palette.entrySet()) {
            paletteJson.addProperty(String.valueOf(entry.getKey()), entry.getValue());
        }
        structure.add("palette", paletteJson);

        // Add size
        JsonObject size = new JsonObject();
        size.addProperty("width", width);
        size.addProperty("depth", depth);
        size.addProperty("height", height);
        structure.add("size", size);

        // Add layers
        JsonArray layersJson = new JsonArray();
        for (LayerData layer : layers) {
            JsonObject layerJson = new JsonObject();
            layerJson.addProperty("y", layer.y);
            
            JsonArray rowsJson = new JsonArray();
            for (String row : layer.rows) {
                rowsJson.add(row);
            }
            layerJson.add("rows", rowsJson);
            
            layersJson.add(layerJson);
        }
        structure.add("layers", layersJson);

        root.add("structure", structure);

        // Convert to pretty JSON string
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(root);
    }

    public static boolean saveStructureToFile(String json, String filename) {
        try {
            Path exportDir = Paths.get("../../promptcraft_backend/priv/examples/exported");
            Files.createDirectories(exportDir);
            
            // Clean filename (remove special characters)
            String cleanFilename = filename.replaceAll("[^a-zA-Z0-9_-]", "_").toLowerCase();
            if (!cleanFilename.endsWith(".json")) {
                cleanFilename += ".json";
            }
            
            Path filePath = exportDir.resolve(cleanFilename);
            
            // Write JSON to file
            Files.writeString(filePath, json, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            
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

    private static class LayerData {
        final int y;
        final List<String> rows;

        LayerData(int y, List<String> rows) {
            this.y = y;
            this.rows = rows;
        }
    }
}
