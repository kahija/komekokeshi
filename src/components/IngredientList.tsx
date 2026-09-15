import type { RecipeIngredient } from "../data/recipes";

type IngredientListProps = {
  ingredients: RecipeIngredient[];
};

export function IngredientList({ ingredients }: IngredientListProps) {
  const groups = [...new Set(ingredients.map((ingredient) => ingredient.group))];

  return (
    <div className="ingredient-groups">
      {groups.map((group) => (
        <section className="ingredient-group" key={group}>
          <h5>{group}</h5>
          <ul>
            {ingredients
              .filter((ingredient) => ingredient.group === group)
              .map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.quantity} — {ingredient.name}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
