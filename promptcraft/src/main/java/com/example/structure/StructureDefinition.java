package com.example.structure;

import java.util.List;
import java.util.Map;

public class StructureDefinition {
    private final Map<String, String> palette;
    private final StructureSize size;
    private final List<StructureLayer> layers;

    public StructureDefinition(Map<String, String> palette, StructureSize size, List<StructureLayer> layers) {
        this.palette = palette;
        this.size = size;
        this.layers = layers;
    }

    public Map<String, String> getPalette() {
        return palette;
    }

    public StructureSize getSize() {
        return size;
    }

    public List<StructureLayer> getLayers() {
        return layers;
    }
}
