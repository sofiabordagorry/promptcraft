// bed_5
// Size: 7x7x4
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 3, startY + 1, startZ + 2, startX + 3, startY + 1, startZ + 5, "spruce_stairs[facing=west,half=top,shape=straight,waterlogged=false]", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeFill(startX + 2, startY + 0, startZ + 1, startX + 2, startY + 0, startZ + 6, "light_gray_concrete");
  safeFill(startX + 2, startY + 1, startZ + 1, startX + 2, startY + 1, startZ + 6, "light_gray_concrete");
  safeFill(startX + 2, startY + 2, startZ + 1, startX + 2, startY + 2, startZ + 6, "light_gray_concrete");
  safeSetBlock(startX + 3, startY + 0, startZ + 1, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "dead_fire_coral_fan", {blockStates: {waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "dead_fire_coral_fan", {blockStates: {waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "red_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "red_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 3, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "red_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 4, "red_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 4, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 5, "dead_fire_coral_fan", {blockStates: {waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 5, "dead_fire_coral_fan", {blockStates: {waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 1, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 6, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 2, "candle", {blockStates: {candles: "3", lit: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 5, "flower_pot");
}
