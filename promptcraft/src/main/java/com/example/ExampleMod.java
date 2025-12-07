package com.example;

import com.example.http.BackendClient;
import com.example.structure.StructureRegistry;
import net.fabricmc.api.ModInitializer;

import net.fabricmc.fabric.api.command.v2.CommandRegistrationCallback;
import net.minecraft.commands.Commands;
import net.minecraft.commands.arguments.MessageArgument;
import net.minecraft.core.component.DataComponents;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.component.CustomData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

public class ExampleMod implements ModInitializer {
    public static final String MOD_ID = "promptcraft";
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {

        LOGGER.info("Initializing Promptcraft...");

        // Custom block
        ModBlocks.register();

        CommandRegistrationCallback.EVENT.register((dispatcher, registryAccess, environment) -> {

            // AI Structure command
            dispatcher.register(
                    Commands.literal("askAI")
                            .then(Commands.argument("prompt", MessageArgument.message())
                                    .executes(context -> {
                                        ServerPlayer player = context.getSource().getPlayerOrException();
                                        String prompt = MessageArgument.getMessage(context, "prompt").getString();

                                        player.sendSystemMessage(Component.literal("Generating structure: " + prompt));
                                        player.sendSystemMessage(Component.literal("Please wait..."));

                                        BackendClient.requestStructure(
                                                prompt,
                                                structure -> {
                                                    // Success - register structure and give block
                                                    UUID structureId = StructureRegistry.register(structure);

                                                    ItemStack builderBlock = new ItemStack(ModBlocks.AI_BUILDER_BLOCK);
                                                    
                                                    // Store UUID in NBT
                                                    var tag = builderBlock.getOrDefault(DataComponents.CUSTOM_DATA, CustomData.EMPTY).copyTag();
                                                    tag.putString("structure_id", structureId.toString());
                                                    builderBlock.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));

                                                    player.getInventory().add(builderBlock);
                                                    player.sendSystemMessage(Component.literal("Structure generated! Check your inventory."));
                                                },
                                                error -> {
                                                    // Error
                                                    player.sendSystemMessage(Component.literal("Error: " + error));
                                                    LOGGER.error("Structure generation failed: {}", error);
                                                }
                                        );

                                        return 1;
                                    })
                            )
            );
        });

        LOGGER.info("Promptcraft initialized!");
    }
}
