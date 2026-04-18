package com.example.structure;

import net.minecraft.server.MinecraftServer;

import java.util.UUID;

public class StructureRegistry {
    private static MinecraftServer server;

    public static void init(MinecraftServer minecraftServer) {
        server = minecraftServer;
    }

    private static StructurePersistentState getState() {
        return StructurePersistentState.getOrCreate(server.overworld());
    }

    public static UUID register(StructureDefinition structure) {
        return getState().register(structure);
    }

    public static StructureDefinition get(UUID id) {
        return getState().get(id);
    }

    public static boolean has(UUID id) {
        return getState().has(id);
    }

    public static void remove(UUID id) {
        getState().remove(id);
    }
}
