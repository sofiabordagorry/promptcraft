// mirror_desk
// Size: 6x7x6
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 0, startY + 0, startZ + 1, startX + 0, startY + 0, startZ + 5, "white_concrete_powder");
  safeFill(startX + 0, startY + 1, startZ + 1, startX + 0, startY + 1, startZ + 5, "white_concrete_powder");
  safeFill(startX + 0, startY + 2, startZ + 1, startX + 0, startY + 2, startZ + 5, "white_concrete_powder");
  safeFill(startX + 0, startY + 3, startZ + 1, startX + 0, startY + 3, startZ + 5, "white_concrete_powder");
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "birch_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "bamboo_wall_sign", {blockStates: {facing: "north", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "birch_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "smooth_sandstone_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "bamboo_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "birch_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "bamboo_wall_sign", {blockStates: {facing: "south", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "potted_warped_roots");
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "dead_tube_coral", {blockStates: {waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "cyan_candle", {blockStates: {candles: "2", lit: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 3, "white_wall_banner", {blockStates: {facing: "east"}});
}
