package com.example;

import net.minecraft.core.Registry;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockBehaviour;

public class ModBlocks {

    public static final Block AI_BUILDER_BLOCK = registerBlock(
            "ai_builder_block",
            new AIBuildingBlock(BlockBehaviour.Properties.of().strength(1.5F))
    );

    private static Block registerBlock(String name, Block block) {
        ResourceLocation id = ResourceLocation.fromNamespaceAndPath(PromptCraftMod.MOD_ID, name);
        Registry.register(BuiltInRegistries.BLOCK, id, block);
        Registry.register(BuiltInRegistries.ITEM, id, new BlockItem(block, new Item.Properties()));
        return block;
    }

    public static void register() {
        PromptCraftMod.LOGGER.info("Registering blocks for {}", PromptCraftMod.MOD_ID);
    }
}
