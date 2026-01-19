// television
// Size: 4x7x4
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 0, startZ + 2, startX + 2, startY + 0, startZ + 5, "chiseled_bookshelf[facing=east,slot_0_occupied=false,slot_1_occupied=false,slot_2_occupied=false,slot_3_occupied=false,slot_4_occupied=false,slot_5_occupied=false]", {blockStates: {facing: "east", slot_0_occupied: "false", slot_1_occupied: "false", slot_2_occupied: "false", slot_3_occupied: "false", slot_4_occupied: "false", slot_5_occupied: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 0, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "dark_oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 6, "dark_oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 3, "black_concrete_powder");
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "black_concrete_powder");
  safeSetBlock(startX + 2, startY + 1, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "south", half: "top", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 3, "lever", {blockStates: {face: "FLOOR", facing: "south", powered: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 4, "lever", {blockStates: {face: "FLOOR", facing: "north", powered: "false"}});
}
