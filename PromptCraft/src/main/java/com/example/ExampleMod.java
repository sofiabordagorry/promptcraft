package com.example;

import net.fabricmc.api.ModInitializer;

import net.fabricmc.fabric.api.command.v2.CommandRegistrationCallback;
import net.minecraft.commands.Commands;
import net.minecraft.network.chat.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExampleMod implements ModInitializer {
    public static final String MOD_ID = "promptcraft";
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {

        LOGGER.info("Initializing PromptCraft...");

        // Custom block
        ModBlocks.register();

        CommandRegistrationCallback.EVENT.register((dispatcher, registryAccess, environment) -> {
            dispatcher.register(
                    Commands.literal("hellosofi")
                            .executes(context -> {
                                context.getSource().sendSuccess(
                                        () -> Component.literal("Hola Sofi, el mod está vivo 🥳"),
                                        false
                                );
                                return 1;
                            })
            );
        });

        LOGGER.info("PromptCraft initialized!");
    }
}
