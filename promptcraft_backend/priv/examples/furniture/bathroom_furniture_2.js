// bathroom_furniture_2
// Size: 5x6x5
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 1, startY + 0, startZ + 1, startX + 1, startY + 0, startZ + 4, "smooth_sandstone");
  safeFill(startX + 1, startY + 1, startZ + 1, startX + 1, startY + 1, startZ + 4, "smooth_sandstone");
  safeFill(startX + 1, startY + 2, startZ + 1, startX + 1, startY + 2, startZ + 4, "smooth_sandstone");
  safeFill(startX + 1, startY + 3, startZ + 1, startX + 1, startY + 3, startZ + 4, "smooth_sandstone");
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "smooth_quartz_stairs", {blockStates: {facing: "north", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "smooth_quartz_slab", {blockStates: {type: "top", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "composter", {blockStates: {level: "0"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "smooth_quartz_stairs", {blockStates: {facing: "south", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 1, "flower_pot");
  safeSetBlock(startX + 2, startY + 1, startZ + 3, "tripwire_hook", {blockStates: {attached: "false", facing: "east", powered: "false"}});
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "lantern", {blockStates: {hanging: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "white_wall_banner", {blockStates: {facing: "east"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "east", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 1, "campfire", {blockStates: {facing: "north", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 2, "campfire", {blockStates: {facing: "north", lit: "false", signal_fire: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 3, "oak_leaves", {blockStates: {distance: "1", persistent: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 4, "campfire", {blockStates: {facing: "north", lit: "false", signal_fire: "false", waterlogged: "false"}});
}
