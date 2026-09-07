import { useState } from "react";
import { ramenRecipe } from "./data/recipes";

function App() {
  const [showIngredients, setShowIngredients] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRecipeComplete, setIsRecipeComplete] = useState(false);

  const currentStep = ramenRecipe.steps[currentStepIndex];

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
        </article>
      </section>
      <section className="cooking" aria-labelledby="cooking-title">
        <h2 id="cooking-title">Préparation</h2>

        {isRecipeComplete ? (
          <div role="status">
            <h3>Recette terminée !</h3>
            <p>Ton ramen est prêt. Bon appétit !</p>
          </div>
        ) : (
          <div aria-live="polite" aria-atomic="true">
            <p>
              Étape {currentStepIndex + 1} sur {ramenRecipe.steps.length}
            </p>
            <p>{currentStep.instruction}</p>
          </div>
        )}

        <nav className="step-navigation" aria-label="Étapes de préparation">
          {isRecipeComplete ? (
            <button
              type="button"
              onClick={() => {
                setCurrentStepIndex(0);
                setIsRecipeComplete(false);
              }}
            >
              Recommencer
            </button>
          ) : (
            <>
              <button
                type="button"
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((index) => index - 1)}
              >
                Précédent
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentStepIndex === ramenRecipe.steps.length - 1) {
                    setIsRecipeComplete(true);
                  } else {
                    setCurrentStepIndex((index) => index + 1);
                  }
                }}
              >
                {currentStepIndex === ramenRecipe.steps.length - 1
                  ? "Terminer la recette"
                  : "Suivant"}
              </button>
            </>
          )}
        </nav>
      </section>
    </main>
  );
}

export default App;
