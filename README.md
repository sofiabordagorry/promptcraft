# PromptCraft

AI-powered Minecraft structure generation from natural language descriptions.

PromptCraft integrates Minecraft Java Edition (Fabric mod) with an Elixir Phoenix backend powered by LLMs. Players describe structures using the `/askAI` command, receive a special builder block, and place it in the world to automatically generate the structure.

## Features

- `/askAI <description>` command in Minecraft
- Backend powered by OpenAI GPT-4o-mini (configurable)
- JSON-based structure format with palette and layers
- Custom builder block that constructs structures dynamically
- Modular architecture with configurable block lists
- HTTP client for async communication between mod and backend

## Project Structure

```
PromptCraft/
├── PromptCraft/                    # Fabric mod (Minecraft Java)
│   ├── src/main/java/com/example/
│   │   ├── ExampleMod.java         # Main mod + /askAI command
│   │   ├── AIBuildingBlock.java   # Builder block logic
│   │   ├── ModBlocks.java          # Block registration
│   │   ├── http/
│   │   │   └── BackendClient.java # HTTP client to backend
│   │   └── structure/
│   │       ├── StructureDefinition.java
│   │       ├── StructureRegistry.java
│   │       ├── StructureSize.java
│   │       └── StructureLayer.java
│   └── src/main/resources/
│       ├── fabric.mod.json         # Mod metadata
│       └── assets/modid/           # Textures and models
└── promptcraft_backend/            # Phoenix backend (Elixir)
    ├── lib/promptcraft_backend/
    │   ├── structure_generator.ex  # LLM integration
    │   └── application.ex
    ├── lib/promptcraft_backend_web/
    │   ├── controllers/
    │   │   └── structure_controller.ex
    │   └── router.ex
    ├── priv/
    │   └── allowed_blocks.txt      # Configurable block list
    └── test/                       # Unit and integration tests
```

## Quick Start

### Prerequisites

- Java 21
- Gradle 8.11.1
- Minecraft 1.21.1
- Erlang 27
- Elixir 1.18
- OpenAI API key

### Backend Setup

```bash
cd promptcraft_backend

# Configure API key (PowerShell)
$env:OPENAI_API_KEY="your-api-key"

# Install dependencies
mix deps.get

# Start server (port 4000)
mix phx.server
```

### Mod Setup

```bash
cd PromptCraft

# Build mod
.\gradlew.bat build

# Run Minecraft client
.\gradlew.bat runClient
```

## Usage

1. Start the backend server (see Backend Setup)
2. Launch Minecraft with the mod installed
3. In-game, run: `/askAI build me a small medieval tower`
4. Wait for the generation (you'll see messages in chat)
5. Receive a builder block in your inventory
6. Place the block in the world to construct the structure

## Configuration

### Changing the LLM Model

Edit `promptcraft_backend/lib/promptcraft_backend/structure_generator.ex`:

```elixir
body = %{
  "model" => "gpt-4o-mini",  # Change here
  ...
}
```

Available models: `gpt-4o-mini`, `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`

### Adding Allowed Blocks

Edit `promptcraft_backend/priv/allowed_blocks.txt`:

```
# Add one block ID per line
minecraft:diamond_block
minecraft:emerald_block
```

Restart the backend after changes.

### Backend Configuration

The backend runs on `http://localhost:4000` by default. To change:

Edit `PromptCraft/src/main/java/com/example/http/BackendClient.java`:

```java
private static final String BACKEND_URL = "http://localhost:4000/api/generate";
```

## API Documentation

### POST /api/generate

Generate a Minecraft structure from a text prompt.

**Request:**
```json
{
  "prompt": "a cozy wooden cabin",
  "max_size": {
    "width": 16,
    "depth": 16,
    "height": 16
  }
}
```

**Response:**
```json
{
  "palette": {
    "W": "minecraft:oak_planks",
    "L": "minecraft:oak_log",
    "#": "minecraft:air"
  },
  "size": {
    "width": 7,
    "depth": 7,
    "height": 5
  },
  "layers": [
    {
      "y": 0,
      "rows": ["WWWWWWW", "W#####W", "W#####W", "W#####W", "WWWWWWW"]
    }
  ]
}
```

## Development

### Running Tests

```bash
# Backend tests (excluding OpenAI integration)
cd promptcraft_backend
mix test --exclude integration

# Backend tests with OpenAI (requires API key)
mix test --include integration

# Mod build
cd PromptCraft
.\gradlew.bat build
```

### Project Architecture

**Minecraft Mod (Java):**
- Command handler registers `/askAI` command
- BackendClient makes async HTTP POST to backend
- StructureRegistry stores generated structures by UUID
- AIBuildingBlock reads UUID from NBT and builds structure

**Backend (Elixir/Phoenix):**
- StructureController receives HTTP requests
- StructureGenerator calls OpenAI API with structured prompt
- Returns JSON structure definition
- Configurable block list from text file

## Troubleshooting

### "Error: Backend error: 500"

Backend is not running or crashed. Check backend terminal for errors.

### "Error: OPENAI_API_KEY not set"

Configure the environment variable before starting the backend:
```powershell
$env:OPENAI_API_KEY="your-key"
```

### "Structure not found" in-game

The structure UUID is missing or invalid. This happens if:
- Backend crashed after generating
- Server restart cleared the registry
- Block was obtained without using `/askAI`

### Blocks floating one block above ground

This is a known issue with layer Y-coordinate interpretation. The prompt has been updated to clarify that y=0 is ground level.

## License

CC0-1.0

## Authors

Sofia Bordagorry

