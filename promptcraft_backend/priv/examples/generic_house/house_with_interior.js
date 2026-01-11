// House with bed, chests and furnaces
function buildCreation(startX, startY, startZ) {
  // Foundation
  safeFill(startX, startY, startZ, startX + 6, startY, startZ + 6, "cobblestone");

  // Corner posts (oak logs)
  safeFill(startX, startY + 1, startZ, startX, startY + 3, startZ, "oak_log", { blockStates: { axis: "y" } });
  safeFill(startX + 6, startY + 1, startZ, startX + 6, startY + 3, startZ, "oak_log", { blockStates: { axis: "y" } });
  safeFill(startX, startY + 1, startZ + 6, startX, startY + 3, startZ + 6, "oak_log", { blockStates: { axis: "y" } });
  safeFill(startX + 6, startY + 1, startZ + 6, startX + 6, startY + 3, startZ + 6, "oak_log", { blockStates: { axis: "y" } });

  // Walls (oak planks)
  safeFill(startX + 1, startY + 1, startZ, startX + 5, startY + 1, startZ, "oak_planks");
  safeFill(startX + 1, startY + 2, startZ, startX + 5, startY + 2, startZ, "oak_planks");
  safeFill(startX + 1, startY + 3, startZ, startX + 5, startY + 3, startZ, "oak_planks");
  
  safeFill(startX + 1, startY + 1, startZ + 6, startX + 5, startY + 1, startZ + 6, "oak_planks");
  safeFill(startX + 1, startY + 2, startZ + 6, startX + 5, startY + 2, startZ + 6, "oak_planks");
  safeFill(startX + 1, startY + 3, startZ + 6, startX + 5, startY + 3, startZ + 6, "oak_planks");
  
  safeFill(startX, startY + 1, startZ + 1, startX, startY + 1, startZ + 5, "oak_planks");
  safeFill(startX, startY + 2, startZ + 1, startX, startY + 2, startZ + 5, "oak_planks");
  safeFill(startX, startY + 3, startZ + 1, startX, startY + 3, startZ + 5, "oak_planks");
  
  safeFill(startX + 6, startY + 1, startZ + 1, startX + 6, startY + 1, startZ + 5, "oak_planks");
  safeFill(startX + 6, startY + 2, startZ + 1, startX + 6, startY + 2, startZ + 5, "oak_planks");
  safeFill(startX + 6, startY + 3, startZ + 1, startX + 6, startY + 3, startZ + 5, "oak_planks");

  // Door (front wall, centered)
  safeSetBlock(startX + 3, startY + 1, startZ, "oak_door", { blockStates: { facing: "south", half: "lower" } });
  safeSetBlock(startX + 3, startY + 2, startZ, "oak_door", { blockStates: { facing: "south", half: "upper" } });

  // Windows
  safeSetBlock(startX + 2, startY + 2, startZ, "glass");
  safeSetBlock(startX + 4, startY + 2, startZ, "glass");
  safeSetBlock(startX + 2, startY + 2, startZ + 6, "glass");
  safeSetBlock(startX + 4, startY + 2, startZ + 6, "glass");
  safeSetBlock(startX, startY + 2, startZ + 2, "glass");
  safeSetBlock(startX, startY + 2, startZ + 4, "glass");
  safeSetBlock(startX + 6, startY + 2, startZ + 2, "glass");
  safeSetBlock(startX + 6, startY + 2, startZ + 4, "glass");

  // Roof - South side (stairs facing north - towards center)
  safeFill(startX, startY + 4, startZ, startX + 6, startY + 4, startZ, "oak_stairs", { blockStates: { facing: "north", half: "bottom" } });
  
  // Roof - North side (stairs facing south - towards center)
  safeFill(startX, startY + 4, startZ + 6, startX + 6, startY + 4, startZ + 6, "oak_stairs", { blockStates: { facing: "south", half: "bottom" } });
  
  // Roof - West side (stairs facing east - towards center)
  safeFill(startX, startY + 4, startZ + 1, startX, startY + 4, startZ + 5, "oak_stairs", { blockStates: { facing: "east", half: "bottom" } });
  
  // Roof - East side (stairs facing west - towards center)
  safeFill(startX + 6, startY + 4, startZ + 1, startX + 6, startY + 4, startZ + 5, "oak_stairs", { blockStates: { facing: "west", half: "bottom" } });
  
  // Roof center
  safeFill(startX + 2, startY + 4, startZ + 2, startX + 4, startY + 4, startZ + 4, "oak_planks");
  
  // Roof second layer
  safeFill(startX + 2, startY + 5, startZ + 2, startX + 4, startY + 5, startZ + 2, "oak_stairs", { blockStates: { facing: "north", half: "bottom" } });
  safeFill(startX + 2, startY + 5, startZ + 4, startX + 4, startY + 5, startZ + 4, "oak_stairs", { blockStates: { facing: "south", half: "bottom" } });
  
  // Roof peak
  safeFill(startX + 3, startY + 6, startZ + 2, startX + 3, startY + 6, startZ + 4, "oak_planks");

  // Interior - Bed (along back wall)
  safeSetBlock(startX + 2, startY + 1, startZ + 5, "red_bed", { blockStates: { facing: "south", part: "foot" } });
  safeSetBlock(startX + 2, startY + 1, startZ + 4, "red_bed", { blockStates: { facing: "south", part: "head" } });

  // Interior - Chests (right side)
  safeSetBlock(startX + 5, startY + 1, startZ + 2, "chest", { blockStates: { facing: "west" } });
  safeSetBlock(startX + 5, startY + 1, startZ + 3, "chest", { blockStates: { facing: "west" } });

  // Interior - Furnaces (left side, forming kitchen area)
  safeSetBlock(startX + 1, startY + 1, startZ + 2, "furnace", { blockStates: { facing: "east" } });
  safeSetBlock(startX + 1, startY + 1, startZ + 3, "furnace", { blockStates: { facing: "east" } });
  
  // Interior - Crafting table
  safeSetBlock(startX + 1, startY + 1, startZ + 4, "crafting_table");
}
