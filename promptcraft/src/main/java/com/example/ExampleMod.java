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
                                                    UUID structureId = StructureRegistry.register(structure);

                                                    ItemStack builderBlock = new ItemStack(ModBlocks.AI_BUILDER_BLOCK);
                                                    
                                                    var tag = builderBlock.getOrDefault(DataComponents.CUSTOM_DATA, CustomData.EMPTY).copyTag();
                                                    tag.putString("structure_id", structureId.toString());
                                                    builderBlock.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));

                                                    player.getInventory().add(builderBlock);
                                                    player.sendSystemMessage(Component.literal("Structure generated! Check your inventory."));
                                                },
                                                error -> {
                                                    player.sendSystemMessage(Component.literal("Error: " + error));
                                                    LOGGER.error("Structure generation failed: {}", error);
                                                }
                                        );

                                        return 1;
                                    })
                            )
            );

            // Select Position 1
            dispatcher.register(
                    Commands.literal("selectPos1")
                            .executes(context -> {
                                ServerPlayer player = context.getSource().getPlayerOrException();
                                var pos = player.blockPosition();
                                StructureExporter.setPos1(player, pos);
                                player.sendSystemMessage(Component.literal("Position 1 set to: " + pos.getX() + ", " + pos.getY() + ", " + pos.getZ()));
                                return 1;
                            })
            );

            // Select Position 2
            dispatcher.register(
                    Commands.literal("selectPos2")
                            .executes(context -> {
                                ServerPlayer player = context.getSource().getPlayerOrException();
                                var pos = player.blockPosition();
                                StructureExporter.setPos2(player, pos);
                                player.sendSystemMessage(Component.literal("Position 2 set to: " + pos.getX() + ", " + pos.getY() + ", " + pos.getZ()));
                                
                                if (StructureExporter.hasSelection(player)) {
                                    var pos1 = StructureExporter.getPos1(player);
                                    var pos2 = StructureExporter.getPos2(player);
                                    int width = Math.abs(pos2.getX() - pos1.getX()) + 1;
                                    int height = Math.abs(pos2.getY() - pos1.getY()) + 1;
                                    int depth = Math.abs(pos2.getZ() - pos1.getZ()) + 1;
                                    player.sendSystemMessage(Component.literal("Selection: " + width + "x" + depth + "x" + height + " (" + (width * height * depth) + " blocks)"));
                                }
                                return 1;
                            })
            );

            // Export Structure
            dispatcher.register(
                    Commands.literal("exportStructure")
                            .then(Commands.argument("description", MessageArgument.message())
                                    .executes(context -> {
                                        ServerPlayer player = context.getSource().getPlayerOrException();
                                        String description = MessageArgument.getMessage(context, "description").getString();

                                        if (!StructureExporter.hasSelection(player)) {
                                            player.sendSystemMessage(Component.literal("No selection! Use /selectPos1 and /selectPos2 first"));
                                            return 0;
                                        }

                                        player.sendSystemMessage(Component.literal("Exporting structure..."));

                                        String json = StructureExporter.exportStructure(player, player.serverLevel(), description);
                                        
                                        if (json != null) {
                                            // Generate filename from description
                                            String filename = description.replaceAll("[^a-zA-Z0-9_-]", "_").toLowerCase();
                                            
                                            boolean saved = StructureExporter.saveStructureToFile(json, filename);
                                            
                                            if (saved) {
                                                player.sendSystemMessage(Component.literal("Structure exported to: priv/examples/exported/" + filename + ".js"));
                                            } else {
                                                player.sendSystemMessage(Component.literal("Failed to save file (check server logs)"));
                                            }
                                        } else {
                                            player.sendSystemMessage(Component.literal("Export failed!"));
                                        }

                                        return 1;
                                    })
                            )
            );
        });

        LOGGER.info("Promptcraft initialized!");
    }
}
