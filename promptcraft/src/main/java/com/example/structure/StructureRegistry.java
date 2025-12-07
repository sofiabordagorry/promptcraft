package com.example.structure;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class StructureRegistry {
    private static final Map<UUID, StructureDefinition> structures = new ConcurrentHashMap<>();

    public static UUID register(StructureDefinition structure) {
        UUID id = UUID.randomUUID();
        structures.put(id, structure);
        return id;
    }

    public static StructureDefinition get(UUID id) {
        return structures.get(id);
    }

    public static boolean has(UUID id) {
        return structures.containsKey(id);
    }

    public static void remove(UUID id) {
        structures.remove(id);
    }
}
