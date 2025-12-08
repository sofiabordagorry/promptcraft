defmodule PromptcraftBackendWeb.Router do
  use PromptcraftBackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PromptcraftBackendWeb do
    pipe_through :api

    post "/generate", StructureController, :generate
    post "/generate-structure", StructureController, :generate
    get "/examples", StructureController, :list_examples
    get "/examples/:name", StructureController, :load_example
  end
end
