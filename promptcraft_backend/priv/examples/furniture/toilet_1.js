// toilet_1
// Size: 5x3x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "smooth_quartz_stairs", {blockStates: {facing: "east", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "lightning_rod", {blockStates: {facing: "up", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "flower_pot");
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "quartz_pillar", {blockStates: {axis: "y"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 1, "white_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "tripwire_hook", {blockStates: {attached: "false", facing: "south", powered: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 1, "heavy_weighted_pressure_plate", {blockStates: {power: "0"}});
}
