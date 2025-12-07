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
    You are an assistant that designs **small medieval-style Minecraft buildings**.

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

    GENERAL RULES:
    - You design a single coherent building (house, tower, gate, etc.), not scattered blocks.
    - The structure must look medieval: stone / stone bricks foundation, wooden walls, beams, and a pitched roof (triangular) made of stairs or slabs.
    - Prefer symmetry whenever possible (especially on the front face).
    - Avoid flat roofs and big rectangular blobs with no detail.
    - The building must have at least:
      - A clear entrance (a door space at ground level).
      - Some windows (using glass or fences as medieval windows).
      - A recognizable roof silhouette.

    JSON RULES:
    - width, depth, height MUST be <= #{max_size["width"]}, #{max_size["depth"]}, #{max_size["height"]}.
    - Only use these block IDs in the palette: #{Enum.join(allowed_blocks, ", ")}.
    - Use '#' in rows for air and map it to "minecraft:air" in the palette.
    - Every non-# character used in rows MUST appear as a key in the palette.
    - Layers' y must start at 0 and increase contiguously without gaps.
    - Each layer must have exactly 'depth' rows, and each row must have exactly 'width' characters.
    """

    user_prompt = """
    Build a **small medieval-style structure** with this description: "#{prompt}".

    Constraints:
    - It must fit within the max size given in the system prompt.
    - It should be compact and readable, not overly complex.
    - If the user description is very vague, default to a simple medieval house.

    Return ONLY the JSON object, nothing else.
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
      "model" => "gpt-4o-mini",
      "messages" => [
        %{"role" => "system", "content" => system_prompt},
        %{"role" => "user", "content" => user_prompt}
      ],
      "temperature" => 0.3,
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
