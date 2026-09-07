export type Recipe = {
  id: string;
  title: string;
  country: string;
  description: string;
  servings: number;
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
  ingredients: [
    { id: "noodles", name: "Nouilles pour ramen", quantity: "200 g" },
    { id: "broth", name: "Bouillon de légumes", quantity: "800 ml" },
    { id: "eggs", name: "Œufs", quantity: "2" },
    { id: "spring-onions", name: "Oignons nouveaux", quantity: "2" },
    { id: "soy-sauce", name: "Sauce soja", quantity: "2 c. à soupe" },
    { id: "sesame-oil", name: "Huile de sésame", quantity: "1 c. à café" },
  ],
};
