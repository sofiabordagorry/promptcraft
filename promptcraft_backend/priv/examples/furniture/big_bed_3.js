// big_bed_3
// Size: 8x8x5
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 0, startZ + 2, startX + 2, startY + 0, startZ + 6, "light_gray_concrete");
  safeFill(startX + 2, startY + 1, startZ + 2, startX + 2, startY + 1, startZ + 6, "light_gray_concrete");
  safeFill(startX + 2, startY + 2, startZ + 2, startX + 2, startY + 2, startZ + 6, "light_gray_concrete");
  safeFill(startX + 2, startY + 3, startZ + 2, startX + 2, startY + 3, startZ + 6, "light_gray_concrete");
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "barrel", {blockStates: {facing: "east", open: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 3, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "barrel", {blockStates: {facing: "north", open: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "purple_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 4, "purple_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 4, "campfire", {blockStates: {facing: "north", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "barrel", {blockStates: {facing: "east", open: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 5, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 5, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 5, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 3, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 4, "large_amethyst_bud", {blockStates: {facing: "up", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 5, "flower_pot");
  safeSetBlock(startX + 3, startY + 2, startZ + 3, "barrel", {blockStates: {facing: "east", open: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 3, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 4, "flowering_azalea_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 4, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 5, "barrel", {blockStates: {facing: "east", open: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 5, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 3, "purple_candle", {blockStates: {candles: "3", lit: "false", waterlogged: "false"}});
}
