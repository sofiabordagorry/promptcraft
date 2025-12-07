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
            buildDefaultStructure(serverLevel, pos);
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

    private void buildDefaultStructure(ServerLevel level, BlockPos pos) {
        BlockPos start = pos;

        for (int y = 0; y < 3; y++) {
            for (int x = 0; x < 3; x++) {
                for (int z = -2; z <= 0; z++) {
                    BlockPos targetPos = start.offset(x, y, z);
                    BlockState blockToPlace;

                    if (y == 2) {
                        blockToPlace = Blocks.OAK_PLANKS.defaultBlockState();
                    } else {
                        blockToPlace = Blocks.COBBLESTONE.defaultBlockState();
                    }

                    level.setBlockAndUpdate(targetPos, blockToPlace);
                }
            }
        }
    }

    private void buildStructure(ServerLevel level, BlockPos startPos, StructureDefinition structure, LivingEntity placer) {
        Map<String, String> palette = structure.getPalette();
        List<StructureLayer> layers = structure.getLayers();

        int blocksPlaced = 0;
        int depth = structure.getSize().getDepth();

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

                    BlockState blockState = getBlockState(blockId);
                    if (blockState == null) {
                        ExampleMod.LOGGER.warn("Invalid block ID: {}", blockId);
                        continue;
                    }

                    BlockPos targetPos = startPos.offset(x, y, z - depth + 1);
                    level.setBlockAndUpdate(targetPos, blockState);
                    blocksPlaced++;
                }
            }
        }

        if (placer instanceof ServerPlayer player) {
            player.sendSystemMessage(Component.literal("Structure built!"));
        }
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
