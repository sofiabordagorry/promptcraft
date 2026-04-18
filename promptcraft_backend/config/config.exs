# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :promptcraft_backend,
  generators: [timestamp_type: :utc_datetime]

# Configures the endpoint
config :promptcraft_backend, PromptcraftBackendWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [json: PromptcraftBackendWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: PromptcraftBackend.PubSub,
  live_view: [signing_salt: "hBpWfOPJ"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :promptcraft_backend, PromptcraftBackend.Mailer, adapter: Swoosh.Adapters.Local

# Configures Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# LLM Provider configuration
# Options: :gpt or :anthropic
config :promptcraft_backend, :llm,
  provider: :anthropic,
  anthropic_model: "claude-opus-4-7",
  openai_model: "gpt-5.2"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
