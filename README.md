# Promptcraft

AI-powered Minecraft structure generation from natural language descriptions.

Promptcraft integrates Minecraft Java Edition (Fabric mod) with an Elixir Phoenix backend powered by LLMs. Players describe structures using the `/askAI` command, receive a special builder block, and place it in the world to automatically generate the structure.

- `/askAI <description>` command in Minecraft
- Backend powered by OpenAI GPT-5.2 (configurable)
- LLM generates Python code that is executed server-side
- Style-based generation with auto-detection (tree, house, village, furniture)
- Custom builder block that constructs structures dynamically
- Modular architecture with configurable block lists
- HTTP client for async communication between mod and backend
- Debug output exports (Python code, blocks JSON, structure JSON, LLM response)

## Quick Start

### Prerequisites

- Java 21
- Gradle 8.11.1
- Minecraft 1.21.1
- Erlang 27
- Elixir 1.18
- Python 3.8+
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
cd Promptcraft

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
  "model" => "gpt-5.2",  # Change here
  "temperature" => 0.4,
  "top_p" => 0.9,
  ...
}
```

Available models: `gpt-5.2`, `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-3.5-turbo`

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

Edit `Promptcraft/src/main/java/com/example/http/BackendClient.java`:

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
  },
  "style": "house"
}
```

**Parameters:**
- `prompt` (required): Text description of the structure to generate
- `max_size` (optional): Maximum dimensions for the structure. Defaults to 50x50x50
  - `width`: Maximum width (X axis)
  - `depth`: Maximum depth (Z axis)
  - `height`: Maximum height (Y axis)
- `style` (optional): Building style. Available styles:
  - `"tree"`: Natural trees (oak, spruce, birch, etc.)
  - `"house"`: Residential buildings, cottages, homes
  - `"village"`: Village structures (wells, community buildings)
  - `"furniture"`: Interior furniture and decorations
  - If not provided, style is auto-detected from keywords in the prompt

**How it works:**
1. The LLM receives the prompt and generates Python code using `fillRegion()` and `placeBlock()` functions
2. The Python code is executed server-side in a sandboxed environment
3. The execution produces a list of blocks with coordinates and properties
4. Coordinates are normalized to start at (0,0,0)
5. The final structure is returned as JSON

**Response:**
```json
{
  "blocks": [
    {
      "block": "minecraft:oak_planks",
      "block_states": {},
      "x": 0,
      "y": 0,
      "z": 0
    },
    {
      "block": "minecraft:oak_log",
      "block_states": {
        "axis": "y"
      },
      "x": 0,
      "y": 1,
      "z": 0
    },
    {
      "block": "minecraft:air",
      "block_states": {},
      "x": 1,
      "y": 0,
      "z": 0
    }
  ],
  "size": {
    "width": 7,
    "depth": 7,
    "height": 5
  }
}
```

**Response Fields:**
- `blocks`: Array of block placements (coordinates normalized to start at 0,0,0)
  - `block`: Full block ID (e.g., "minecraft:oak_planks")
  - `block_states`: Block properties (e.g., facing direction, axis, half)
  - `x`, `y`, `z`: Block position coordinates (Y=0 is the bottom of the structure)
- `size`: Calculated bounding box dimensions
  - `width`: Structure width (X dimension)
  - `depth`: Structure depth (Z dimension)
  - `height`: Structure height (Y dimension)

## Development

### Running Tests

```bash
# Backend tests (excluding OpenAI integration)
cd promptcraft_backend
mix test --exclude integration

# Backend tests with OpenAI (requires API key)
mix test --include integration

# Mod build
cd Promptcraft
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
- PyExecutor runs Python code in sandboxed environment

