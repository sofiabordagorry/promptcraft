// jacuzzi_1
// Size: 7x5x5
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 1, startY + 0, startZ + 1, "smooth_quartz");
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "prismarine_bricks");
  safeSetBlock(startX + 3, startY + 0, startZ + 1, "prismarine_brick_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 1, "prismarine_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 1, "quartz_stairs", {blockStates: {facing: "east", half: "bottom", shape: "inner_left", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 2, "smooth_quartz");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "prismarine_brick_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "prismarine_brick_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "prismarine_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "quartz_stairs", {blockStates: {facing: "east", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 3, "chiseled_quartz_block");
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "prismarine_bricks");
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "prismarine_brick_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "prismarine_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "quartz_stairs", {blockStates: {facing: "south", half: "bottom", shape: "inner_left", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 1, "smooth_quartz");
  safeSetBlock(startX + 2, startY + 1, startZ + 1, "lever", {blockStates: {face: "WALL", facing: "east", powered: "true"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "smooth_quartz");
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "chiseled_quartz_block");
  safeSetBlock(startX + 1, startY + 2, startZ + 1, "smooth_quartz");
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "smooth_quartz");
  safeSetBlock(startX + 1, startY + 2, startZ + 3, "chiseled_quartz_block");
  safeSetBlock(startX + 1, startY + 3, startZ + 1, "smooth_quartz");
  safeSetBlock(startX + 1, startY + 3, startZ + 2, "smooth_quartz");
  safeSetBlock(startX + 2, startY + 3, startZ + 2, "tripwire_hook", {blockStates: {attached: "false", facing: "east", powered: "false"}});
  safeSetBlock(startX + 1, startY + 3, startZ + 3, "chiseled_quartz_block");
}
