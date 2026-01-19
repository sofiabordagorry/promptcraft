// wooden_well
// Size: 8x5x6
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "tuff_brick_wall", {blockStates: {east: "low", north: "none", south: "low", up: "true", waterlogged: "false", west: "none"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 1, "crafter", {blockStates: {crafting: "false", orientation: "UP_SOUTH", triggered: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 1, "tuff_brick_wall", {blockStates: {east: "none", north: "none", south: "low", up: "true", waterlogged: "false", west: "low"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "crafter", {blockStates: {crafting: "false", orientation: "UP_EAST", triggered: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "crafter", {blockStates: {crafting: "false", orientation: "UP_WEST", triggered: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "tuff_brick_wall", {blockStates: {east: "low", north: "low", south: "none", up: "true", waterlogged: "false", west: "none"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "crafter", {blockStates: {crafting: "false", orientation: "UP_NORTH", triggered: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "tuff_brick_wall", {blockStates: {east: "none", north: "low", south: "none", up: "true", waterlogged: "false", west: "low"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "tuff_brick_wall", {blockStates: {east: "none", north: "none", south: "none", up: "true", waterlogged: "false", west: "none"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 2, "water_cauldron", {blockStates: {level: "3"}});
  safeSetBlock(startX + 4, startY + 1, startZ + 2, "tuff_brick_wall", {blockStates: {east: "none", north: "none", south: "none", up: "true", waterlogged: "false", west: "none"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "spruce_fence", {blockStates: {east: "false", north: "false", south: "false", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 2, "chain", {blockStates: {axis: "y", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 2, "spruce_fence", {blockStates: {east: "false", north: "false", south: "false", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 1, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 1, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 3, startZ + 1, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 2, "barrel", {blockStates: {facing: "east", open: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 2, "grindstone", {blockStates: {face: "CEILING", facing: "east"}});
  safeSetBlock(startX + 4, startY + 3, startZ + 2, "barrel", {blockStates: {facing: "west", open: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 3, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 3, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 3, startZ + 3, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 4, startZ + 1, "rail", {blockStates: {shape: "ascending_south", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 4, startZ + 1, "rail", {blockStates: {shape: "ascending_south", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 4, startZ + 2, "polished_blackstone_button", {blockStates: {face: "WALL", facing: "west", powered: "false"}});
  safeSetBlock(startX + 2, startY + 4, startZ + 2, "oak_log", {blockStates: {axis: "x"}});
  safeSetBlock(startX + 3, startY + 4, startZ + 2, "oak_log", {blockStates: {axis: "x"}});
  safeSetBlock(startX + 4, startY + 4, startZ + 2, "oak_log", {blockStates: {axis: "x"}});
  safeSetBlock(startX + 5, startY + 4, startZ + 2, "polished_blackstone_button", {blockStates: {face: "WALL", facing: "east", powered: "false"}});
  safeSetBlock(startX + 2, startY + 4, startZ + 3, "rail", {blockStates: {shape: "ascending_north", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 4, startZ + 3, "rail", {blockStates: {shape: "ascending_north", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 5, startZ + 2, "rail", {blockStates: {shape: "north_south", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 5, startZ + 2, "rail", {blockStates: {shape: "north_south", waterlogged: "false"}});
}
