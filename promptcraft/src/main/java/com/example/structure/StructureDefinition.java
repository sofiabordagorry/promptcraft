package com.example.structure;

import java.util.List;

public class StructureDefinition {
    private final List<BlockData> blocks;
    private final StructureSize size;

    public StructureDefinition(List<BlockData> blocks, StructureSize size) {
        this.blocks = blocks;
        this.size = size;
    }

    public List<BlockData> getBlocks() {
        return blocks;
    }

    public StructureSize getSize() {
        return size;
    }
}
