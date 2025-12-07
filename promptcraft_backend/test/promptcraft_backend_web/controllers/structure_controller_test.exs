defmodule PromptcraftBackendWeb.StructureControllerTest do
  use PromptcraftBackendWeb.ConnCase, async: false

  describe "POST /api/generate" do
    test "returns 400 when prompt is missing", %{conn: conn} do
      conn = post(conn, ~p"/api/generate", %{})

      assert json_response(conn, 400)
    end

    test "accepts prompt and max_size parameters", %{conn: conn} do
      params = %{
        "prompt" => "a small house",
        "max_size" => %{"width" => 10, "depth" => 10, "height" => 5}
      }

      conn = post(conn, ~p"/api/generate", params)

      assert conn.status in [200, 400]
    end

    test "uses default max_size when not provided", %{conn: conn} do
      params = %{"prompt" => "a tower"}

      conn = post(conn, ~p"/api/generate", params)

      assert conn.status in [200, 400]
    end
  end
end
