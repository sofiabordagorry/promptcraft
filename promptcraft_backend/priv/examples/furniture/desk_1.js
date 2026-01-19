// desk_1
// Size: 5x8x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "dark_oak_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "dark_oak_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "dark_oak_planks");
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "dark_oak_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "dark_oak_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 2, "potted_cactus");
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "white_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 4, "heavy_weighted_pressure_plate", {blockStates: {power: "0"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 5, "stone_button", {blockStates: {face: "FLOOR", facing: "north", powered: "false"}});
}
