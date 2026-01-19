// bedroom_1
// Size: 8x6x8
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 0, startZ + 1, startX + 2, startY + 0, startZ + 4, "white_concrete_powder");
  safeFill(startX + 2, startY + 1, startZ + 1, startX + 2, startY + 1, startZ + 4, "white_concrete_powder");
  safeFill(startX + 2, startY + 4, startZ + 1, startX + 2, startY + 4, startZ + 4, "white_concrete_powder");
  safeSetBlock(startX + 3, startY + 0, startZ + 1, "gray_concrete");
  safeSetBlock(startX + 4, startY + 0, startZ + 1, "gray_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "gray_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "gray_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "gray_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "gray_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "gray_concrete");
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "gray_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 1, "end_rod", {blockStates: {facing: "up"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 4, "end_rod", {blockStates: {facing: "up"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 1, "white_concrete_powder");
  safeSetBlock(startX + 3, startY + 2, startZ + 1, "heavy_weighted_pressure_plate", {blockStates: {power: "0"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "light_gray_concrete_powder");
  safeSetBlock(startX + 2, startY + 2, startZ + 3, "light_gray_terracotta");
  safeSetBlock(startX + 2, startY + 2, startZ + 4, "white_concrete_powder");
  safeSetBlock(startX + 3, startY + 2, startZ + 4, "heavy_weighted_pressure_plate", {blockStates: {power: "0"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 1, "white_concrete_powder");
  safeSetBlock(startX + 2, startY + 3, startZ + 2, "white_terracotta");
  safeSetBlock(startX + 2, startY + 3, startZ + 3, "light_gray_concrete_powder");
  safeSetBlock(startX + 2, startY + 3, startZ + 4, "white_concrete_powder");
}
