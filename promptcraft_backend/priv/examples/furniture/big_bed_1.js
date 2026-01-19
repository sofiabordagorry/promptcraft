// big_bed_1
// Size: 8x7x5
function buildCreation(startX, startY, startZ) {
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "east", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "yellow_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "yellow_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "quartz_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "yellow_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "yellow_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 4, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "spruce_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 5, "spruce_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 5, "spruce_stairs", {blockStates: {facing: "east", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 2, "lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 1, startZ + 2, "flower_pot");
  safeSetBlock(startX + 5, startY + 1, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 1, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 5, "lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 1, startZ + 5, "flower_pot");
}
