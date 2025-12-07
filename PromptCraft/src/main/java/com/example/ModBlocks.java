package com.example;

import net.minecraft.core.Registry;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockBehaviour;

public class ModBlocks {

    // Nuestro bloque constructor tonto
    public static final Block AI_BUILDER_BLOCK = registerBlock(
            "ai_builder_block",
            new AIBuildingBlock(
                    BlockBehaviour.Properties.of()
                            .strength(1.5F)
            )
    );

    private static Block registerBlock(String name, Block block) {
        ResourceLocation id = ResourceLocation.fromNamespaceAndPath(ExampleMod.MOD_ID, name);

        Registry.register(BuiltInRegistries.BLOCK, id, block);

        BlockItem blockItem = new BlockItem(block, new Item.Properties());
        Registry.register(BuiltInRegistries.ITEM, id, blockItem);

        return block;
    }

    public static void register() {
        ExampleMod.LOGGER.info("Registering blocks for {}", ExampleMod.MOD_ID);
    }
}
