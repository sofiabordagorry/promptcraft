// bench
// Size: 5x6x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "oak_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "oak_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "oak_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
}
