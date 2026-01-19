// two_couchs
// Size: 6x15x4
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 0, startZ + 2, startX + 2, startY + 0, startZ + 6, "yellow_wool");
  safeFill(startX + 2, startY + 1, startZ + 9, startX + 2, startY + 1, startZ + 13, "warped_slab[type=bottom,waterlogged=false]", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeFill(startX + 2, startY + 1, startZ + 2, startX + 2, startY + 1, startZ + 6, "bamboo_slab[type=bottom,waterlogged=false]", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeFill(startX + 2, startY + 0, startZ + 9, startX + 2, startY + 0, startZ + 13, "blue_wool");
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "bamboo_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "bamboo_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "bamboo_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "bamboo_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "bamboo_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 9, "warped_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 10, "warped_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 11, "warped_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 12, "warped_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 13, "warped_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
}
