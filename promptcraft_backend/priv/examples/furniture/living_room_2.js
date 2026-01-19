// living_room_2
// Size: 12x9x6
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 3, startY + 1, startZ + 7, startX + 9, startY + 1, startZ + 7, "spruce_trapdoor[facing=north,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeFill(startX + 3, startY + 0, startZ + 1, startX + 9, startY + 0, startZ + 1, "cyan_wool");
  safeFill(startX + 3, startY + 0, startZ + 7, startX + 9, startY + 0, startZ + 7, "cyan_wool");
  safeFill(startX + 3, startY + 1, startZ + 1, startX + 9, startY + 1, startZ + 1, "spruce_trapdoor[facing=south,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeFill(startX + 4, startY + 0, startZ + 2, startX + 8, startY + 0, startZ + 2, "warped_slab[type=bottom,waterlogged=false]", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeFill(startX + 4, startY + 0, startZ + 6, startX + 8, startY + 0, startZ + 6, "warped_slab[type=bottom,waterlogged=false]", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeFill(startX + 3, startY + 0, startZ + 8, startX + 9, startY + 0, startZ + 8, "oak_trapdoor[facing=south,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeFill(startX + 3, startY + 0, startZ + 0, startX + 9, startY + 0, startZ + 0, "oak_trapdoor[facing=north,half=bottom,open=true,powered=false,waterlogged=false]", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 1, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 10, startY + 0, startZ + 1, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "cyan_wool");
  safeSetBlock(startX + 9, startY + 0, startZ + 2, "cyan_wool");
  safeSetBlock(startX + 10, startY + 0, startZ + 2, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 3, "oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 3, "oak_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 9, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 4, "black_stained_glass");
  safeSetBlock(startX + 6, startY + 0, startZ + 4, "black_stained_glass");
  safeSetBlock(startX + 7, startY + 0, startZ + 4, "black_stained_glass");
  safeSetBlock(startX + 8, startY + 0, startZ + 4, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 5, "oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 0, startZ + 5, "oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 7, startY + 0, startZ + 5, "oak_trapdoor", {blockStates: {facing: "south", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 9, startY + 0, startZ + 5, "spruce_trapdoor", {blockStates: {facing: "north", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 6, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 6, "cyan_wool");
  safeSetBlock(startX + 9, startY + 0, startZ + 6, "cyan_wool");
  safeSetBlock(startX + 10, startY + 0, startZ + 6, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 0, startZ + 7, "oak_trapdoor", {blockStates: {facing: "west", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 10, startY + 0, startZ + 7, "oak_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 6, startY + 1, startZ + 4, "potted_blue_orchid");
}
