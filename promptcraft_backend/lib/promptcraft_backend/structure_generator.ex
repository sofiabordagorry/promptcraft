defmodule PromptcraftBackend.StructureGenerator do
  @moduledoc false

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

  def generate(prompt, max_size) do
    allowed_blocks = load_allowed_blocks()
    system_prompt = """
    You are an assistant that designs Minecraft structures.

    You MUST respond with a single valid JSON object, no markdown, no explanation.
    The JSON format is:

    {
      "palette": { "A": "minecraft:block_id", "B": "minecraft:block_id", "#": "minecraft:air", ... },
      "size": { "width": int, "depth": int, "height": int },
      "layers": [
        {
          "y": int,
          "rows": [ "string_of_length_width", "..." ]  // exactly 'depth' rows
        }
      ]
    }

    IMPORTANT RULES:
    - width, depth, height MUST be <= #{max_size["width"]}, #{max_size["depth"]}, #{max_size["height"]}.
    - Only use these block IDs: #{Enum.join(allowed_blocks, ", ")}.
    - Use '#' in rows for air and map it to "minecraft:air" in the palette.
    - Layers MUST start at y=0 (ground level) and increase sequentially (0, 1, 2, 3...).
    - y=0 is the FIRST layer of blocks touching the ground, NOT floating in the air.
    - Every layer from y=0 to y=height-1 must be included.
    """

    user_prompt = """
    Build a structure with this description: #{prompt}.
    Respect the size limits and return ONLY the JSON, nothing else.
    """

    with {:ok, raw} <- call_llm(system_prompt, user_prompt),
         {:ok, parsed} <- Jason.decode(raw) do
      {:ok, parsed}
    else
      {:error, reason} -> {:error, reason}
      _ -> {:error, :bad_response}
    end
  end

  defp call_llm(system_prompt, user_prompt) do
    api_key = System.fetch_env!("OPENAI_API_KEY")

    body = %{
      "model" => "gpt-5.1",
      "messages" => [
        %{"role" => "system", "content" => system_prompt},
        %{"role" => "user", "content" => user_prompt}
      ],
      "temperature" => 0.7,
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
