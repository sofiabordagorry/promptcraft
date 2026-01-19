// fridge_01
// Size: 4x4x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "calcite");
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "calcite");
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "white_wall_banner", {blockStates: {facing: "east"}});
}
