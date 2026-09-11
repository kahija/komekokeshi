import { useState } from "react";
import { ramenRecipe } from "./data/recipes";
import { CookingSteps } from "./components/CookingSteps";
import { Brand } from "./components/Brand";
import kokeshiKitchen from "./assets/kokeshi-kitchen.png";
import "./App.css";

const ingredientGroups = [
  ...new Set(ramenRecipe.ingredients.map((ingredient) => ingredient.group)),
];

function App() {
  const [showIngredients, setShowIngredients] = useState(false);
  const [isCooking, setIsCooking] = useState(false);

  if (isCooking) {
    return (
      <main className="home cooking-page">
        <header className="cooking-header">
          <button
            className="cooking-back"
            type="button"
            onClick={() => setIsCooking(false)}
            aria-label="Quitter la préparation et revenir à l’accueil"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="cooking-heading">
            <Brand />
            <h1>{ramenRecipe.title}</h1>
            <p className="cooking-details">
              {ramenRecipe.country} · {ramenRecipe.servings} personnes
            </p>
          </div>
        </header>

        <CookingSteps steps={ramenRecipe.steps} />
      </main>
    );
  }

  return (
    <main className="home">
      <header className="home-header">
        <Brand />
        <h1>Cuisine le monde avec ta Kokeshi</h1>
        <p>
          Des recettes guidées pas à pas, avec une petite complice en cuisine.
        </p>
      </header>

      <section aria-labelledby="recipes-title">
        <h2 id="recipes-title">Ta première escale : le Japon</h2>

        <article className="recipe-card">
          <img
            className="recipe-image"
            src={kokeshiKitchen}
            alt="La Kokeshi t’accueille dans sa cuisine japonaise."
            width={1448}
            height={1086}
          />

          <div className="recipe-content">
            <p className="recipe-country">
              {ramenRecipe.country} · {ramenRecipe.servings} personnes
            </p>

            <h3>{ramenRecipe.title}</h3>

            <p className="recipe-description">
              Un bouillon maison, du poulet braisé et des œufs mollets marinés.
              Une adaptation du shōyu ramen, sans porc ni ingrédients
              alcoolisés.
            </p>

            <aside className="recipe-planning" aria-label="Temps à prévoir">
              <p>À commencer la veille</p>

              <dl>
                <div>
                  <dt>Bouillon</dt>
                  <dd>3 à 4 h de cuisson</dd>
                </div>
                <div>
                  <dt>Œufs marinés</dt>
                  <dd>8 à 12 h au réfrigérateur</dd>
                </div>
              </dl>

              <p>Choisis une sauce soja et des nouilles sans alcool.</p>
            </aside>

            <div className="recipe-actions">
              <button
                className="recipe-toggle"
                type="button"
                onClick={() => setIsCooking(true)}
              >
                Commencer la recette
              </button>

              <button
                className="recipe-toggle recipe-secondary"
                type="button"
                aria-expanded={showIngredients}
                aria-controls="recipe-ingredients"
                onClick={() => setShowIngredients((isVisible) => !isVisible)}
              >
                {showIngredients
                  ? "Masquer les ingrédients"
                  : "Voir les ingrédients"}
              </button>
            </div>
          </div>

          <div
            className="recipe-ingredients"
            id="recipe-ingredients"
            hidden={!showIngredients}
          >
            <h4>Ingrédients pour {ramenRecipe.servings} personnes</h4>

            <div className="ingredient-groups">
              {ingredientGroups.map((group) => (
                <section className="ingredient-group" key={group}>
                  <h5>{group}</h5>

                  <ul>
                    {ramenRecipe.ingredients
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
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
