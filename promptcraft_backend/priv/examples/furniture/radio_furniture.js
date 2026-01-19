// radio_furniture
// Size: 5x4x4
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 0, "dark_oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "dark_oak_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "dark_oak_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "dark_oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "note_block", {blockStates: {instrument: "BASS", note: "0", powered: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "note_block", {blockStates: {instrument: "BASS", note: "4", powered: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 1, "lightning_rod", {blockStates: {facing: "up", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "lever", {blockStates: {face: "FLOOR", facing: "north", powered: "false"}});
}
