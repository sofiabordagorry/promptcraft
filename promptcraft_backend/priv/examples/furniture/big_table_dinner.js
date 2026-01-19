// big_table_dinner
// Size: 10x11x3
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 3, startY + 0, startZ + 3, startX + 3, startY + 0, startZ + 8, "spruce_trapdoor[facing=west,half=top,open=false,powered=false,waterlogged=false]", {blockStates: {facing: "west", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeFill(startX + 5, startY + 0, startZ + 3, startX + 5, startY + 0, startZ + 7, "spruce_trapdoor[facing=east,half=top,open=false,powered=false,waterlogged=false]", {blockStates: {facing: "east", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeFill(startX + 4, startY + 0, startZ + 3, startX + 4, startY + 0, startZ + 7, "barrel[facing=east,open=false]", {blockStates: {facing: "east", open: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 1, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "west", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "west", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "west", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 3, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 5, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 7, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 7, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 8, "spruce_trapdoor", {blockStates: {facing: "west", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 8, "spruce_trapdoor", {blockStates: {facing: "west", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 9, "waxed_cut_copper_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 1, startZ + 3, "flower_pot");
  safeSetBlock(startX + 4, startY + 1, startZ + 5, "lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 1, startZ + 7, "flower_pot");
}
