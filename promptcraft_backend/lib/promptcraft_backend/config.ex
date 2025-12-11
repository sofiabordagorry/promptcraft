defmodule PromptcraftBackend.Config do

  @examples_base_dir "priv/examples"
  @example_folders ["exported", "medieval"]
  @style_folders ["medieval", "tree"]

  def examples_base_dir, do: @examples_base_dir

  def example_folders, do: @example_folders

  def style_folders, do: @style_folders

  def example_paths do
    Enum.map(@example_folders, fn folder ->
      Path.join(@examples_base_dir, folder)
    end)
  end

  def get_style_config(nil), do: {:error, :no_style}

  def get_style_config(style) do
    style_path = Path.join([@examples_base_dir, style])
    prompt_file = Path.join(style_path, "_prompt.txt")

    case File.read(prompt_file) do
      {:ok, custom_prompt} ->
        {:ok, %{style: style, path: style_path, custom_prompt: custom_prompt}}
      {:error, _} ->
        {:error, :no_prompt_file}
    end
  end

  def list_styles do
    @style_folders
  end
end
