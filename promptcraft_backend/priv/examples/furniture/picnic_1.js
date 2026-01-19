// picnic_1
// Size: 6x6x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "iron_bars", {blockStates: {east: "false", north: "false", south: "false", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "white_carpet");
  safeSetBlock(startX + 3, startY + 0, startZ + 1, "red_carpet");
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "white_carpet");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "red_carpet");
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "chest", {blockStates: {facing: "east", type: "SINGLE", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "sea_pickle", {blockStates: {pickles: "2", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "cake", {blockStates: {bites: "0"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "red_carpet");
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "white_carpet");
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "candle", {blockStates: {candles: "3", lit: "false", waterlogged: "false"}});
}
