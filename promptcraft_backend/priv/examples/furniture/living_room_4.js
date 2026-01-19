// living_room_4
// Size: 11x9x3
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 0, startZ + 3, startX + 2, startY + 0, startZ + 7, "smooth_quartz");
  safeSetBlock(startX + 6, startY + 0, startZ + 1, "smooth_quartz");
  safeSetBlock(startX + 7, startY + 0, startZ + 1, "smooth_quartz");
  safeSetBlock(startX + 6, startY + 0, startZ + 2, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 2, "smooth_quartz_stairs", {blockStates: {facing: "east", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "smooth_quartz_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "smooth_quartz_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "smooth_quartz_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 4, "deepslate_tile_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 4, "deepslate_tile_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "smooth_quartz_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 5, "deepslate_tile_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 5, "deepslate_tile_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "smooth_quartz_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 6, "deepslate_tile_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 6, "deepslate_tile_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 7, "smooth_quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 1, startZ + 6, "potted_lily_of_the_valley");
}
