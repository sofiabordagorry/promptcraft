defmodule PromptcraftBackend.PyExecutor do
  @moduledoc false

  def execute(py_code) do
    # Parse and execute the Python code
    case execute_via_python(py_code) do
      {:ok, result} -> {:ok, result}
      {:error, reason} -> {:error, reason}
    end
  end

  defp execute_via_python(py_code) do
    # Create a temporary Python file that includes our runtime and the user's code
    runtime_code = build_runtime()

    full_code =
      runtime_code <>
        "\n\n" <>
        py_code <> "\n\nbuild_creation(0, 0, 0)\nprint(json.dumps(get_blocks()))"

    # Create temp file
    temp_file = Path.join(System.tmp_dir!(), "build_#{:erlang.unique_integer([:positive])}.py")

    try do
      File.write!(temp_file, full_code)

      # Execute with Python
      case System.cmd("python3", [temp_file], stderr_to_stdout: true) do
        {output, 0} ->
          # Parse the JSON output
          case Jason.decode(output) do
            {:ok, blocks} ->
              parsed_blocks =
                Enum.map(blocks, fn block ->
                  %{
                    x: block["x"],
                    y: block["y"],
                    z: block["z"],
                    block: normalize_block_name(block["block"]),
                    block_states: block["blockStates"]
                  }
                end)

              IO.puts("Python Execution: Generated #{length(parsed_blocks)} blocks")
              {:ok, parsed_blocks}

            {:error, _} ->
              {:error, "Failed to parse block data: #{output}"}
          end

        {output, _exit_code} ->
          {:error, "Python execution failed: #{output}"}
      end
    rescue
      e -> {:error, "Exception during execution: #{Exception.message(e)}"}
    after
      File.rm(temp_file)
    end
  end

  defp build_runtime do
    allowed_blocks_json = Jason.encode!(load_allowed_blocks())

    """
    import json
    import sys

    # Runtime environment for Minecraft structure building
    blocks = []
    allowed_blocks = set(#{allowed_blocks_json})

    # Block substitution mapping for variants not in allowed list
    BLOCK_SUBSTITUTIONS = {
        '_stairs': '',
        '_slab': '',
        '_wall': '_block',
        '_fence': '_planks',
        '_gate': '_planks',
        '_door': '_planks',
        '_trapdoor': '_planks'
    }

    def normalize_block_name(name):
        normalized = name.strip()
        if not normalized.startswith('minecraft:'):
            normalized = 'minecraft:' + normalized
        
        # Auto-replace glass_pane with glass (glass_pane is not allowed)
        if 'glass_pane' in normalized:
            if normalized == 'minecraft:glass_pane':
                normalized = 'minecraft:glass'
            elif normalized.endswith('_glass_pane'):
                normalized = normalized.replace('_glass_pane', '_glass')
            else:
                normalized = normalized.replace('glass_pane', 'glass')
        
        base_name = normalized.split('[')[0]
        
        # Try substitutions if not allowed
        if base_name not in allowed_blocks:
            for suffix, replacement in BLOCK_SUBSTITUTIONS.items():
                if base_name.endswith(suffix):
                    substituted = base_name.replace(suffix, replacement)
                    if substituted in allowed_blocks:
                        print(f'Block substituted: {base_name} -> {substituted}', file=sys.stderr)
                        return substituted
            
            print(f'Block not allowed: {base_name}', file=sys.stderr)
            return None
        
        return normalized

    def fillRegion(x1, y1, z1, x2, y2, z2, block_type, **options):
        # Normalize coordinates
        min_x = min(x1, x2)
        max_x = max(x1, x2)
        min_y = min(y1, y2)
        max_y = max(y1, y2)
        min_z = min(z1, z2)
        max_z = max(z1, z2)

        normalized_block = normalize_block_name(block_type)
        if not normalized_block:
            return

        mode = options.get('mode', 'destroy')
        block_states = options.get('block_states', {})
        replace_filter = options.get('replace_filter')

        is_hollow = mode in ['hollow', 'outline']

        for x in range(min_x, max_x + 1):
            for y in range(min_y, max_y + 1):
                for z in range(min_z, max_z + 1):
                    # Check if this is an edge position for hollow mode
                    if is_hollow:
                        is_edge = (x == min_x or x == max_x or
                                   y == min_y or y == max_y or
                                   z == min_z or z == max_z)
                        if not is_edge:
                            continue

                    # Check replace filter
                    if mode == 'replace' and replace_filter:
                        existing = next((b for b in blocks if b['x'] == x and b['y'] == y and b['z'] == z), None)
                        if existing:
                            existing_base = existing['block'].split('[')[0]
                            filter_base = normalize_block_name(replace_filter)
                            if filter_base:
                                filter_base = filter_base.split('[')[0]
                            if existing_base != filter_base:
                                continue

                    # Check keep mode
                    if mode == 'keep':
                        existing = next((b for b in blocks if b['x'] == x and b['y'] == y and b['z'] == z), None)
                        if existing:
                            continue

                    # Add or update block
                    block_data = {
                        'x': x,
                        'y': y,
                        'z': z,
                        'block': normalized_block,
                        'blockStates': block_states
                    }

                    existing_index = next((i for i, b in enumerate(blocks) if b['x'] == x and b['y'] == y and b['z'] == z), None)
                    if existing_index is not None:
                        blocks[existing_index] = block_data
                    else:
                        blocks.append(block_data)

    def placeBlock(x, y, z, block_type, **options):
        normalized_block = normalize_block_name(block_type)
        if not normalized_block:
            return

        mode = options.get('mode', 'replace')
        block_states = options.get('block_states', {})

        # Check keep mode
        if mode == 'keep':
            existing = next((b for b in blocks if b['x'] == x and b['y'] == y and b['z'] == z), None)
            if existing:
                return

        # Add or update block
        block_data = {
            'x': int(x),
            'y': int(y),
            'z': int(z),
            'block': normalized_block,
            'blockStates': block_states
        }

        existing_index = next((i for i, b in enumerate(blocks) if b['x'] == x and b['y'] == y and b['z'] == z), None)
        if existing_index is not None:
            blocks[existing_index] = block_data
        else:
            blocks.append(block_data)

    def get_blocks():
        return blocks
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
