// toilet_2
// Size: 4x4x4
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "andesite_stairs", {blockStates: {facing: "east", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "andesite_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "lightning_rod", {blockStates: {facing: "up", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "flower_pot");
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "andesite");
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "light_gray_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "tripwire_hook", {blockStates: {attached: "false", facing: "south", powered: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "stone_pressure_plate", {blockStates: {powered: "false"}});
}
