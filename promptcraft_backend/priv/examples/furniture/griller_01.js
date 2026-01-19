// griller_01
// Size: 4x6x3
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "bricks");
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "bricks");
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "bricks");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "smoker", {blockStates: {facing: "east", lit: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "bricks");
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "smoker", {blockStates: {facing: "east", lit: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "bricks");
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "bricks");
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "brick_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "brick_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "brick_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "brick_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "campfire", {blockStates: {facing: "west", lit: "false", signal_fire: "false", waterlogged: "false"}});
}
