import { useState } from "react";
import { ramenRecipe } from "./data/recipes";
import { CookingSteps } from "./components/CookingSteps";

function App() {
  const [showIngredients, setShowIngredients] = useState(false);
  const [isCooking, setIsCooking] = useState(false);

  if (isCooking) {
    return (
      <main className="home">
        <header className="home-header">
          <p className="home-brand">KomeKokeshi</p>
          <h1>{ramenRecipe.title}</h1>

          <button
            className="recipe-toggle"
            type="button"
            onClick={() => setIsCooking(false)}
          >
            Quitter la préparation
          </button>
        </header>

        <CookingSteps steps={ramenRecipe.steps} />
      </main>
    );
  }

  return (
    <main className="home">
      <header className="home-header">
        <p className="home-brand">KomeKokeshi</p>
        <h1>Cuisine le monde avec ta Kokeshi</h1>
        <p>
          Des recettes guidées pas à pas, avec une petite complice en cuisine.
        </p>
      </header>

      <section aria-labelledby="recipes-title">
        <h2 id="recipes-title">Ta première escale : le Japon</h2>

        <article className="recipe-card">
          <p className="recipe-country">{ramenRecipe.country}</p>
          <h3>{ramenRecipe.title}</h3>
          <p>{ramenRecipe.description}</p>

          <button
            className="recipe-toggle"
            type="button"
            aria-expanded={showIngredients}
            aria-controls="recipe-ingredients"
            onClick={() => setShowIngredients((isVisible) => !isVisible)}
          >
            {showIngredients
              ? "Masquer les ingrédients"
              : "Voir les ingrédients"}
          </button>

          <div id="recipe-ingredients" hidden={!showIngredients}>
            <h4>Ingrédients pour {ramenRecipe.servings} personnes</h4>
            <ul>
              {ramenRecipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.quantity} — {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <button
            className="recipe-toggle"
            type="button"
            onClick={() => setIsCooking(true)}
          >
            Commencer la recette
          </button>
        </article>
      </section>
    </main>
  );
}

export default App;
