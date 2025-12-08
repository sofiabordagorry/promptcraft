defmodule PromptcraftBackendWeb.StructureController do
  use PromptcraftBackendWeb, :controller

  def generate(conn, %{"prompt" => prompt} = params) do
    max_size = Map.get(params, "max_size", %{"width" => 16, "depth" => 16, "height" => 16})

    case PromptcraftBackend.StructureGenerator.generate(prompt, max_size) do
      {:ok, structure} ->
        json(conn, structure)

      {:error, reason} ->
        conn
        |> put_status(:bad_request)
        |> json(%{"error" => inspect(reason)})
    end
  end

  def generate(conn, _params) do
    conn
    |> put_status(:bad_request)
    |> json(%{"error" => "prompt is required"})
  end

  def load_example(conn, %{"name" => name}) do
    example_path = Path.join(["priv", "examples", "medieval", "#{name}.json"])

    case File.read(example_path) do
      {:ok, content} ->
        case Jason.decode(content) do
          {:ok, %{"structure" => structure}} ->
            json(conn, structure)

          {:error, _} ->
            conn
            |> put_status(:internal_server_error)
            |> json(%{"error" => "Invalid JSON in example file"})
        end

      {:error, :enoent} ->
        conn
        |> put_status(:not_found)
        |> json(%{"error" => "Example not found"})

      {:error, reason} ->
        conn
        |> put_status(:internal_server_error)
        |> json(%{"error" => inspect(reason)})
    end
  end

  def list_examples(conn, _params) do
    examples_dir = Path.join(["priv", "examples", "medieval"])

    case File.ls(examples_dir) do
      {:ok, files} ->
        examples =
          files
          |> Enum.filter(&String.ends_with?(&1, ".json"))
          |> Enum.map(fn file ->
            name = String.replace(file, ".json", "")
            path = Path.join(examples_dir, file)

            case File.read(path) do
              {:ok, content} ->
                case Jason.decode(content) do
                  {:ok, %{"description" => desc}} ->
                    %{name: name, description: desc}

                  _ ->
                    %{name: name, description: "No description"}
                end

              _ ->
                %{name: name, description: "Error reading file"}
            end
          end)

        json(conn, %{examples: examples})

      {:error, _} ->
        json(conn, %{examples: []})
    end
  end
end
