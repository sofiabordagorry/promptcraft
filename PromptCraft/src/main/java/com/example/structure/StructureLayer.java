package com.example.structure;

import java.util.List;

public class StructureLayer {
    private final int y;
    private final List<String> rows;

    public StructureLayer(int y, List<String> rows) {
        this.y = y;
        this.rows = rows;
    }

    public int getY() {
        return y;
    }

    public List<String> getRows() {
        return rows;
    }
}
