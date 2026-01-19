// table_1
// Size: 4x4x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 0, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "turtle_egg", {blockStates: {eggs: "3", hatch: "0"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
}
