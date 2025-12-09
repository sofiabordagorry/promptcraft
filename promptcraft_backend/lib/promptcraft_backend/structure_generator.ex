defmodule PromptcraftBackend.StructureGenerator do
  @moduledoc false

  alias PromptcraftBackend.Config

  @allowed_blocks_file "priv/allowed_blocks.txt"

  defp load_allowed_blocks do
    case File.read(@allowed_blocks_file) do
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

  defp load_examples do
    Config.example_paths()
    |> Enum.flat_map(fn folder_path ->
      case File.ls(folder_path) do
        {:ok, files} ->
          files
          |> Enum.filter(&String.ends_with?(&1, ".json"))
          |> Enum.map(fn file ->
            path = Path.join(folder_path, file)
            case File.read(path) do
              {:ok, content} ->
                case Jason.decode(content) do
                  {:ok, json} -> json
                  {:error, _} -> nil
                end
              {:error, _} -> nil
            end
          end)
          |> Enum.reject(&is_nil/1)

        {:error, _} ->
          []
      end
    end)
  end

  defp pick_examples(n \\ 2) do
    load_examples()
    |> Enum.shuffle()
    |> Enum.take(n)
  end

  defp build_example_messages(examples) do
    Enum.flat_map(examples, fn %{"description" => desc, "structure" => structure} ->
      [
        %{
          "role" => "user",
          "content" => "Example request: \"#{desc}\"\n\nGenerate the structure JSON."
        },
        %{
          "role" => "assistant",
          "content" => Jason.encode!(structure)
        }
      ]
    end)
  end

  def generate(prompt, max_size) do
    allowed_blocks = load_allowed_blocks()
    examples = pick_examples(2)

    system_prompt = """
    You are an expert Minecraft builder specializing in creating authentic, beautiful medieval structures.

    YOUR TASK: Generate a complete 3D voxel structure as a JSON object.

    ═══════════════════════════════════════════════════════════════════════════════
    MINECRAFT BUILDING FUNDAMENTALS
    ═══════════════════════════════════════════════════════════════════════════════

    PHYSICS & CONSTRUCTION RULES:
    • Gravity: Sand, gravel, concrete_powder fall if unsupported. Avoid using them mid-air.
    • Support: Most blocks need support below them. Avoid large floating structures.
    • Water: Flows and spreads. Use carefully or not at all in structures.
    • Ground Level: Y=0 is the BOTTOM of your structure (foundation level).

    MEDIEVAL ARCHITECTURE PRINCIPLES:
    • **Foundation (Y=0)**: Always solid stone, cobblestone, or stone_bricks
    • **Walls (Y=1 to Y=height-2)**: Oak/spruce planks with oak_log corner posts
    • **Roof (top 1-2 layers)**: MUST be sloped/pitched using stairs, never flat
    • **Symmetry**: Front face should be symmetric (left mirrors right)
    • **Scale**: Small buildings (5x5 to 7x7), not massive castles
    • **Details**: Include windows (glass_pane), door, maybe decorative elements

    COMMON BUILDING PATTERNS:
    • Corner posts: Use oak_log or spruce_log at all 4 corners of each wall layer
    • Windows: Glass blocks or glass_pane, placed symmetrically
    • Doors: Oak_door at ground level (Y=1), creates 2-block tall opening automatically
    • Roof: Use oak_stairs or stone_brick_stairs in triangular/pyramid pattern
    • Interior: Mostly hollow (air) with minimal furniture against walls

    MULTIBLOCK STRUCTURES (CRITICAL):
    • **Doors**: Automatically create 2-block tall structure (Y and Y+1)
      - Only place door at Y=1, do NOT place anything at Y=2 in same X,Z position
    • **Beds**: Automatically create 2-block wide structure (X and X+1)
      - Only place bed once, do NOT place block at adjacent X position

    ═══════════════════════════════════════════════════════════════════════════════
    JSON OUTPUT FORMAT
    ═══════════════════════════════════════════════════════════════════════════════

    You MUST output a valid JSON object with this EXACT structure:

    {
      "palette": {
        "<char>": "minecraft:<block_id>",
        "<char>": "minecraft:<block_id>",
        "#": "minecraft:air"
      },
      "size": {"width": <int>, "depth": <int>, "height": <int>},
      "layers": [
        {"y": <int>, "rows": ["<string>", "<string>", ...]},
        {"y": <int>, "rows": ["<string>", "<string>", ...]},
        ...
      ]
    }

    EXAMPLE (7x7x5 medieval house - for FORMAT reference only, create your own structure):
    {
      "palette": {
        "S": "minecraft:stone_bricks",
        "W": "minecraft:oak_planks",
        "L": "minecraft:oak_log",
        "D": "minecraft:oak_door",
        "G": "minecraft:glass_pane",
        "R": "minecraft:oak_stairs",
        "#": "minecraft:air"
      },
      "size": {"width": 7, "depth": 7, "height": 5},
      "layers": [
        {"y": 0, "rows": ["SSSSSSS", "SWWWWWS", "SWWDWWS", "SWWWWWS", "SWWWWWS", "SWWWWWS", "SSSSSSS"]},
        {"y": 1, "rows": ["LWWWWWL", "WG###GW", "W##D##W", "W#####W", "W#####W", "WG###GW", "LWWWWWL"]},
        {"y": 2, "rows": ["LWWWWWL", "WG###GW", "W#####W", "W#####W", "W#####W", "WG###GW", "LWWWWWL"]},
        {"y": 3, "rows": ["RRRRRRR", "RRRRRRR", "RRRRRRR", "RRRRRRR", "RRRRRRR", "RRRRRRR", "RRRRRRR"]},
        {"y": 4, "rows": ["#RRRRR#", "#RRRRR#", "#RRRRR#", "#RRRRR#", "#RRRRR#", "#RRRRR#", "#RRRRR#"]}
      ]
    }

    JSON CONSTRAINTS:
    • **size**: width, depth, height MUST be ≤ #{max_size["width"]}, #{max_size["depth"]}, #{max_size["height"]}
    • **palette**: Every character used in rows MUST have an entry in palette
      - '#' MUST always map to "minecraft:air"
      - Only use these blocks: #{Enum.join(allowed_blocks, ", ")}
      - BLOCK STATES: You can specify block properties using [property=value] syntax
        Examples:
        * "R": "minecraft:oak_stairs[facing=north,half=bottom]"
        * "T": "minecraft:oak_stairs[facing=south,half=top]"
        * "S": "minecraft:oak_slab[type=bottom]"
        Common properties: facing (north/south/east/west), half (top/bottom), type (top/bottom/double)
    • **layers**:
      - Start at y=0 (ground) and increment by 1 each layer
      - Each layer MUST have exactly 'depth' rows
      - Each row MUST have exactly 'width' characters

    ═══════════════════════════════════════════════════════════════════════════════
    BUILDING QUALITY CHECKLIST
    ═══════════════════════════════════════════════════════════════════════════════

    Your structure MUST have:
    ✓ Solid foundation at Y=0 (stone/cobblestone)
    ✓ Hollow interior (mostly air inside walls)
    ✓ Clear entrance with door at Y=1
    ✓ At least 2-3 windows (glass_pane) placed symmetrically
    ✓ Wooden walls (planks) with log corner posts
    ✓ Sloped/pitched roof (stairs), NOT flat
    ✓ Reasonable proportions (not too wide or too tall)
    ✓ Symmetric front face
    ✓ Medieval aesthetic (no modern materials)

    AVOID:
    ✗ Flat roofs
    ✗ Random scattered blocks
    ✗ Excessive complexity
    ✗ Floating blocks with no support
    ✗ More than 8 different block types
    ✗ Placing blocks where multiblock structures auto-generate (door tops, bed halves)

    ═══════════════════════════════════════════════════════════════════════════════
    LEARNING FROM EXAMPLES
    ═══════════════════════════════════════════════════════════════════════════════

    You will see EXAMPLE pairs of (description + JSON structure) below.
    Study their patterns: foundation layout, wall structure, roof shape, symmetry, block choices.
    Use these as inspiration but DO NOT copy them exactly.
    Create a NEW structure adapted to the user's specific request.

    ═══════════════════════════════════════════════════════════════════════════════

    Respond with ONLY the JSON object. No markdown, no explanations, no code blocks.
    """

    user_prompt = """
    USER REQUEST: "#{prompt}"

    INSTRUCTIONS:
    1. Think about what type of medieval building fits this request (house, tower, smithy, etc.)
    2. Plan the dimensions (width, depth, height) - keep it compact
    3. Design layer by layer from Y=0 (foundation) upward
    4. Ensure solid foundation, hollow interior, proper roof
    5. Add door at Y=1 and windows symmetrically
    6. Use medieval materials (stone, wood, glass)

    If the request is vague, default to a simple medieval house: 5x5 or 7x7, stone foundation, wooden walls with log corners, glass windows, pitched roof.

    Output ONLY the JSON object.
    """

    messages =
      [%{"role" => "system", "content" => system_prompt}] ++
        build_example_messages(examples) ++
        [%{"role" => "user", "content" => user_prompt}]

    with {:ok, raw} <- call_llm(messages),
         {:ok, parsed} <- Jason.decode(raw) do
      {:ok, parsed}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, :bad_response}
    end
  end

  defp call_llm(messages) do
    api_key = System.fetch_env!("OPENAI_API_KEY")

    body = %{
      "model" => "gpt-5.1",
      "messages" => messages,
      "temperature" => 0.5,
      "response_format" => %{"type" => "json_object"}
    }

    case Req.post("https://api.openai.com/v1/chat/completions",
           json: body,
           headers: [
             {"authorization", "Bearer #{api_key}"},
             {"content-type", "application/json"}
           ]
         ) do
      {:ok, %Req.Response{status: 200, body: %{"choices" => [choice | _]}}} ->
        content = get_in(choice, ["message", "content"])
        {:ok, content}

      other ->
        {:error, other}
    end
  end
end
