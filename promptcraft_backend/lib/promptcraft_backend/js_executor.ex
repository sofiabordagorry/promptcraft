defmodule PromptcraftBackend.JsExecutor do
  @moduledoc """
  Executes JavaScript build code to generate Minecraft structures.
  This module simulates the JS execution environment used by BuilderGPT.
  """

  @doc """
  Executes JavaScript build code and returns a list of block placements.

  Returns: {:ok, blocks} where blocks is a list of %{x: x, y: y, z: z, block: block_type, block_states: states}
  """
  def execute(js_code) do
    # Parse and execute the JavaScript code
    # Since we can't execute actual JS in pure Elixir, we'll use a port to Node.js
    case execute_via_nodejs(js_code) do
      {:ok, result} -> {:ok, result}
      {:error, reason} -> {:error, reason}
    end
  end

  defp execute_via_nodejs(js_code) do
    # Create a temporary JS file that includes our runtime and the user's code
    runtime_code = build_runtime()
    full_code = runtime_code <> "\n\n" <> js_code <> "\n\nbuildCreation(0, 0, 0);\nconsole.log(JSON.stringify(getBlocks()));"

    # Create temp file
    temp_file = Path.join(System.tmp_dir!(), "build_#{:erlang.unique_integer([:positive])}.js")

    try do
      File.write!(temp_file, full_code)

      # Execute with Node.js
      case System.cmd("node", [temp_file], stderr_to_stdout: true) do
        {output, 0} ->
          # Parse the JSON output
          case Jason.decode(output) do
            {:ok, blocks} ->
              parsed_blocks = Enum.map(blocks, fn block ->
                %{
                  x: block["x"],
                  y: block["y"],
                  z: block["z"],
                  block: normalize_block_name(block["block"]),
                  block_states: block["blockStates"]
                }
              end)

              IO.puts("JS Execution: Generated #{length(parsed_blocks)} blocks")
              {:ok, parsed_blocks}
            {:error, _} ->
              {:error, "Failed to parse block data: #{output}"}
          end

        {output, _exit_code} ->
          {:error, "Node.js execution failed: #{output}"}
      end
    rescue
      e -> {:error, "Exception during execution: #{Exception.message(e)}"}
    after
      File.rm(temp_file)
    end
  end

  defp build_runtime do
    """
    // Runtime environment for Minecraft structure building
    const blocks = [];
    const allowedBlocks = new Set(#{Jason.encode!(load_allowed_blocks())});

    function normalizeBlockName(name) {
      let normalized = name.trim();
      if (!normalized.startsWith('minecraft:')) {
        normalized = 'minecraft:' + normalized;
      }
      const baseName = normalized.split('[')[0];
      if (!allowedBlocks.has(baseName)) {
        console.error('Block not allowed: ' + baseName);
        return null;
      }
      return normalized;
    }

    function safeFill(x1, y1, z1, x2, y2, z2, blockType, options = {}) {
      // Normalize coordinates
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      const minZ = Math.min(z1, z2);
      const maxZ = Math.max(z1, z2);

      const normalizedBlock = normalizeBlockName(blockType);
      if (!normalizedBlock) return;

      const mode = options.mode || 'destroy';
      const blockStates = options.blockStates || {};
      const replaceFilter = options.replaceFilter;

      const isHollow = mode === 'hollow' || mode === 'outline';

      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          for (let z = minZ; z <= maxZ; z++) {
            // Check if this is an edge position for hollow mode
            if (isHollow) {
              const isEdge = x === minX || x === maxX ||
                             y === minY || y === maxY ||
                             z === minZ || z === maxZ;
              if (!isEdge) continue;
            }

            // Check replace filter
            if (mode === 'replace' && replaceFilter) {
              const existing = blocks.find(b => b.x === x && b.y === y && b.z === z);
              if (existing) {
                const existingBase = existing.block.split('[')[0];
                const filterBase = normalizeBlockName(replaceFilter)?.split('[')[0];
                if (existingBase !== filterBase) continue;
              }
            }

            // Check keep mode
            if (mode === 'keep') {
              const existing = blocks.find(b => b.x === x && b.y === y && b.z === z);
              if (existing) continue;
            }

            // Add or update block
            const existingIndex = blocks.findIndex(b => b.x === x && b.y === y && b.z === z);
            const blockData = {
              x: x,
              y: y,
              z: z,
              block: normalizedBlock,
              blockStates: blockStates
            };

            if (existingIndex >= 0) {
              blocks[existingIndex] = blockData;
            } else {
              blocks.push(blockData);
            }
          }
        }
      }
    }

    function safeSetBlock(x, y, z, blockType, options = {}) {
      const normalizedBlock = normalizeBlockName(blockType);
      if (!normalizedBlock) return;

      const mode = options.mode || 'replace';
      const blockStates = options.blockStates || {};

      // Check keep mode
      if (mode === 'keep') {
        const existing = blocks.find(b => b.x === x && b.y === y && b.z === z);
        if (existing) return;
      }

      // Add or update block
      const existingIndex = blocks.findIndex(b => b.x === x && b.y === y && b.z === z);
      const blockData = {
        x: Math.floor(x),
        y: Math.floor(y),
        z: Math.floor(z),
        block: normalizedBlock,
        blockStates: blockStates
      };

      if (existingIndex >= 0) {
        blocks[existingIndex] = blockData;
      } else {
        blocks.push(blockData);
      }
    }

    function getBlocks() {
      return blocks;
    }
    """
  end

  defp load_allowed_blocks do
    case File.read("priv/allowed_blocks.txt") do
      {:ok, content} ->
        content
        |> String.split("\n", trim: true)
        |> Enum.map(&String.trim/1)
        |> Enum.reject(&String.starts_with?(&1, "#"))
        |> Enum.reject(&(&1 == ""))

      {:error, _} ->
        [
          "minecraft:cobblestone",
          "minecraft:oak_planks",
          "minecraft:stone_bricks",
          "minecraft:glass",
          "minecraft:oak_log",
          "minecraft:oak_leaves",
          "minecraft:air"
        ]
    end
  end

  defp normalize_block_name(name) when is_binary(name) do
    normalized = String.trim(name)
    if String.starts_with?(normalized, "minecraft:") do
      normalized
    else
      "minecraft:" <> normalized
    end
  end
  defp normalize_block_name(_), do: "minecraft:air"
end
