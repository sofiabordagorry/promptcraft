package com.example.http;

import com.example.ExampleMod;
import com.example.structure.StructureDefinition;
import com.example.structure.StructureLayer;
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
    private static final String BACKEND_URL = "http://localhost:4000/api/generate";
    private static final String EXAMPLES_URL = "http://localhost:4000/api/examples";
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
                maxSize.addProperty("width", 16);
                maxSize.addProperty("depth", 16);
                maxSize.addProperty("height", 16);
                requestBody.add("max_size", maxSize);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BACKEND_URL))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(gson.toJson(requestBody)))
                        .timeout(Duration.ofSeconds(30))
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    StructureDefinition structure = parseStructure(response.body());
                    onSuccess.accept(structure);
                } else {
                    onError.accept("Backend error: " + response.statusCode() + " - " + response.body());
                }
            } catch (Exception e) {
                ExampleMod.LOGGER.error("Error requesting structure from backend", e);
                onError.accept("Error: " + e.getMessage());
            }
        });
    }

    private static StructureDefinition parseStructure(String json) {
        JsonObject root = gson.fromJson(json, JsonObject.class);

        // Parse palette
        JsonObject paletteJson = root.getAsJsonObject("palette");
        Map<String, String> palette = new HashMap<>();
        for (String key : paletteJson.keySet()) {
            palette.put(key, paletteJson.get(key).getAsString());
        }

        // Parse size
        JsonObject sizeJson = root.getAsJsonObject("size");
        StructureSize size = new StructureSize(
                sizeJson.get("width").getAsInt(),
                sizeJson.get("depth").getAsInt(),
                sizeJson.get("height").getAsInt()
        );

        // Parse layers
        JsonArray layersJson = root.getAsJsonArray("layers");
        List<StructureLayer> layers = new ArrayList<>();
        for (int i = 0; i < layersJson.size(); i++) {
            JsonObject layerJson = layersJson.get(i).getAsJsonObject();
            int y = layerJson.get("y").getAsInt();
            JsonArray rowsJson = layerJson.getAsJsonArray("rows");
            List<String> rows = new ArrayList<>();
            for (int j = 0; j < rowsJson.size(); j++) {
                rows.add(rowsJson.get(j).getAsString());
            }
            layers.add(new StructureLayer(y, rows));
        }

        return new StructureDefinition(palette, size, layers);
    }

    public static void requestExample(String name, Consumer<StructureDefinition> onSuccess, Consumer<String> onError) {
        CompletableFuture.runAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(EXAMPLES_URL + "/" + name))
                        .header("Accept", "application/json")
                        .GET()
                        .timeout(Duration.ofSeconds(10))
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    StructureDefinition structure = parseStructure(response.body());
                    onSuccess.accept(structure);
                } else {
                    onError.accept("Example not found: " + name);
                }
            } catch (Exception e) {
                ExampleMod.LOGGER.error("Error loading example from backend", e);
                onError.accept("Error: " + e.getMessage());
            }
        });
    }
}
