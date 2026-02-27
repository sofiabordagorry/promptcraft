package com.example.structure;

import java.util.Map;

public class BlockData {
    private final int x;
    private final int y;
    private final int z;
    private final String block;
    private final Map<String, String> blockStates;

    public BlockData(int x, int y, int z, String block, Map<String, String> blockStates) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.block = block;
        this.blockStates = blockStates;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getZ() {
        return z;
    }

    public String getBlock() {
        return block;
    }

    public Map<String, String> getBlockStates() {
        return blockStates;
    }

    public String getBlockWithStates() {
        if (blockStates == null || blockStates.isEmpty()) {
            return block;
        }

        StringBuilder sb = new StringBuilder(block);
        sb.append("[");
        boolean first = true;
        for (Map.Entry<String, String> entry : blockStates.entrySet()) {
            if (!first) {
                sb.append(",");
            }
            sb.append(entry.getKey()).append("=").append(entry.getValue());
            first = false;
        }
        sb.append("]");
        return sb.toString();
    }
}
