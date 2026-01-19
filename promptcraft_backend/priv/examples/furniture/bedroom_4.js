// bedroom_4
// Size: 7x7x6
function buildCreation(startX, startY, startZ) {
  safeFill(startX + 1, startY + 0, startZ + 1, startX + 5, startY + 0, startZ + 1, "orange_terracotta");
  safeFill(startX + 1, startY + 0, startZ + 2, startX + 1, startY + 0, startZ + 5, "orange_terracotta");
  safeFill(startX + 2, startY + 0, startZ + 5, startX + 5, startY + 0, startZ + 5, "orange_terracotta");
  safeFill(startX + 1, startY + 1, startZ + 1, startX + 5, startY + 1, startZ + 1, "orange_terracotta");
  safeFill(startX + 1, startY + 1, startZ + 5, startX + 5, startY + 1, startZ + 5, "orange_terracotta");
  safeFill(startX + 1, startY + 2, startZ + 1, startX + 5, startY + 2, startZ + 1, "orange_terracotta");
  safeFill(startX + 1, startY + 2, startZ + 5, startX + 5, startY + 2, startZ + 5, "orange_terracotta");
  safeFill(startX + 1, startY + 3, startZ + 1, startX + 5, startY + 3, startZ + 1, "orange_terracotta");
  safeFill(startX + 1, startY + 3, startZ + 2, startX + 1, startY + 3, startZ + 5, "orange_terracotta");
  safeFill(startX + 2, startY + 3, startZ + 5, startX + 5, startY + 3, startZ + 5, "orange_terracotta");
  safeSetBlock(startX + 2, startY + 0, startZ + 2, "bookshelf");
  safeSetBlock(startX + 3, startY + 0, startZ + 2, "green_bed", {blockStates: {facing: "west", occupied: "false", part: "head"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 2, "green_bed", {blockStates: {facing: "west", occupied: "false", part: "foot"}});
  safeSetBlock(startX + 5, startY + 0, startZ + 2, "green_carpet");
  safeSetBlock(startX + 2, startY + 0, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "east", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 3, "green_carpet");
  safeSetBlock(startX + 4, startY + 0, startZ + 3, "green_carpet");
  safeSetBlock(startX + 5, startY + 0, startZ + 3, "green_carpet");
  safeSetBlock(startX + 2, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "east", half: "top", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 3, startY + 0, startZ + 4, "smooth_quartz_slab", {blockStates: {type: "bottom", waterlogged: "false"}});
  safeSetBlock(startX + 4, startY + 0, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "true", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "orange_terracotta");
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 2, "orange_terracotta");
  safeSetBlock(startX + 2, startY + 2, startZ + 2, "barrel", {blockStates: {facing: "east", open: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 3, "glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 1, startY + 2, startZ + 4, "glass_pane", {blockStates: {east: "false", north: "true", south: "true", waterlogged: "false", west: "false"}});
  safeSetBlock(startX + 2, startY + 2, startZ + 4, "lantern", {blockStates: {hanging: "true", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 2, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 3, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
  safeSetBlock(startX + 2, startY + 3, startZ + 4, "spruce_trapdoor", {blockStates: {facing: "east", half: "bottom", open: "false", powered: "false", waterlogged: "false"}});
}
