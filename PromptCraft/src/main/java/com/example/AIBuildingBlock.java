package com.example;

import net.minecraft.core.BlockPos;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.network.chat.Component;

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
            player.sendSystemMessage(Component.literal("Building..."));
        }

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

                    serverLevel.setBlockAndUpdate(targetPos, blockToPlace);
                }
            }
        }
    }
}
