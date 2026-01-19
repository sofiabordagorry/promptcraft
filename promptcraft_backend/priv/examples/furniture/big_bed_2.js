// big_bed_2
// Size: 9x8x8
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 3, startY + 0, startZ + 2, startX + 3, startY + 0, startZ + 6, "light_gray_concrete");
  safeFill(startX + 3, startY + 4, startZ + 2, startX + 3, startY + 4, startZ + 6, "light_gray_concrete");
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "east", half: "top", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 2, "spruce_wall_sign", {blockStates: {facing: "north", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "light_blue_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 3, "light_blue_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 4, "light_blue_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 4, "light_blue_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 5, "spruce_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 5, "spruce_wall_sign", {blockStates: {facing: "south", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 5, "spruce_wall_sign", {blockStates: {facing: "south", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 6, "azalea_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 2, "light_gray_concrete");
  safeSetBlock(startX + 4, startY + 1, startZ + 2, "azalea_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 3, "light_gray_concrete");
  safeSetBlock(startX + 4, startY + 1, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "east", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 4, "light_gray_concrete");
  safeSetBlock(startX + 4, startY + 1, startZ + 4, "flower_pot");
  safeSetBlock(startX + 3, startY + 1, startZ + 5, "black_stained_glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 6, "light_gray_concrete");
  safeSetBlock(startX + 3, startY + 2, startZ + 2, "light_gray_concrete");
  safeSetBlock(startX + 3, startY + 2, startZ + 3, "black_stained_glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 3, "flower_pot");
  safeSetBlock(startX + 3, startY + 2, startZ + 4, "light_gray_concrete");
  safeSetBlock(startX + 4, startY + 2, startZ + 4, "cave_vines_plant", {blockStates: {berries: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 5, "black_stained_glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "east", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 6, "light_gray_concrete");
  safeSetBlock(startX + 3, startY + 3, startZ + 2, "light_gray_concrete");
  safeSetBlock(startX + 3, startY + 3, startZ + 3, "black_stained_glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 4, "light_gray_concrete");
  safeSetBlock(startX + 4, startY + 3, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 5, "light_gray_concrete");
  safeSetBlock(startX + 4, startY + 3, startZ + 5, "azalea_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 6, "light_gray_concrete");
}
