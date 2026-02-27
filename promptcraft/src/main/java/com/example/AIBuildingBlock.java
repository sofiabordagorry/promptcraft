package com.example;

import com.example.structure.StructureDefinition;
import com.example.structure.StructureRegistry;
import com.example.structure.StructureSize;
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

        CustomData customData = stack.getOrDefault(DataComponents.CUSTOM_DATA, CustomData.EMPTY);
        String structureIdStr = customData.copyTag().getString("structure_id");

        if (structureIdStr == null || structureIdStr.isEmpty()) {
            if (placer instanceof ServerPlayer player) {
                player.sendSystemMessage(Component.literal("No structure data found!"));
            }
            return;
        }

        try {
            UUID structureId = UUID.fromString(structureIdStr);
            StructureDefinition structure = StructureRegistry.get(structureId);

            if (structure == null) {
                if (placer instanceof ServerPlayer player) {
                    player.sendSystemMessage(Component.literal("Structure not found!"));
                }
                return;
            }

            BlockPos adjustedPos = calculateSafeStartPosition(pos, placer.getDirection(), structure.getSize());
            buildStructure(serverLevel, adjustedPos, structure, placer);

        } catch (IllegalArgumentException e) {
            PromptCraftMod.LOGGER.error("Invalid structure UUID: {}", structureIdStr, e);
            if (placer instanceof ServerPlayer player) {
                player.sendSystemMessage(Component.literal("Invalid structure data!"));
            }
        }
    }

    private BlockPos calculateSafeStartPosition(BlockPos blockPos, net.minecraft.core.Direction facing, StructureSize size) {
        int offsetDistance = Math.max(size.getWidth(), size.getDepth()) - 5;
        
        return switch (facing) {
            case NORTH -> blockPos.offset(0, 0, -offsetDistance);
            case SOUTH -> blockPos.offset(0, 0, offsetDistance);
            case EAST -> blockPos.offset(offsetDistance, 0, 0);
            case WEST -> blockPos.offset(-offsetDistance, 0, 0);
            default -> blockPos.offset(0, 0, 2);
        };
    }

    private void buildStructure(ServerLevel level, BlockPos startPos, StructureDefinition structure, LivingEntity placer) {
        List<com.example.structure.BlockData> blocks = structure.getBlocks();
        int depth = structure.getSize().getDepth();
        Map<String, String> skipPositions = new HashMap<>();

        for (com.example.structure.BlockData blockData : blocks) {
            String blockId = blockData.getBlock();
            int x = blockData.getX(), y = blockData.getY(), z = blockData.getZ();

            if (isTallBlock(blockId)) {
                skipPositions.put(x + "," + (y + 1) + "," + z, "auto_generated");
            }
            if (isWideBlock(blockId)) {
                skipPositions.put((x + 1) + "," + y + "," + z, "auto_generated");
            }
        }

        int blocksPlaced = 0;
        for (com.example.structure.BlockData blockData : blocks) {
            int x = blockData.getX(), y = blockData.getY(), z = blockData.getZ();
            String blockId = blockData.getBlockWithStates();
            BlockPos targetPos = startPos.offset(x, y, z - depth + 1);
            String posKey = x + "," + y + "," + z;

            if (skipPositions.containsKey(posKey) ||
                "minecraft:air".equals(blockId) || 
                blockId.startsWith("minecraft:air[")) {
                continue;
            }

            if (isTallBlock(blockId)) {
                BlockState state = getBlockState(blockId);
                if (state != null) {
                    level.setBlockAndUpdate(targetPos, state.setValue(
                        net.minecraft.world.level.block.DoorBlock.HALF, 
                        net.minecraft.world.level.block.state.properties.DoubleBlockHalf.LOWER));
                    level.setBlockAndUpdate(targetPos.above(), state.setValue(
                        net.minecraft.world.level.block.DoorBlock.HALF,
                        net.minecraft.world.level.block.state.properties.DoubleBlockHalf.UPPER));
                    blocksPlaced += 2;
                }
                continue;
            }

            if (isWideBlock(blockId)) {
                BlockState state = getBlockState(blockId);
                if (state != null) {
                    net.minecraft.core.Direction facing = state.hasProperty(net.minecraft.world.level.block.BedBlock.FACING) 
                        ? state.getValue(net.minecraft.world.level.block.BedBlock.FACING) 
                        : placer.getDirection();
                    
                    level.setBlockAndUpdate(targetPos, state
                        .setValue(net.minecraft.world.level.block.BedBlock.PART, net.minecraft.world.level.block.state.properties.BedPart.FOOT)
                        .setValue(net.minecraft.world.level.block.BedBlock.FACING, facing));
                    level.setBlockAndUpdate(targetPos.relative(facing), state
                        .setValue(net.minecraft.world.level.block.BedBlock.PART, net.minecraft.world.level.block.state.properties.BedPart.HEAD)
                        .setValue(net.minecraft.world.level.block.BedBlock.FACING, facing));
                    blocksPlaced += 2;
                }
                continue;
            }

            if (blockId.equals("torch") || blockId.startsWith("torch[")) {
                net.minecraft.core.Direction attachTo = findAdjacentSolidWall(level, targetPos);
                if (attachTo != null) {
                    BlockState wallTorch = BuiltInRegistries.BLOCK.get(ResourceLocation.parse("wall_torch")).defaultBlockState();
                    if (wallTorch != null && wallTorch.hasProperty(net.minecraft.world.level.block.WallTorchBlock.FACING)) {
                        level.setBlockAndUpdate(targetPos, wallTorch.setValue(net.minecraft.world.level.block.WallTorchBlock.FACING, attachTo));
                        blocksPlaced++;
                        continue;
                    }
                }
            }

            BlockState state = getBlockState(blockId);
            if (state != null) {
                level.setBlockAndUpdate(targetPos, state);
                blocksPlaced++;
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

    private net.minecraft.core.Direction findAdjacentSolidWall(ServerLevel level, BlockPos pos) {
        for (net.minecraft.core.Direction dir : new net.minecraft.core.Direction[]{
            net.minecraft.core.Direction.NORTH,
            net.minecraft.core.Direction.SOUTH,
            net.minecraft.core.Direction.EAST,
            net.minecraft.core.Direction.WEST
        }) {
            BlockPos adjacent = pos.relative(dir);
            BlockState adjacentState = level.getBlockState(adjacent);
            if (adjacentState.isSolid() && !adjacentState.isAir()) {
                return dir;
            }
        }
        return null;
    }

    private BlockState getBlockState(String blockId) {
        try {
            String blockIdBase = blockId;
            Map<String, String> properties = new HashMap<>();
            
            if (blockId.contains("[") && blockId.endsWith("]")) {
                int bracketIndex = blockId.indexOf('[');
                blockIdBase = blockId.substring(0, bracketIndex);
                String propertiesStr = blockId.substring(bracketIndex + 1, blockId.length() - 1);
                
                if (!propertiesStr.isEmpty()) {
                    for (String prop : propertiesStr.split(",")) {
                        String[] parts = prop.split("=", 2);
                        if (parts.length == 2) {
                            String key = parts[0].trim();
                            String value = parts[1].trim();
                            if (!key.isEmpty() && !value.isEmpty()) {
                                properties.put(key, value);
                            }
                        }
                    }
                }
            }
            
            Block block = BuiltInRegistries.BLOCK.get(ResourceLocation.parse(blockIdBase));
            if (block == null) return null;
            
            BlockState state = block.defaultBlockState();
            for (Map.Entry<String, String> entry : properties.entrySet()) {
                state = applyProperty(state, entry.getKey(), entry.getValue());
            }
            
            return state;
        } catch (Exception e) {
            PromptCraftMod.LOGGER.error("Error parsing block state: {}", blockId, e);
            return null;
        }
    }
    
    private BlockState applyProperty(BlockState state, String propertyName, String value) {
        if (propertyName == null || value == null) return state;
        
        for (net.minecraft.world.level.block.state.properties.Property<?> property : state.getProperties()) {
            if (property.getName().equals(propertyName)) {
                return setPropertyValue(state, property, value);
            }
        }
        return state;
    }
    
    private <T extends Comparable<T>> BlockState setPropertyValue(BlockState state, 
            net.minecraft.world.level.block.state.properties.Property<T> property, String value) {
        return property.getValue(value)
            .map(v -> state.setValue(property, v))
            .orElse(state);
    }
}
