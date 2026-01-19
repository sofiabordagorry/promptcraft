// table_with_lamp
// Size: 5x5x4
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "spruce_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "north", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "spruce_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "lightning_rod", {blockStates: {facing: "down", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 1, "acacia_wall_sign", {blockStates: {facing: "north", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "acacia_wall_sign", {blockStates: {facing: "west", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "jack_o_lantern", {blockStates: {facing: "west"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 2, "acacia_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 3, "acacia_wall_sign", {blockStates: {facing: "south", waterlogged: "false"}});
}
