defmodule PromptcraftBackendWeb.StructureController do
  use PromptcraftBackendWeb, :controller

  def generate(conn, %{"prompt" => prompt} = params) do
    max_size = Map.get(params, "max_size", %{"width" => 50, "depth" => 50, "height" => 50})
    style = Map.get(params, "style", nil)

    case PromptcraftBackend.StructureGenerator.generate(prompt, max_size, style) do
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
end
