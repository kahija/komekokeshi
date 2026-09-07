export type RecipeStep = {
  id: string;
  instruction: string;
  action: "cut" | "mix" | "pour" | "cook" | "serve";
};

export type Recipe = {
  id: string;
  title: string;
  country: string;
  description: string;
  servings: number;
  steps: RecipeStep[];
  ingredients: {
    id: string;
    name: string;
    quantity: string;
  }[];
};

export const ramenRecipe: Recipe = {
  id: "japanese-ramen",
  title: "Ramen japonais",
  country: "Japon",
  description: "Prépare un bol de ramen réconfortant, une étape à la fois.",
  servings: 2,
  steps: [
    {
      id: "prepare-spring-onions",
      instruction:
        "Lave les oignons nouveaux, puis coupe-les en fines rondelles.",
      action: "cut",
    },
    {
      id: "cook-eggs",
      instruction:
        "Plonge les œufs dans une casserole d’eau bouillante et laisse-les cuire 10 minutes. Refroidis-les sous l’eau froide, puis écale-les.",
      action: "cook",
    },
    {
      id: "heat-broth",
      instruction:
        "Verse le bouillon de légumes dans une casserole et porte-le à frémissement.",
      action: "pour",
    },
    {
      id: "season-broth",
      instruction:
        "Ajoute la sauce soja et l’huile de sésame au bouillon, puis mélange.",
      action: "mix",
    },
    {
      id: "cook-noodles",
      instruction:
        "Fais cuire les nouilles dans le bouillon selon le temps indiqué sur leur emballage.",
      action: "cook",
    },
    {
      id: "serve-ramen",
      instruction:
        "Répartis les nouilles et le bouillon dans deux bols. Ajoute les œufs coupés en deux et les oignons nouveaux.",
      action: "serve",
    },
  ],
  ingredients: [
    { id: "noodles", name: "Nouilles pour ramen", quantity: "200 g" },
    { id: "broth", name: "Bouillon de légumes", quantity: "800 ml" },
    { id: "eggs", name: "Œufs", quantity: "2" },
    { id: "spring-onions", name: "Oignons nouveaux", quantity: "2" },
    { id: "soy-sauce", name: "Sauce soja", quantity: "2 c. à soupe" },
    { id: "sesame-oil", name: "Huile de sésame", quantity: "1 c. à café" },
  ],
};
