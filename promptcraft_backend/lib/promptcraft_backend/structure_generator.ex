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
                description =
                  case Regex.run(~r/^\/\/\s*(.+)$/m, content) do
                    [_, desc] -> desc
                    _ -> "Example structure"
                  end

                {description, content}

              {:error, _} ->
                nil
            end
          end)
          |> Enum.reject(&is_nil/1)

        {:error, _} ->
          []
      end
    end)
  end

  defp pick_js_examples(n, style) do
    examples =
      case style do
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
              description =
                case Regex.run(~r/^\/\/\s*(.+)$/m, content) do
                  [_, desc] -> desc
                  _ -> "Example structure"
                end

              {description, content}

            {:error, _} ->
              nil
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
          "content" =>
            "<inspiration>This structure demonstrates #{description}.</inspiration>\n\n<description>#{description}</description>\n\n<code>\n#{js_code}\n</code>"
        }
      ]
    end)
  end

  def generate(prompt, max_size, style \\ nil) do
    allowed_blocks = load_allowed_blocks()

    detected_style = style || detect_style_from_prompt(prompt)

    js_examples = pick_js_examples(3, detected_style)

    # Get style-specific instructions if available
    style_specific_prompt =
      case Config.get_style_config(detected_style) do
        {:ok, %{custom_prompt: custom}} ->
          """

          ═══════════════════════════════════════════════════════════════════════════════
          STYLE-SPECIFIC INSTRUCTIONS
          ═══════════════════════════════════════════════════════════════════════════════

          #{custom}
          """

        {:error, _} ->
          ""
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
    • NEVER use "air" blocks to create door/window openings - build wall segments that skip those positions instead

    BLOCK ORIENTATION:
    • Doors: facing should point AWAY from wall (into the room)
      - Front door on south wall (z=0): facing: "south"
      - Door on north wall: facing: "north"
    • Beds: MUST use part: "foot" and part: "head" for 2-block structure
      - Place foot first, then head in direction of facing
    • Chests/Furnaces: Always specify facing direction
    • Logs: Specify axis: "x", "y", or "z" (y for vertical posts)
    • Stairs: Always specify facing and half: "bottom" or "top"

    ═══════════════════════════════════════════════════════════════════════════════
    GENERAL ARCHITECTURAL RULES
    ═══════════════════════════════════════════════════════════════════════════════

    1. PROPORTIONS: Follow style-specific guidelines (see style prompts below)
    2. FOUNDATION: Always place solid foundation at startY (y=0)
    3. STRUCTURE: Use appropriate materials for corners/structural elements
    4. DETAILS: Windows at y+2 (eye level), doors at y+1
    5. ROOFS: Use stairs for slopes when appropriate (houses, buildings)
    6. MATERIALS: 1-2 main blocks, 1-2 accents, max 5-7 types total for cohesion
    7. PHYSICS: NO floating structures, ensure proper support
    8. AESTHETICS: Consider symmetry/asymmetry based on structure type

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
         {:ok, blocks} <- PromptcraftBackend.JsExecutor.execute(js_code) do
      # Calculate structure size
      structure = blocks_to_simple_structure(blocks)

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

  defp blocks_to_simple_structure(blocks) do
    if Enum.empty?(blocks) do
      %{
        "blocks" => [],
        "size" => %{"width" => 0, "depth" => 0, "height" => 0}
      }
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

      # Normalize blocks to start at (0,0,0)
      normalized_blocks =
        blocks
        |> Enum.map(fn b ->
          %{
            "x" => b.x - min_x,
            "y" => b.y - min_y,
            "z" => b.z - min_z,
            "block" => b.block,
            "block_states" => b.block_states || %{}
          }
        end)

      %{
        "blocks" => normalized_blocks,
        "size" => %{"width" => width, "depth" => depth, "height" => height}
      }
    end
  end

  defp call_llm(messages) do
    api_key = System.fetch_env!("OPENAI_API_KEY")

    body = %{
      "model" => "gpt-5.2",
      "messages" => messages,
      "temperature" => 0.4,
      "top_p" => 0.9,
    }

    case Req.post("https://api.openai.com/v1/chat/completions",
           json: body,
           headers: [
             {"authorization", "Bearer #{api_key}"},
             {"content-type", "application/json"}
           ],
           receive_timeout: 120_000,
           connect_options: [timeout: 30_000]
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
end
