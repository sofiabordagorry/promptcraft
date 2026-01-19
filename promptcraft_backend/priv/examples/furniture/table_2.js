// table_2
// Size: 4x5x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "spruce_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "spruce_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "spruce_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "spruce_wall_sign", {blockStates: {facing: "east", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "potted_lily_of_the_valley");
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "jungle_pressure_plate", {blockStates: {powered: "false"}});
}
