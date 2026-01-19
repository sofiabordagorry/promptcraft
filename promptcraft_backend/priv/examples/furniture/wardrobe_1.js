// wardrobe_1
// Size: 7x7x8
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 2, startY + 0, startZ + 2, startX + 2, startY + 0, startZ + 5, "smooth_sandstone");
  safeFill(startX + 2, startY + 1, startZ + 2, startX + 2, startY + 1, startZ + 5, "smooth_sandstone");
  safeFill(startX + 2, startY + 2, startZ + 2, startX + 2, startY + 2, startZ + 5, "smooth_sandstone");
  safeFill(startX + 2, startY + 3, startZ + 2, startX + 2, startY + 3, startZ + 5, "smooth_sandstone");
  safeFill(startX + 2, startY + 4, startZ + 2, startX + 2, startY + 4, startZ + 5, "smooth_sandstone");
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "spruce_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "spruce_stairs", {blockStates: {facing: "west", half: "top", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 3, "spruce_door", {blockStates: {facing: "west", half: "lower", hinge: "right", open: "false", powered: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 4, "spruce_door", {blockStates: {facing: "west", half: "lower", hinge: "left", open: "false", powered: "false"}});
  safeSetBlock(startX + 3, startY + 1, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 3, "spruce_door", {blockStates: {facing: "west", half: "upper", hinge: "right", open: "false", powered: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 4, "spruce_door", {blockStates: {facing: "west", half: "upper", hinge: "left", open: "false", powered: "false"}});
  safeSetBlock(startX + 3, startY + 2, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 3, "spruce_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 3, startZ + 4, "spruce_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
}
