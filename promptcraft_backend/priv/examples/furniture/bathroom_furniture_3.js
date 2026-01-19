// bathroom_furniture_3
// Size: 6x7x6
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 1, startY + 1, startZ + 1, startX + 1, startY + 1, startZ + 5, "andesite_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "light_gray_concrete");
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "white_wall_banner", {blockStates: {facing: "north"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "light_gray_concrete");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "smooth_quartz_stairs", {blockStates: {facing: "north", half: "bottom", shape: "inner_right", waterlogged: "true"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "white_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "light_gray_concrete");
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "smooth_quartz_stairs", {blockStates: {facing: "east", half: "bottom", shape: "straight", waterlogged: "true"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "white_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "stone");
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "smooth_quartz_stairs", {blockStates: {facing: "south", half: "bottom", shape: "inner_left", waterlogged: "true"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "white_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 5, "stone");
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "white_wall_banner", {blockStates: {facing: "south"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 1, "white_concrete_powder");
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "white_concrete");
  safeSetBlock(startX + 1, startY + 2, startZ + 3, "white_concrete_powder");
  safeSetBlock(startX + 2, startY + 2, startZ + 3, "white_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 4, "white_concrete");
  safeSetBlock(startX + 1, startY + 2, startZ + 5, "white_concrete_powder");
  safeSetBlock(startX + 1, startY + 3, startZ + 1, "white_concrete_powder");
  safeSetBlock(startX + 1, startY + 3, startZ + 2, "white_concrete");
  safeSetBlock(startX + 1, startY + 3, startZ + 3, "white_concrete_powder");
  safeSetBlock(startX + 1, startY + 3, startZ + 4, "white_concrete");
  safeSetBlock(startX + 1, startY + 3, startZ + 5, "white_concrete_powder");
}
