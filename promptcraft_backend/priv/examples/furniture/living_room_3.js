// living_room_3
// Size: 10x11x3
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 4, startY + 0, startZ + 7, startX + 7, startY + 0, startZ + 7, "oak_trapdoor[facing=south,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeFill(startX + 4, startY + 0, startZ + 1, startX + 7, startY + 0, startZ + 1, "spruce_trapdoor[facing=north,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeFill(startX + 4, startY + 0, startZ + 9, startX + 7, startY + 0, startZ + 9, "spruce_trapdoor[facing=south,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeFill(startX + 4, startY + 0, startZ + 4, startX + 7, startY + 0, startZ + 4, "light_gray_stained_glass");
  safeFill(startX + 4, startY + 0, startZ + 5, startX + 7, startY + 0, startZ + 5, "light_gray_stained_glass");
  safeFill(startX + 4, startY + 0, startZ + 6, startX + 7, startY + 0, startZ + 6, "light_gray_stained_glass");
  safeFill(startX + 4, startY + 0, startZ + 3, startX + 7, startY + 0, startZ + 3, "oak_trapdoor[facing=north,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 0, "mangrove_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 0, "mangrove_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "west", half: "bottom", shape: "inner_right", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "north", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 2, "spruce_stairs", {blockStates: {facing: "east", half: "bottom", shape: "inner_left", waterlogged: "false"}});
  safeSetBlock(startX + 8, startY + 0, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "spruce_stairs", {blockStates: {facing: "north", half: "bottom", shape: "inner_left", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 8, startY + 0, startZ + 4, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 5, "spruce_stairs", {blockStates: {facing: "west", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 8, startY + 0, startZ + 5, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 0, startZ + 6, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 6, "spruce_stairs", {blockStates: {facing: "south", half: "bottom", shape: "inner_right", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 8, startY + 0, startZ + 6, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 7, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 8, "spruce_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 8, "spruce_stairs", {blockStates: {facing: "west", half: "bottom", shape: "inner_left", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 8, "spruce_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 8, "spruce_stairs", {blockStates: {facing: "south", half: "bottom", shape: "straight", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 8, "spruce_stairs", {blockStates: {facing: "east", half: "bottom", shape: "inner_right", waterlogged: "false"}});
  safeSetBlock(startX + 8, startY + 0, startZ + 8, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 1, startZ + 4, "potted_flowering_azalea_bush");
  safeSetBlock(startX + 5, startY + 1, startZ + 6, "potted_flowering_azalea_bush");
}
