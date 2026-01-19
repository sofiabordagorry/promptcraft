// bathroom_furniture_1
// Size: 6x5x5
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "smooth_sandstone");
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "polished_deepslate");
  safeSetBlock(startX + 3, startY + 0, startZ + 1, "polished_blackstone_button", {blockStates: {face: "WALL", facing: "east", powered: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "smooth_sandstone");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "polished_blackstone_stairs", {blockStates: {facing: "east", half: "bottom", shape: "straight", waterlogged: "true"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "smooth_sandstone");
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "polished_deepslate");
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "polished_blackstone_button", {blockStates: {face: "WALL", facing: "east", powered: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "smooth_sandstone");
  safeSetBlock(startX + 2, startY + 1, startZ + 1, "dead_horn_coral", {blockStates: {waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "smooth_sandstone");
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "smooth_sandstone");
  safeSetBlock(startX + 2, startY + 1, startZ + 3, "black_candle", {blockStates: {candles: "3", lit: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 1, "smooth_sandstone");
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "smooth_sandstone");
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "light_blue_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 3, "smooth_sandstone");
}
