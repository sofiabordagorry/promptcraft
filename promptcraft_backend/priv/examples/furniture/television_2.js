// television_2
// Size: 4x6x5
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 3, startZ + 1, startX + 2, startY + 3, startZ + 4, "oak_slab[type=bottom,waterlogged=false]", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 0, "oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "bookshelf");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "chiseled_bookshelf", {blockStates: {facing: "east", slot_0_occupied: "false", slot_1_occupied: "false", slot_2_occupied: "false", slot_3_occupied: "false", slot_4_occupied: "false", slot_5_occupied: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "oak_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "chiseled_bookshelf", {blockStates: {facing: "east", slot_0_occupied: "false", slot_1_occupied: "false", slot_2_occupied: "false", slot_3_occupied: "false", slot_4_occupied: "false", slot_5_occupied: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "oak_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "bookshelf");
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 0, "oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 1, "loom", {blockStates: {facing: "west"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "black_concrete");
  safeSetBlock(startX + 2, startY + 1, startZ + 3, "black_concrete");
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "loom", {blockStates: {facing: "west"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 5, "oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 0, "oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 1, "loom", {blockStates: {facing: "west"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "black_concrete");
  safeSetBlock(startX + 2, startY + 2, startZ + 3, "black_concrete");
  safeSetBlock(startX + 2, startY + 2, startZ + 4, "loom", {blockStates: {facing: "west"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 5, "oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
}
