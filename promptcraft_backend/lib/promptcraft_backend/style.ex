defmodule PromptcraftBackend.Style do
  @moduledoc """
  Manages style-specific configurations for Minecraft structure generation.
  Handles style detection, example loading, and custom prompts.
  """

  alias PromptcraftBackend.Config

  @doc """
  Detects the style from a user prompt based on keywords.
  Returns the style name or nil if no style is detected.
  """
  def detect_style_from_prompt(prompt) do
    prompt_lower = String.downcase(prompt)

    style_keywords = %{
      "tree" => ["tree", "oak", "birch", "spruce", "jungle", "acacia", "dark oak", "cherry"],
      "village" => ["village", "well", "town"],
      "house" => ["house", "home", "cottage", "building"]
    }

    # Check each style's keywords
    Enum.find_value(style_keywords, fn {style, keywords} ->
      if Enum.any?(keywords, &String.contains?(prompt_lower, &1)) do
        style
      end
    end)
  end

  @doc """
  Gets style-specific prompt instructions if available.
  Returns a formatted string with the custom prompt, or empty string if not found.
  """
  def get_style_prompt(style) when is_nil(style), do: ""

  def get_style_prompt(style) do
    case Config.get_style_config(style) do
      {:ok, %{custom_prompt: custom}} ->
        """

        # STYLE-SPECIFIC INSTRUCTIONS

        #{custom}
        """

      {:error, _} ->
        ""
    end
  end

  @doc """
  Gets a human-readable style context string for prompts.
  Returns " in [style] style" or empty string if no style.
  """
  def get_style_context(nil), do: ""
  def get_style_context(style), do: " in #{style} style"
end
