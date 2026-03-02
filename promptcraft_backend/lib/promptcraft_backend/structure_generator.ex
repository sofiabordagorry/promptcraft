defmodule PromptcraftBackend.StructureGenerator do
  @moduledoc false

  alias PromptcraftBackend.Style
  alias PromptcraftBackend.PromptBuilder

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

  def generate(prompt, max_size, style \\ nil) do
    allowed_blocks = load_allowed_blocks()

    detected_style = style || Style.detect_style_from_prompt(prompt)

    # Get style-specific instructions if available
    style_specific_prompt = Style.get_style_prompt(detected_style)

    style_context = Style.get_style_context(detected_style)

    prompts =
      PromptBuilder.build(%{
        prompt: prompt,
        max_size: max_size,
        allowed_blocks: allowed_blocks,
        style_specific_prompt: style_specific_prompt,
        style_context: style_context
      })

    system_prompt = prompts.system
    user_prompt = prompts.user

    messages = [
      %{"role" => "system", "content" => system_prompt},
      %{"role" => "user", "content" => user_prompt}
    ]

    with {:ok, raw} <- call_llm(messages),
         {:ok, %{"code" => py_code}} <- parse_py_response(raw),
         {:ok, blocks} <- PromptcraftBackend.PyExecutor.execute(py_code) do
      # Apply automatic corrections
      corrected_blocks = blocks
        |> fix_stair_facing()
        |> replace_glass_pane()
      
      # Calculate structure size
      structure = blocks_to_simple_structure(corrected_blocks)

      # Debug: Save generated structure and Python code
      save_debug_output(prompt, py_code, corrected_blocks, structure, raw)
      {:ok, structure}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, :bad_response}
    end
  end

  defp save_debug_output(prompt, py_code, blocks, structure, raw_response) do
    timestamp = DateTime.utc_now() |> DateTime.to_unix()
    safe_prompt = prompt |> String.replace(~r/[^a-zA-Z0-9_]/, "_") |> String.slice(0, 30)

    debug_dir = "exported"
    File.mkdir_p!(debug_dir)

    base_name = "#{debug_dir}/#{safe_prompt}_#{timestamp}"

    # Save Python code
    File.write!("#{base_name}.py", """
    # Prompt: #{prompt}
    # Generated at: #{DateTime.utc_now()}

    #{py_code}
    """)

    # Save blocks list
    File.write!("#{base_name}_blocks.json", Jason.encode!(blocks, pretty: true))

    # Save final structure
    File.write!("#{base_name}_structure.json", Jason.encode!(structure, pretty: true))

    # Save full LLM response
    File.write!("#{base_name}_llm_response.txt", raw_response)

    IO.puts("\nDEBUG: Saved debug files to:")
    IO.puts("   - #{base_name}.py")
    IO.puts("   - #{base_name}_blocks.json")
    IO.puts("   - #{base_name}_structure.json")
    IO.puts("   - #{base_name}_llm_response.txt\n")
  rescue
    e -> IO.puts("Warning: Failed to save debug output: #{Exception.message(e)}")
  end

  defp parse_py_response(text) do
    case Regex.run(~r/<code>\s*(.*?)\s*<\/code>/s, text) do
      [_, py_code] -> {:ok, %{"code" => py_code}}
      nil -> {:error, :no_code_found}
    end
  end

  defp fix_stair_facing(blocks) do
    # Separate stairs from other blocks
    {stair_blocks, other_blocks} = Enum.split_with(blocks, fn b ->
      String.contains?(b.block, "stairs")
    end)

    # Group stairs by their column (x or z position) to find sequences
    corrected_stairs = Enum.map(stair_blocks, fn stair ->
      # Find the next stair in sequence (same x or z, y is +1)
      next_stair = Enum.find(stair_blocks, fn other ->
        other != stair && other.y == stair.y + 1 &&
        (other.x == stair.x || other.z == stair.z)
      end)

      case next_stair do
        nil -> 
          # No next stair found, keep original facing or use default
          stair
        
        next_stair ->
          # Determine climb direction and set facing to match climb direction
          correct_facing = cond do
            next_stair.z > stair.z -> "south"  # Climbing south → face south
            next_stair.z < stair.z -> "north"  # Climbing north → face north
            next_stair.x > stair.x -> "east"   # Climbing east → face east
            next_stair.x < stair.x -> "west"   # Climbing west → face west
            true -> get_in(stair.block_states, ["facing"]) || "north"
          end

          # Update block_states with correct facing
          updated_states = Map.put(stair.block_states || %{}, "facing", correct_facing)
          %{stair | block_states: updated_states}
      end
    end)

    # Combine corrected stairs with other blocks
    corrected_stairs ++ other_blocks
  end

  defp replace_glass_pane(blocks) do
    Enum.map(blocks, fn block ->
      if String.contains?(block.block, "glass_pane") do
        # Replace any glass_pane variant with glass (handle both colored and plain)
        new_block = cond do
          # Plain glass_pane -> glass
          block.block == "minecraft:glass_pane" -> "minecraft:glass"
          # Colored glass_pane (e.g., white_glass_pane -> white_glass)
          String.ends_with?(block.block, "_glass_pane") -> 
            String.replace(block.block, "_glass_pane", "_glass")
          # Fallback
          true -> String.replace(block.block, "glass_pane", "glass")
        end
        
        %{block | block: new_block}
      else
        block
      end
    end)
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
    provider = Application.get_env(:promptcraft_backend, :llm)[:provider] || :gpt

    case provider do
      :gpt -> call_gpt(messages)
      :anthropic -> call_anthropic(messages)
      _ -> {:error, "Unknown provider: #{provider}"}
    end
  end

  defp call_gpt(messages) do
    api_key = System.fetch_env!("OPENAI_API_KEY")
    model = Application.get_env(:promptcraft_backend, :llm)[:openai_model] || "gpt-5.2"

    body = %{
      "model" => model,
      "messages" => messages,
      "temperature" => 0.2,
      "top_p" => 1
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

  defp call_anthropic(messages) do
    api_key = System.fetch_env!("ANTHROPIC_API_KEY")

    # Anthropic uses different message format: separate system from messages
    {system_content, user_messages} =
      case messages do
        [%{"role" => "system", "content" => sys} | rest] -> {sys, rest}
        other -> {"", other}
      end

    body = %{
      "model" => "claude-opus-4-5",
      "max_tokens" => 8096,
      "temperature" => 0.2,
      "system" => system_content,
      "messages" => user_messages
    }

    case Req.post("https://api.anthropic.com/v1/messages",
           json: body,
           headers: [
             {"x-api-key", api_key},
             {"anthropic-version", "2023-06-01"},
             {"content-type", "application/json"}
           ],
           receive_timeout: 120_000,
           connect_options: [timeout: 30_000]
         ) do
      {:ok, %Req.Response{status: 200, body: %{"content" => [%{"text" => text} | _]}}} ->
        {:ok, text}

      other ->
        {:error, other}
    end
  end
end