defmodule PromptcraftBackend.Config do
  @examples_base_dir "priv/examples"
  @example_folders ["exported", "medieval"]

  def examples_base_dir, do: @examples_base_dir

  def example_folders, do: @example_folders

  def example_paths do
    Enum.map(@example_folders, fn folder ->
      Path.join(@examples_base_dir, folder)
    end)
  end
end
