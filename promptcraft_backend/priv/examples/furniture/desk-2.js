// desk-2
// Size: 7x9x6
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 0, startZ + 1, startX + 2, startY + 0, startZ + 7, "smooth_sandstone");
  safeFill(startX + 2, startY + 1, startZ + 1, startX + 2, startY + 1, startZ + 7, "smooth_sandstone");
  safeFill(startX + 2, startY + 2, startZ + 1, startX + 2, startY + 2, startZ + 7, "smooth_sandstone");
  safeFill(startX + 2, startY + 3, startZ + 1, startX + 2, startY + 3, startZ + 7, "smooth_sandstone");
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "north", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "spruce_stairs", {blockStates: {facing: "east", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 2, "potted_azalea_bush");
  safeSetBlock(startX + 3, startY + 1, startZ + 3, "lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 6, "potted_azalea_bush");
  safeSetBlock(startX + 3, startY + 2, startZ + 2, "oak_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 6, "oak_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
}
