package com.example.structure;

public class StructureSize {
    private final int width;
    private final int depth;
    private final int height;

    public StructureSize(int width, int depth, int height) {
        this.width = width;
        this.depth = depth;
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public int getDepth() {
        return depth;
    }

    public int getHeight() {
        return height;
    }
}
