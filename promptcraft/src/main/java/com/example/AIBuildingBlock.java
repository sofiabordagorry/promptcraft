package com.example;

import com.example.structure.StructureDefinition;
import com.example.structure.StructureLayer;
import com.example.structure.StructureRegistry;
import net.minecraft.core.BlockPos;
import net.minecraft.core.component.DataComponents;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.component.CustomData;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.network.chat.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class AIBuildingBlock extends Block {

    public AIBuildingBlock(BlockBehaviour.Properties properties) {
        super(properties);
    }

    @Override
    public void setPlacedBy(Level level,
                            BlockPos pos,
                            BlockState state,
                            LivingEntity placer,
                            ItemStack stack) {
        super.setPlacedBy(level, pos, state, placer, stack);

        if (level.isClientSide()) {
            return;
        }

        if (!(level instanceof ServerLevel serverLevel)) {
            return;
        }

        if (placer instanceof ServerPlayer player) {
            player.sendSystemMessage(Component.literal("🏗️ Building structure..."));
        }

        // Read structure ID from NBT
        CustomData customData = stack.getOrDefault(DataComponents.CUSTOM_DATA, CustomData.EMPTY);
        String structureIdStr = customData.copyTag().getString("structure_id");

        if (structureIdStr == null || structureIdStr.isEmpty()) {
            // Fallback: build default demo structure
            buildDefaultStructure(serverLevel, pos, placer);
            return;
        }

        try {
            UUID structureId = UUID.fromString(structureIdStr);
            StructureDefinition structure = StructureRegistry.get(structureId);

            if (structure == null) {
                if (placer instanceof ServerPlayer player) {
                    player.sendSystemMessage(Component.literal("❌ Structure not found!"));
                }
                return;
            }

            // Build structure from definition
            buildStructure(serverLevel, pos, structure, placer);

        } catch (IllegalArgumentException e) {
            ExampleMod.LOGGER.error("Invalid structure UUID: {}", structureIdStr, e);
            if (placer instanceof ServerPlayer player) {
                player.sendSystemMessage(Component.literal("❌ Invalid structure data!"));
            }
        }
    }

        private void buildDefaultStructure(ServerLevel level, BlockPos startPos, LivingEntity placer) {
            // Simple 3x3x3 cube of stone as a fallback
            int size = 3;
            int blocksPlaced = 0;
    
            for (int x = 0; x < size; x++) {
                for (int y = 0; y < size; y++) {
                    for (int z = 0; z < size; z++) {
                        BlockPos targetPos = startPos.offset(x, y, z);
                        level.setBlockAndUpdate(targetPos, Blocks.STONE.defaultBlockState());
                        blocksPlaced++;
                    }
                }
            }
    
            if (placer instanceof ServerPlayer player) {
                player.sendSystemMessage(Component.literal("Built default structure (" + blocksPlaced + " blocks)"));
            }
        }

    private void buildStructure(ServerLevel level, BlockPos startPos, StructureDefinition structure, LivingEntity placer) {
        Map<String, String> palette = structure.getPalette();
        List<StructureLayer> layers = structure.getLayers();

        int blocksPlaced = 0;
        int depth = structure.getSize().getDepth();
        
        net.minecraft.core.Direction playerFacing = placer.getDirection();

        Map<String, String> skipPositions = new HashMap<>();

        // FIRST PASS: Identify all multiblock positions that need to be skipped
        for (StructureLayer layer : layers) {
            int y = layer.getY();
            List<String> rows = layer.getRows();

            for (int z = 0; z < rows.size(); z++) {
                String row = rows.get(z);
                for (int x = 0; x < row.length(); x++) {
                    char symbol = row.charAt(x);
                    String blockId = palette.get(String.valueOf(symbol));

                    if (blockId == null) continue;

                    // Mark positions that Minecraft will auto-generate
                    if (isTallBlock(blockId)) {
                        String aboveKey = x + "," + (y + 1) + "," + z;
                        skipPositions.put(aboveKey, "door_top");
                    }

                    if (isWideBlock(blockId)) {
                        String nextXKey = (x + 1) + "," + y + "," + z;
                        skipPositions.put(nextXKey, "bed_part");
                    }
                }
            }
        }

        // SECOND PASS: Place blocks, skipping marked positions
        for (StructureLayer layer : layers) {
            int y = layer.getY();
            List<String> rows = layer.getRows();

            for (int z = 0; z < rows.size(); z++) {
                String row = rows.get(z);
                for (int x = 0; x < row.length(); x++) {
                    char symbol = row.charAt(x);
                    String blockId = palette.get(String.valueOf(symbol));

                    if (blockId == null) {
                        ExampleMod.LOGGER.warn("Symbol '{}' not found in palette", symbol);
                        continue;
                    }

                    BlockPos targetPos = startPos.offset(x, y, z - depth + 1);
                    String posKey = x + "," + y + "," + z;

                    // Skip if this position was marked as auto-generated
                    if (skipPositions.containsKey(posKey)) {
                        continue;
                    }

                    // Don't place air blocks (let Minecraft handle empty space)
                    if ("minecraft:air".equals(blockId)) {
                        continue;
                    }

                    if (isTallBlock(blockId)) {
                        BlockState blockState = getBlockState(blockId);
                        if (blockState == null) {
                            ExampleMod.LOGGER.warn("Invalid block ID: {}", blockId);
                            continue;
                        }
                        
                        level.setBlockAndUpdate(targetPos, blockState
                                .setValue(net.minecraft.world.level.block.DoorBlock.HALF, net.minecraft.world.level.block.state.properties.DoubleBlockHalf.LOWER));
                        
                        BlockPos topPos = targetPos.above();
                        level.setBlockAndUpdate(topPos, blockState
                                .setValue(net.minecraft.world.level.block.DoorBlock.HALF, net.minecraft.world.level.block.state.properties.DoubleBlockHalf.UPPER));
                        
                        blocksPlaced += 2;
                        continue;
                    }

                    if (isWideBlock(blockId)) {
                        BlockState blockState = getBlockState(blockId);
                        if (blockState == null) {
                            ExampleMod.LOGGER.warn("Invalid block ID: {}", blockId);
                            continue;
                        }
                        
                        // Calculate head position based on player's facing direction
                        BlockPos headPos = targetPos.relative(playerFacing);
                        
                        level.setBlockAndUpdate(targetPos, blockState
                                .setValue(net.minecraft.world.level.block.BedBlock.PART, net.minecraft.world.level.block.state.properties.BedPart.FOOT)
                                .setValue(net.minecraft.world.level.block.BedBlock.FACING, playerFacing));
                        
                        level.setBlockAndUpdate(headPos, blockState
                                .setValue(net.minecraft.world.level.block.BedBlock.PART, net.minecraft.world.level.block.state.properties.BedPart.HEAD)
                                .setValue(net.minecraft.world.level.block.BedBlock.FACING, playerFacing));
                        
                        blocksPlaced += 2;
                        continue;
                    }

                    BlockState blockState = getBlockState(blockId);
                    if (blockState == null) {
                        ExampleMod.LOGGER.warn("Invalid block ID: {}", blockId);
                        continue;
                    }

                    level.setBlockAndUpdate(targetPos, blockState);
                    blocksPlaced++;
                }
            }
        }

        if (placer instanceof ServerPlayer player) {
            player.sendSystemMessage(Component.literal("Structure built! (" + blocksPlaced + " blocks)"));
        }
    }

    private boolean isTallBlock(String blockId) {
        return blockId != null && blockId.contains("_door") && !blockId.contains("trapdoor");
    }

    private boolean isWideBlock(String blockId) {
        return blockId != null && blockId.contains("_bed");
    }

    private BlockState getBlockState(String blockId) {
        try {
            ResourceLocation location = ResourceLocation.parse(blockId);
            Block block = BuiltInRegistries.BLOCK.get(location);
            return block != null ? block.defaultBlockState() : null;
        } catch (Exception e) {
            return null;
        }
    }
}
