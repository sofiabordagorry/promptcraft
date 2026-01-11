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

  defp load_js_examples do
    Config.example_paths()
    |> Enum.flat_map(fn folder_path ->
      case File.ls(folder_path) do
        {:ok, files} ->
          files
          |> Enum.filter(&String.ends_with?(&1, ".js"))
          |> Enum.map(fn file ->
            path = Path.join(folder_path, file)
            case File.read(path) do
              {:ok, content} ->
                # Extract description from first comment line
                description = case Regex.run(~r/^\/\/\s*(.+)$/m, content) do
                  [_, desc] -> desc
                  _ -> "Example structure"
                end
                {description, content}
              {:error, _} -> nil
            end
          end)
          |> Enum.reject(&is_nil/1)

        {:error, _} ->
          []
      end
    end)
  end

  defp pick_js_examples(n, style) do
    examples = case style do
      nil -> load_js_examples()
      style_name -> load_js_examples_for_style(style_name)
    end

    examples
    |> Enum.shuffle()
    |> Enum.take(n)
  end

  defp load_js_examples_for_style(style) do
    style_path = Path.join([Config.examples_base_dir(), style])

    case File.ls(style_path) do
      {:ok, files} ->
        files
        |> Enum.filter(&String.ends_with?(&1, ".js"))
        |> Enum.reject(&(&1 == "_prompt.txt"))
        |> Enum.map(fn file ->
          path = Path.join(style_path, file)
          case File.read(path) do
            {:ok, content} ->
              # Extract description from first comment
              description = case Regex.run(~r/^\/\/\s*(.+)$/m, content) do
                [_, desc] -> desc
                _ -> "Example structure"
              end
              {description, content}
            {:error, _} -> nil
          end
        end)
        |> Enum.reject(&is_nil/1)

      {:error, _} ->
        []
    end
  end

  defp build_js_example_messages(examples) do
    examples
    |> Enum.with_index(1)
    |> Enum.flat_map(fn {{description, js_code}, idx} ->
      [
        %{
          "role" => "user",
          "content" => "EXAMPLE #{idx}: Generate a structure for: \"#{description}\""
        },
        %{
          "role" => "assistant",
          "content" => "<inspiration>This structure demonstrates #{description}.</inspiration>\n\n<description>#{description}</description>\n\n<code>\n#{js_code}\n</code>"
        }
      ]
    end)
  end

  def generate(prompt, max_size, style \\ nil) do
    allowed_blocks = load_allowed_blocks()

    detected_style = style || detect_style_from_prompt(prompt)

    js_examples = pick_js_examples(3, detected_style)

    # Get style-specific instructions if available
    style_specific_prompt = case Config.get_style_config(detected_style) do
      {:ok, %{custom_prompt: custom}} ->
        """

        ═══════════════════════════════════════════════════════════════════════════════
        STYLE-SPECIFIC INSTRUCTIONS
        ═══════════════════════════════════════════════════════════════════════════════

        #{custom}
        """
      {:error, _} -> ""
    end

    style_context = if detected_style, do: " in #{detected_style} style", else: ""

    system_prompt = """
    You are an expert Minecraft builder and JavaScript coder tasked with creating structures in Minecraft. Your goal is to produce a Minecraft structure via code, considering aspects such as accents, block variety, symmetry and asymmetry, overall aesthetics, and most importantly, adherence to the platonic ideal of the requested creation.

    BUILD SPECIFICATION: #{prompt}#{style_specific_prompt}

    ═══════════════════════════════════════════════════════════════════════════════
    MINECRAFT BUILDING FUNDAMENTALS
    ═══════════════════════════════════════════════════════════════════════════════

    PHYSICS & CONSTRUCTION RULES:
    • Gravity: Sand, gravel, concrete_powder fall if unsupported. Avoid using them mid-air.
    • Support: Most blocks need support below them. Avoid large floating structures.
    • Water: Flows and spreads. Use carefully or not at all in structures.
    • Ground Level: Y=0 is the BOTTOM of your structure (foundation level).

    MULTIBLOCK STRUCTURES (CRITICAL):
    • **Doors**: Automatically create 2-block tall structure (Y and Y+1)
      - Only place door at Y=1, do NOT place anything at Y=2 in same X,Z position
    • **Beds**: Automatically create 2-block wide structure (X and X+1)
      - Only place bed once, do NOT place block at adjacent X position

    ═══════════════════════════════════════════════════════════════════════════════
    JAVASCRIPT CODE FORMAT
    ═══════════════════════════════════════════════════════════════════════════════

    You have access to the following helper functions:

    ```javascript
    /**
     * Fills a region with blocks
     * @param {number} x1, y1, z1 - First corner coordinates
     * @param {number} x2, y2, z2 - Second corner coordinates
     * @param {string} blockType - Block type WITHOUT "minecraft:" prefix
     * @param {Object} options - { mode: "hollow"|"destroy"|"keep", blockStates: {facing: "north", ...} }
     */
    function safeFill(x1, y1, z1, x2, y2, z2, blockType, options = {}) {}

    /**
     * Places a single block
     * @param {number} x, y, z - Block coordinates
     * @param {string} blockType - Block type WITHOUT "minecraft:" prefix
     * @param {Object} options - { blockStates: {facing: "north", half: "top", ...} }
     */
    function safeSetBlock(x, y, z, blockType, options = {}) {}
    ```

    YOUR TASK: Implement the `buildCreation` function:

    ```javascript
    /**
     * Builds a structure using safeFill and safeSetBlock
     * @param startX - X coordinate of starting point
     * @param startY - Y coordinate (ground level)
     * @param startZ - Z coordinate of starting point
     */
    function buildCreation(startX, startY, startZ) {
      // Your code here
    }
    ```

    ALLOWED BLOCKS (use WITHOUT "minecraft:" prefix):
    #{Enum.join(allowed_blocks |> Enum.map(&String.replace(&1, "minecraft:", "")), ", ")}

    CRITICAL RULES:
    • Structure must fit within: width ≤ #{max_size["width"]}, depth ≤ #{max_size["depth"]}, height ≤ #{max_size["height"]}
    • startY is ground level - build foundation at startY, structure above
    • Use safeFill for vertical pillars, horizontal lines (one wall at a time)
    • Use safeSetBlock for individual blocks (doors, windows, decorations)
    • NEVER use mode: "hollow" - it causes errors. Build walls individually instead
    • IMPORTANT: Do NOT fill large volumes with blocks - only place what you need
    • Interior of buildings should be AIR (empty) - don't fill it with blocks

    WALL CONSTRUCTION (CRITICAL):
    • Build each wall separately, one block thick
    • Walls MUST reach the same height as corner posts (if posts go to y+4, walls go to y+4)
    • DO NOT leave gaps between wall segments and corner posts
    • Build walls in segments around doors/windows, but fill ALL spaces

    Example for 7x7 house with 4-block tall walls:
    ```javascript
    // Corner posts (y+1 to y+4)
    safeFill(startX, startY+1, startZ, startX, startY+4, startZ, "oak_log");
    safeFill(startX+6, startY+1, startZ, startX+6, startY+4, startZ, "oak_log");

    // Front wall (z=0) - MUST go to y+4 to match posts
    safeFill(startX+1, startY+1, startZ, startX+2, startY+4, startZ, "oak_planks"); // Left of door
    safeFill(startX+4, startY+1, startZ, startX+5, startY+4, startZ, "oak_planks"); // Right of door
    safeFill(startX+3, startY+2, startZ, startX+3, startY+4, startZ, "oak_planks"); // Above door
    safeSetBlock(startX+3, startY+1, startZ, "oak_door");
    // Windows
    safeFill(startX+1, startY+2, startZ, startX+1, startY+3, startZ, "glass");
    safeFill(startX+5, startY+2, startZ, startX+5, startY+3, startZ, "glass");
    ```

    KEY POINTS:
    • Fill space ABOVE doors (from y+2 upward)
    • Walls touch corner posts with no gaps
    • All segments reach the top height
    • ALWAYS ensure interior is hollow/empty
    • For multi-story buildings, place floors between levels:
      safeFill(startX+1, startY+4, startZ+1, startX+5, startY+4, startZ+5, "oak_planks");
    • Leave space for stairs/ladders to connect floors

    WINDOWS (IMPORTANT):
    • Make windows 2-3 blocks tall (y+2 to y+3 or y+2 to y+4)
    • Windows can be 1-2 blocks wide
    • Place at eye level (y+2 and above)
    • Every house needs at least 3-4 windows on different walls
    • Example: safeFill(startX+1, startY+2, startZ, startX+2, startY+3, startZ, "glass");

    ROOF CONSTRUCTION (CRITICAL - READ CAREFULLY):
    • NEVER use safeFill for an entire roof with one facing direction
    • Stairs must face TOWARDS the center of the building (pointing inward)
    • Most roofs slope from side to side (east-west), not front to back
    • EACH ROOF LAYER MUST BE COMPLETELY FILLED - stairs on edges, planks in middle
    • NO EMPTY SPACES between wall top and roof, or between roof layers

    CRITICAL RULE: Every roof layer = stairs on sides + planks filling the middle
    - Layer 1: stairs at x=0 and x=width, planks fill x=1 to x=width-1
    - Layer 2: stairs at x=1 and x=width-1, planks fill x=2 to x=width-2
    - Continue pattern until peak

    CORRECT roof example (9x9 house with walls/posts ending at y+4):
    ```javascript
    // Corner posts and walls end at y+4
    safeFill(startX, startY+1, startZ, startX, startY+4, startZ, "oak_log");
    safeFill(startX+1, startY+1, startZ, startX+7, startY+4, startZ, "oak_planks");

    // ROOF LAYER 1 at y+5 (MUST BE COMPLETELY FILLED)
    safeFill(startX, startY+5, startZ, startX, startY+5, startZ+8, "oak_stairs", {blockStates: {facing: "east", half: "bottom"}});
    safeFill(startX+8, startY+5, startZ, startX+8, startY+5, startZ+8, "oak_stairs", {blockStates: {facing: "west", half: "bottom"}});
    safeFill(startX+1, startY+5, startZ, startX+7, startY+5, startZ+8, "oak_planks"); // FILLS MIDDLE - NO GAPS

    // ROOF LAYER 2 at y+6 (ALSO COMPLETELY FILLED)
    safeFill(startX+1, startY+6, startZ, startX+1, startY+6, startZ+8, "oak_stairs", {blockStates: {facing: "east", half: "bottom"}});
    safeFill(startX+7, startY+6, startZ, startX+7, startY+6, startZ+8, "oak_stairs", {blockStates: {facing: "west", half: "bottom"}});
    safeFill(startX+2, startY+6, startZ, startX+6, startY+6, startZ+8, "oak_planks"); // FILLS MIDDLE

    // ROOF LAYER 3 at y+7 (peak)
    safeFill(startX+2, startY+7, startZ, startX+2, startY+7, startZ+8, "oak_stairs", {blockStates: {facing: "east", half: "bottom"}});
    safeFill(startX+6, startY+7, startZ, startX+6, startY+7, startZ+8, "oak_stairs", {blockStates: {facing: "west", half: "bottom"}});
    safeFill(startX+3, startY+7, startZ, startX+5, startY+7, startZ+8, "oak_planks"); // FILLS MIDDLE
    ```

    WRONG examples (DO NOT DO THIS):
    safeFill(startX, startY+4, startZ, startX+4, startY+4, startZ, "oak_stairs", {blockStates: {facing: "north"}});
    Stairs on north/south edges - roofs slope EAST-WEST not NORTH-SOUTH
    Using same facing for entire roof perimeter
    Missing half: "bottom" in stairs blockStates

    BLOCK ORIENTATION:
    • Doors: facing should point AWAY from wall (into the room)
      - Front door on south wall (z=0): facing: "south"
      - Door on north wall: facing: "north"
    • Beds: MUST use part: "foot" and part: "head" for 2-block structure
      - Place foot first, then head in direction of facing
    • Chests/Furnaces: Always specify facing direction
    • Logs: Specify axis: "x", "y", or "z" (y for vertical posts)

    MULTI-STORY BUILDINGS (CRITICAL FOR 2+ FLOORS):

    For buildings with multiple floors, follow this EXACT pattern:

    ```javascript
    // Example: 7x7 two-story house

    // 1. CORNER POSTS - Must extend through ALL floors
    safeFill(startX, startY+1, startZ, startX, startY+7, startZ, "oak_log"); // Goes to top of 2nd floor

    // 2. FIRST FLOOR WALLS (y+1 to y+3)
    safeFill(startX+1, startY+1, startZ, startX+5, startY+3, startZ, "oak_planks");
    // Add door at y+1, windows at y+2

    // 3. FLOOR SEPARATOR at y+4 - LEAVE HOLE for stairs
    safeFill(startX+1, startY+4, startZ+1, startX+5, startY+4, startZ+3, "oak_planks"); // Front section
    safeFill(startX+3, startY+4, startZ+4, startX+5, startY+4, startZ+5, "oak_planks"); // Back section
    // Gap at (startX+1 to startX+2, startZ+4 to startZ+5) for stairs

    // 4. STAIRS connecting floors - diagonal placement
    safeSetBlock(startX+1, startY+1, startZ+5, "oak_stairs", {blockStates: {facing: "east", half: "bottom"}});
    safeSetBlock(startX+2, startY+2, startZ+5, "oak_stairs", {blockStates: {facing: "east", half: "bottom"}});
    safeSetBlock(startX+3, startY+3, startZ+5, "oak_stairs", {blockStates: {facing: "east", half: "bottom"}});
    safeSetBlock(startX+4, startY+4, startZ+5, "oak_stairs", {blockStates: {facing: "east", half: "bottom"}});
    // Each stair is one block higher and one block forward

    // 5. SECOND FLOOR WALLS (y+5 to y+7)
    safeFill(startX+1, startY+5, startZ, startX+5, startY+7, startZ, "oak_planks");
    // Add windows at y+6

    // 6. ROOF starts at y+8
    ```

    KEY RULES for multi-story:
    • Corner posts extend through ALL floors (if 2 floors with 3-block walls each, posts go to y+7)
    • Each floor has 3-4 blocks of height for walls
    • Floor separator placed with HOLE for stairs (don't block access!)
    • Stairs placed DIAGONALLY - each step is +1 Y and +1 X (or +1 Z)
    • Second floor walls start ABOVE the floor separator (y+5 if separator is y+4)
    • Windows on each floor at appropriate heights

    ═══════════════════════════════════════════════════════════════════════════════
    ARCHITECTURAL RULES - FOLLOW THESE CAREFULLY
    ═══════════════════════════════════════════════════════════════════════════════

    1. PROPORTIONS: Small houses 5x5-7x7, Medium 7x7-11x11, Large 11x11-16x16, Towers 3x3-5x5 tall
    2. ALWAYS place solid foundation at y=0
    3. Use logs at corners for structure, hollow mode for walls
    4. Windows at y=2 (eye level), doors at y=1
    5. Roofs: Use stairs for slopes, should be 30-50% of wall height
    6. Material variety: 1-2 main blocks, 1-2 accents, max 5-7 types total
    7. Trees: Trunk at center, canopy proportional to height
    8. NO floating structures, NO walls without thickness, NO asymmetry without purpose

    ═══════════════════════════════════════════════════════════════════════════════
    LEARNING FROM EXAMPLES
    ═══════════════════════════════════════════════════════════════════════════════

    You will see EXAMPLE pairs of (description + JavaScript code) below.
    Study their patterns: how they use safeFill and safeSetBlock, foundation layout, wall structure, roof shape, symmetry, block choices.
    Use these as inspiration but DO NOT copy them exactly.
    Create a NEW structure adapted to the user's specific request.

    ═══════════════════════════════════════════════════════════════════════════════

    After planning, provide your output in this format:

    <inspiration>
    Brief paragraph about your design inspiration.
    </inspiration>

    <description>
    Brief paragraph describing how the structure looks.
    </description>

    <code>
    function buildCreation(startX, startY, startZ) {
      // Your implementation
      // REMEMBER: Do NOT use "minecraft:" prefix in block names
      // CORRECT: "oak_planks", "cobblestone", "oak_stairs"
      // WRONG: "minecraft:oak_planks"
    }
    </code>

    CRITICAL: DO NOT use async/await. Write synchronous code only. The code MUST be in <code></code> tags.
    """

    user_prompt = """
    USER REQUEST: "#{prompt}"

    INSTRUCTIONS:
    1. Think about what type of structure fits this request#{style_context}
    2. Plan the dimensions (width, depth, height) - keep it compact
    3. Design the structure using safeFill for large areas and safeSetBlock for details
    4. Follow the style-specific instructions above if provided
    5. Use appropriate materials for the style

    Output in the format with <inspiration>, <description>, and <code> tags.
    """

    messages =
      [%{"role" => "system", "content" => system_prompt}] ++
        build_js_example_messages(js_examples) ++
        [%{"role" => "user", "content" => user_prompt}]

    with {:ok, raw} <- call_llm(messages),
         {:ok, %{"code" => js_code}} <- parse_js_response(raw),
         {:ok, blocks} <- PromptcraftBackend.JsExecutor.execute(js_code),
         {:ok, structure} <- blocks_to_structure(blocks) do
      # Debug: Save generated structure and JS code
      save_debug_output(prompt, js_code, blocks, structure, raw)
      {:ok, structure}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, :bad_response}
    end
  end

  defp save_debug_output(prompt, js_code, blocks, structure, raw_response) do
    timestamp = DateTime.utc_now() |> DateTime.to_unix()
    safe_prompt = prompt |> String.replace(~r/[^a-zA-Z0-9_]/, "_") |> String.slice(0, 30)

    debug_dir = "exported"
    File.mkdir_p!(debug_dir)

    base_name = "#{debug_dir}/#{safe_prompt}_#{timestamp}"

    # Save JS code
    File.write!("#{base_name}.js", """
    // Prompt: #{prompt}
    // Generated at: #{DateTime.utc_now()}

    #{js_code}
    """)

    # Save blocks list
    File.write!("#{base_name}_blocks.json", Jason.encode!(blocks, pretty: true))

    # Save final structure
    File.write!("#{base_name}_structure.json", Jason.encode!(structure, pretty: true))

    # Save full LLM response
    File.write!("#{base_name}_llm_response.txt", raw_response)

    IO.puts("\nDEBUG: Saved debug files to:")
    IO.puts("   - #{base_name}.js")
    IO.puts("   - #{base_name}_blocks.json")
    IO.puts("   - #{base_name}_structure.json")
    IO.puts("   - #{base_name}_llm_response.txt\n")
  rescue
    e -> IO.puts("Warning: Failed to save debug output: #{Exception.message(e)}")
  end

  defp parse_js_response(text) do
    case Regex.run(~r/<code>\s*(.*?)\s*<\/code>/s, text) do
      [_, js_code] -> {:ok, %{"code" => js_code}}
      nil -> {:error, :no_code_found}
    end
  end

  defp blocks_to_structure(blocks) do
    if Enum.empty?(blocks) do
      {:error, :no_blocks}
    else
      xs = Enum.map(blocks, & &1.x)
      ys = Enum.map(blocks, & &1.y)
      zs = Enum.map(blocks, & &1.z)

      min_x = Enum.min(xs)
      max_x = Enum.max(xs)
      min_y = Enum.min(ys)
      max_y = Enum.max(ys)
      min_z = Enum.min(zs)
      max_z = Enum.max(zs)

      width = max_x - min_x + 1
      depth = max_z - min_z + 1
      height = max_y - min_y + 1

      block_map =
        blocks
        |> Enum.map(fn b ->
          pos = {b.x - min_x, b.y - min_y, b.z - min_z}
          block_str = format_block(b.block, b.block_states)
          {pos, block_str}
        end)
        |> Enum.into(%{})

      unique_blocks = block_map |> Map.values() |> Enum.uniq()

      palette =
        unique_blocks
        |> Enum.with_index()
        |> Enum.map(fn {block, idx} ->
          char = if block == "minecraft:air" do
            "#"
          else
            cond do
              idx < 26 -> <<65 + idx>>
              idx < 52 -> <<97 + (idx - 26)>>
              idx < 62 -> <<48 + (idx - 52)>>
              true -> "@"
            end
          end
          {char, block}
        end)
        |> Enum.into(%{})

      block_to_char = palette |> Enum.map(fn {k, v} -> {v, k} end) |> Enum.into(%{})

      layers =
        for y <- 0..(height - 1) do
          rows =
            for z <- 0..(depth - 1) do
              row =
                for x <- 0..(width - 1) do
                  block = Map.get(block_map, {x, y, z}, "minecraft:air")
                  Map.get(block_to_char, block, "#")
                end
                |> Enum.join("")
              row
            end

          %{"y" => y, "rows" => rows}
        end

      {:ok, %{
        "palette" => palette,
        "size" => %{"width" => width, "depth" => depth, "height" => height},
        "layers" => layers
      }}
    end
  end

  defp format_block(block_name, block_states) when is_map(block_states) and map_size(block_states) > 0 do
    states_str =
      block_states
      |> Enum.sort()
      |> Enum.map(fn {k, v} -> "#{k}=#{v}" end)
      |> Enum.join(",")
    "#{block_name}[#{states_str}]"
  end
  defp format_block(block_name, _), do: block_name

  defp call_llm(messages) do
    api_key = System.fetch_env!("OPENAI_API_KEY")

    body = %{
      "model" => "gpt-4o",
      "messages" => messages,
      "temperature" => 0.4,
      "top_p" => 0.9,
      "max_tokens" => 2500
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



  defp detect_style_from_prompt(prompt) do
    prompt_lower = String.downcase(prompt)

    style_keywords = %{
      "tree" => ["tree", "oak", "birch", "spruce", "jungle", "acacia", "dark oak", "cherry"],
      "medieval" => ["medieval", "castle", "tower", "fortress", "keep"],
      "village" => ["village", "well", "town"],
      "generic_house" => ["house", "home", "cottage", "building"]
    }

    # Check each style's keywords
    Enum.find_value(style_keywords, fn {style, keywords} ->
      if Enum.any?(keywords, &String.contains?(prompt_lower, &1)) do
        style
      end
    end)
  end
end
