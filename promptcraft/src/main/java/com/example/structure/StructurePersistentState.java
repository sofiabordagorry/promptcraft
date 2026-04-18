package com.example.structure;

import net.minecraft.core.HolderLookup;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.util.datafix.DataFixTypes;
import net.minecraft.world.level.saveddata.SavedData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class StructurePersistentState extends SavedData {
    private static final String DATA_NAME = "promptcraft_structures";

    private final Map<UUID, StructureDefinition> structures = new ConcurrentHashMap<>();

    public static StructurePersistentState getOrCreate(ServerLevel level) {
        return level.getDataStorage().computeIfAbsent(
            new SavedData.Factory<>(
                StructurePersistentState::new,
                (tag, registries) -> StructurePersistentState.load(tag),
                DataFixTypes.SAVED_DATA_RANDOM_SEQUENCES
            ),
            DATA_NAME
        );
    }

    public UUID register(StructureDefinition structure) {
        UUID id = UUID.randomUUID();
        structures.put(id, structure);
        setDirty();
        return id;
    }

    public StructureDefinition get(UUID id) {
        return structures.get(id);
    }

    public boolean has(UUID id) {
        return structures.containsKey(id);
    }

    public void remove(UUID id) {
        structures.remove(id);
        setDirty();
    }

    @Override
    public CompoundTag save(CompoundTag tag, HolderLookup.Provider registries) {
        CompoundTag structuresTag = new CompoundTag();
        for (Map.Entry<UUID, StructureDefinition> entry : structures.entrySet()) {
            structuresTag.put(entry.getKey().toString(), serializeStructure(entry.getValue()));
        }
        tag.put("structures", structuresTag);
        return tag;
    }

    public static StructurePersistentState load(CompoundTag tag) {
        StructurePersistentState state = new StructurePersistentState();
        CompoundTag structuresTag = tag.getCompound("structures");
        for (String key : structuresTag.getAllKeys()) {
            try {
                UUID id = UUID.fromString(key);
                StructureDefinition structure = deserializeStructure(structuresTag.getCompound(key));
                if (structure != null) {
                    state.structures.put(id, structure);
                }
            } catch (IllegalArgumentException ignored) {}
        }
        return state;
    }

    private static CompoundTag serializeStructure(StructureDefinition structure) {
        CompoundTag tag = new CompoundTag();
        tag.putInt("width", structure.getSize().getWidth());
        tag.putInt("depth", structure.getSize().getDepth());
        tag.putInt("height", structure.getSize().getHeight());

        ListTag blocksTag = new ListTag();
        for (BlockData block : structure.getBlocks()) {
            CompoundTag blockTag = new CompoundTag();
            blockTag.putInt("x", block.getX());
            blockTag.putInt("y", block.getY());
            blockTag.putInt("z", block.getZ());
            blockTag.putString("block", block.getBlock());

            CompoundTag statesTag = new CompoundTag();
            if (block.getBlockStates() != null) {
                for (Map.Entry<String, String> e : block.getBlockStates().entrySet()) {
                    statesTag.putString(e.getKey(), e.getValue());
                }
            }
            blockTag.put("states", statesTag);
            blocksTag.add(blockTag);
        }
        tag.put("blocks", blocksTag);
        return tag;
    }

    private static StructureDefinition deserializeStructure(CompoundTag tag) {
        int width = tag.getInt("width");
        int depth = tag.getInt("depth");
        int height = tag.getInt("height");
        StructureSize size = new StructureSize(width, depth, height);

        ListTag blocksTag = tag.getList("blocks", Tag.TAG_COMPOUND);
        List<BlockData> blocks = new ArrayList<>();
        for (int i = 0; i < blocksTag.size(); i++) {
            CompoundTag blockTag = blocksTag.getCompound(i);
            int x = blockTag.getInt("x");
            int y = blockTag.getInt("y");
            int z = blockTag.getInt("z");
            String block = blockTag.getString("block");

            Map<String, String> states = new HashMap<>();
            CompoundTag statesTag = blockTag.getCompound("states");
            for (String key : statesTag.getAllKeys()) {
                states.put(key, statesTag.getString(key));
            }
            blocks.add(new BlockData(x, y, z, block, states));
        }
        return new StructureDefinition(blocks, size);
    }
}
