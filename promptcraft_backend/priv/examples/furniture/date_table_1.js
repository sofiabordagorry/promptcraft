// date_table_1
// Size: 9x5x4
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 1, "spruce_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 1, "spruce_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 1, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "lectern", {blockStates: {facing: "west", has_book: "false", powered: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 2, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 8, startY + 0, startZ + 2, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "spruce_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "spruce_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 1, startZ + 1, "end_rod", {blockStates: {facing: "up"}});
  safeSetBlock(startX + 4, startY + 1, startZ + 3, "potted_dead_bush");
  safeSetBlock(startX + 5, startY + 2, startZ + 1, "candle", {blockStates: {candles: "4", lit: "true", waterlogged: "false"}});
}
