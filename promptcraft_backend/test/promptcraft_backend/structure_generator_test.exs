defmodule PromptcraftBackend.StructureGeneratorTest do
  use ExUnit.Case, async: false

  alias PromptcraftBackend.StructureGenerator

  describe "generate/2" do
    test "returns error when OPENAI_API_KEY is not set" do
      original_key = System.get_env("OPENAI_API_KEY")
      System.delete_env("OPENAI_API_KEY")

      assert_raise System.EnvError, fn ->
        StructureGenerator.generate("a simple house", %{
          "width" => 10,
          "depth" => 10,
          "height" => 10
        })
      end

      if original_key, do: System.put_env("OPENAI_API_KEY", original_key)
    end

    @tag :integration
    test "generates valid structure with real API call" do
      max_size = %{"width" => 5, "depth" => 5, "height" => 3}

      case StructureGenerator.generate("a tiny 3x3 stone tower", max_size) do
        {:ok, structure} ->
          assert is_map(structure)
          assert Map.has_key?(structure, "palette")
          assert Map.has_key?(structure, "size")
          assert Map.has_key?(structure, "layers")

          assert structure["size"]["width"] <= max_size["width"]
          assert structure["size"]["depth"] <= max_size["depth"]
          assert structure["size"]["height"] <= max_size["height"]

          assert is_list(structure["layers"])
          assert length(structure["layers"]) > 0

        {:error, reason} ->
          flunk("Expected successful generation but got error: #{inspect(reason)}")
      end
    end

    test "validates allowed blocks in palette" do
      allowed_blocks = [
        "minecraft:cobblestone",
        "minecraft:oak_planks",
        "minecraft:stone_bricks",
        "minecraft:glass",
        "minecraft:oak_log",
        "minecraft:oak_leaves",
        "minecraft:air"
      ]

      Enum.each(allowed_blocks, fn block ->
        assert String.starts_with?(block, "minecraft:")
      end)
    end
  end

  describe "structure validation" do
    test "validates structure format" do
      valid_structure = %{
        "palette" => %{
          "S" => "minecraft:stone_bricks",
          "#" => "minecraft:air"
        },
        "size" => %{"width" => 3, "depth" => 3, "height" => 2},
        "layers" => [
          %{
            "y" => 0,
            "rows" => ["SSS", "S#S", "SSS"]
          },
          %{
            "y" => 1,
            "rows" => ["###", "###", "###"]
          }
        ]
      }

      assert Map.has_key?(valid_structure, "palette")
      assert Map.has_key?(valid_structure, "size")
      assert Map.has_key?(valid_structure, "layers")
      assert length(valid_structure["layers"]) == 2
    end

    test "validates layer consistency" do
      layer = %{
        "y" => 0,
        "rows" => ["SSS", "S#S", "SSS"]
      }

      assert Map.has_key?(layer, "y")
      assert Map.has_key?(layer, "rows")
      assert is_list(layer["rows"])
      assert length(layer["rows"]) == 3
      assert String.length(hd(layer["rows"])) == 3
    end
  end
end
