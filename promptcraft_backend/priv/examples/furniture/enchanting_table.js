// enchanting_table
// Size: 7x9x4
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 1, startY + 2, startZ + 3, startX + 1, startY + 2, startZ + 6, "spruce_trapdoor[facing=east,half=bottom,open=false,powered=false,waterlogged=false]", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeFill(startX + 1, startY + 0, startZ + 3, startX + 1, startY + 0, startZ + 6, "bookshelf");
  safeFill(startX + 1, startY + 1, startZ + 3, startX + 1, startY + 1, startZ + 6, "bookshelf");
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "dark_oak_fence", {blockStates: {east: "false", north: "false", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "bookshelf");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "bookshelf");
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "bookshelf");
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "enchanting_table");
  safeSetBlock(startX + 2, startY + 0, startZ + 6, "bookshelf");
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "bookshelf");
  safeSetBlock(startX + 4, startY + 0, startZ + 6, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 7, "dark_oak_fence", {blockStates: {east: "false", north: "true", south: "false", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 1, "oak_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "bookshelf");
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "bookshelf");
  safeSetBlock(startX + 3, startY + 1, startZ + 2, "soul_lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 3, "purple_candle", {blockStates: {candles: "1", lit: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "purple_candle", {blockStates: {candles: "1", lit: "true", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 1, startZ + 5, "purple_candle", {blockStates: {candles: "1", lit: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 6, "bookshelf");
  safeSetBlock(startX + 3, startY + 1, startZ + 6, "soul_lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 7, "oak_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 1, "dark_oak_fence", {blockStates: {east: "false", north: "false", south: "false", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 2, startZ + 4, "purple_candle", {blockStates: {candles: "1", lit: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 5, "purple_candle", {blockStates: {candles: "1", lit: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 6, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 7, "dark_oak_fence", {blockStates: {east: "false", north: "false", south: "false", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 1, "oak_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 4, "purple_candle", {blockStates: {candles: "1", lit: "true", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 5, "purple_candle", {blockStates: {candles: "1", lit: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 7, "oak_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
}
