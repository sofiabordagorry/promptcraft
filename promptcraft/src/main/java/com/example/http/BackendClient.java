package com.example.http;

import com.example.PromptCraftMod;
import com.example.structure.StructureDefinition;
import com.example.structure.StructureSize;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

public class BackendClient {
    private static final String BACKEND_HOST = System.getProperty("promptcraft.backend", "http://localhost:4000");
    private static final String BACKEND_URL = BACKEND_HOST + "/api/generate";
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    private static final Gson gson = new Gson();

    public static void requestStructure(String prompt, Consumer<StructureDefinition> onSuccess, Consumer<String> onError) {
        CompletableFuture.runAsync(() -> {
            try {
                JsonObject requestBody = new JsonObject();
                requestBody.addProperty("prompt", prompt);

                JsonObject maxSize = new JsonObject();
                maxSize.addProperty("width", 50);
                maxSize.addProperty("depth", 50);
                maxSize.addProperty("height", 50);
                requestBody.add("max_size", maxSize);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BACKEND_URL))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(gson.toJson(requestBody)))
                        .timeout(Duration.ofMinutes(3))
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    StructureDefinition structure = parseStructure(response.body());
                    onSuccess.accept(structure);
                } else {
                    onError.accept("Backend error: " + response.statusCode() + " - " + response.body());
                }
            } catch (Exception e) {
                PromptCraftMod.LOGGER.error("Error requesting structure from backend", e);
                onError.accept("Error: " + e.getMessage());
            }
        });
    }

    private static StructureDefinition parseStructure(String json) {
        JsonObject root = gson.fromJson(json, JsonObject.class);

        // Parse size
        JsonObject sizeJson = root.getAsJsonObject("size");
        StructureSize size = new StructureSize(
                sizeJson.get("width").getAsInt(),
                sizeJson.get("depth").getAsInt(),
                sizeJson.get("height").getAsInt()
        );

        // Parse blocks
        JsonArray blocksJson = root.getAsJsonArray("blocks");
        List<com.example.structure.BlockData> blocks = new ArrayList<>();
        for (int i = 0; i < blocksJson.size(); i++) {
            JsonObject blockJson = blocksJson.get(i).getAsJsonObject();
            int x = blockJson.get("x").getAsInt();
            int y = blockJson.get("y").getAsInt();
            int z = blockJson.get("z").getAsInt();
            String block = blockJson.get("block").getAsString();
            
            Map<String, String> blockStates = new HashMap<>();
            if (blockJson.has("block_states")) {
                JsonObject statesJson = blockJson.getAsJsonObject("block_states");
                for (String key : statesJson.keySet()) {
                    blockStates.put(key, statesJson.get(key).getAsString());
                }
            }
            
            blocks.add(new com.example.structure.BlockData(x, y, z, block, blockStates));
        }

        return new StructureDefinition(blocks, size);
    }
}
