// picnic_2
// Size: 7x7x4
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "potted_white_tulip");
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "white_carpet");
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "oak_pressure_plate", {blockStates: {powered: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "sea_pickle", {blockStates: {pickles: "2", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "composter", {blockStates: {level: "0"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "cake", {blockStates: {bites: "0"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "red_carpet");
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "composter", {blockStates: {level: "0"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "sea_pickle", {blockStates: {pickles: "2", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "red_carpet");
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "white_carpet");
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "oak_pressure_plate", {blockStates: {powered: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 5, "red_carpet");
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
}
