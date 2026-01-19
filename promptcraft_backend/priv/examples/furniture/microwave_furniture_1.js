// microwave_furniture_1
// Size: 4x6x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "beehive", {blockStates: {facing: "east", honey_level: "0"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "smooth_quartz");
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "birch_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 3, "black_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "iron_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 3, "iron_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
}
