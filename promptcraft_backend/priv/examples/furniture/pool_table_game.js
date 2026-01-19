// pool_table_game
// Size: 8x6x3
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 1, startZ + 3, startX + 6, startY + 1, startZ + 3, "green_carpet");
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "dark_oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 1, "dark_oak_wall_sign", {blockStates: {facing: "north", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 1, "dark_oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 1, "dark_oak_wall_sign", {blockStates: {facing: "north", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 1, "dark_oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "dark_oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "dispenser", {blockStates: {facing: "up", triggered: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "dark_oak_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "dispenser", {blockStates: {facing: "up", triggered: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "dark_oak_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 2, "dispenser", {blockStates: {facing: "up", triggered: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 2, "dark_oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "dark_oak_wall_sign", {blockStates: {facing: "west", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "dark_oak_stairs", {blockStates: {facing: "east", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "birch_sign", {blockStates: {rotation: "0", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "dark_oak_sign", {blockStates: {rotation: "0", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "dark_oak_sign", {blockStates: {rotation: "0", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 3, "dark_oak_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 3, "dark_oak_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "dark_oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "dispenser", {blockStates: {facing: "up", triggered: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "dark_oak_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "dispenser", {blockStates: {facing: "up", triggered: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 4, "dark_oak_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 4, "dispenser", {blockStates: {facing: "up", triggered: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 4, "dark_oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "dark_oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "dark_oak_wall_sign", {blockStates: {facing: "south", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 5, "dark_oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 5, "dark_oak_wall_sign", {blockStates: {facing: "south", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 5, "dark_oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 2, "green_carpet");
  safeSetBlock(startX + 5, startY + 1, startZ + 2, "green_carpet");
  safeSetBlock(startX + 3, startY + 1, startZ + 4, "green_carpet");
  safeSetBlock(startX + 5, startY + 1, startZ + 4, "green_carpet");
}
