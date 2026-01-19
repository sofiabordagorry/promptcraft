// library_5
// Size: 9x7x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "spruce_planks");
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "bookshelf");
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "spruce_planks");
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "bookshelf");
  safeSetBlock(startX + 6, startY + 0, startZ + 3, "spruce_planks");
  safeSetBlock(startX + 7, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "spruce_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 4, "spruce_stairs", {blockStates: {facing: "east", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 4, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 5, "spruce_wall_sign", {blockStates: {facing: "south", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 3, "spruce_planks");
  safeSetBlock(startX + 3, startY + 1, startZ + 3, "bookshelf");
  safeSetBlock(startX + 4, startY + 1, startZ + 3, "bookshelf");
  safeSetBlock(startX + 5, startY + 1, startZ + 3, "bookshelf");
  safeSetBlock(startX + 6, startY + 1, startZ + 3, "spruce_planks");
  safeSetBlock(startX + 7, startY + 1, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 4, "spruce_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 1, startZ + 4, "spruce_stairs", {blockStates: {facing: "east", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 1, startZ + 4, "barrel", {blockStates: {facing: "up", open: "false"}});
  safeSetBlock(startX + 7, startY + 1, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 3, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 2, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 4, "lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 4, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 2, startZ + 4, "flower_pot");
  safeSetBlock(startX + 6, startY + 2, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
}
