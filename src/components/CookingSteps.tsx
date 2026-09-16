import { useEffect, useRef, useState } from "react";
import type { RecipeIngredient, RecipeStep } from "../data/recipes";
import kokeshiCook from "../assets/kokeshi-cook.webp";
import kokeshiMix from "../assets/kokeshi-mix.webp";
import kokeshiCut from "../assets/kokeshi-cut.webp";
import { readProgress } from "../data/cookingProgress";
import { Timer } from "./Timer";
import kokeshiKitchen from "../assets/kokeshi-kitchen.webp";
import kokeshiComplete from "../assets/kokeshi-complete-w.webp";
import "./CookingSteps.css";

type CookingStepsProps = {
  recipeId: string;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
  onReturnToRecipe: () => void;
};

export function CookingSteps({ recipeId, steps, ingredients, onReturnToRecipe }: CookingStepsProps) {
  const instructionRef = useRef<HTMLDivElement>(null);
  const shouldFocusStep = useRef(false);
  const storageKey = `komekokeshi:progress:${recipeId}`;

  const [savedProgress] = useState(() =>
    readProgress(storageKey, steps.length),
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(
    savedProgress.stepIndex,
  );
  const [isRecipeComplete, setIsRecipeComplete] = useState(
    savedProgress.isComplete,
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          stepIndex: currentStepIndex,
          isComplete: isRecipeComplete,
        }),
      );
    } catch {
      // Cooking remains available when browser storage is unavailable.
    }
  }, [storageKey, currentStepIndex, isRecipeComplete]);

  useEffect(() => {
    if (!shouldFocusStep.current) return;
    shouldFocusStep.current = false;
    instructionRef.current?.focus({ preventScroll: true });
    instructionRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [currentStepIndex, isRecipeComplete]);

  const currentStep = steps[currentStepIndex];
  const scene = isRecipeComplete || currentStep.action === "serve"
    ? { src: kokeshiComplete, alt: "La Kokeshi présente le ramen au poulet terminé." }
    : currentStep.id === "prepare-toppings"
      ? { src: kokeshiCut, alt: "La Kokeshi découpe les oignons nouveaux." }
      : currentStep.action === "mix"
        ? { src: kokeshiMix, alt: "La Kokeshi mélange une sauce dans un petit bol." }
        : currentStep.action === "cook"
          ? { src: kokeshiCook, alt: "La Kokeshi remue une marmite sur la plaque allumée." }
          : { src: kokeshiKitchen, alt: "La Kokeshi t’accompagne dans sa cuisine japonaise." };
  const stepIngredients = ingredients.filter((ingredient) =>
    currentStep.ingredientIds?.includes(ingredient.id),
  );
  const isLastStep = currentStepIndex === steps.length - 1;
  const visibleStepIndices = steps.flatMap((_, index) =>
    index === 0 || index === steps.length - 1 || Math.abs(index - currentStepIndex) <= 1
      ? [index]
      : [],
  );

  function handlePreviousStep() {
    shouldFocusStep.current = true;
    setCurrentStepIndex((index) => Math.max(0, index - 1));
  }

  function handleNextStep() {
    shouldFocusStep.current = true;
    if (isLastStep) {
      setIsRecipeComplete(true);
    } else {
      setCurrentStepIndex((index) => index + 1);
    }
  }

  function handleRestart() {
    shouldFocusStep.current = true;
    try {
      for (const step of steps) {
        localStorage.removeItem(`komekokeshi:timer:${recipeId}:${step.id}`);
      }
    } catch {
      // Restart remains available when browser storage is unavailable.
    }

    setCurrentStepIndex(0);
    setIsRecipeComplete(false);
  }

  return (
    <section className={`cooking${isRecipeComplete ? " cooking-finished" : ""}`} aria-labelledby="cooking-title">
      <div className="cooking-section-heading">
        <h2 id="cooking-title">{isRecipeComplete ? "À table !" : "En cuisine"}</h2>
        <p>{isRecipeComplete ? "Toutes les étapes sont terminées" : "Un geste après l’autre"}</p>
      </div>

      <progress
        className="cooking-progress"
        aria-label="Étapes terminées"
        max={steps.length}
        value={isRecipeComplete ? steps.length : currentStepIndex}
      />

      <div className="cooking-main" ref={instructionRef} tabIndex={-1}>
        {isRecipeComplete ? (
          <div className="cooking-complete" role="status">
            <h3>Recette terminée !</h3>
            <p>Ton plat est prêt. Bon appétit !</p>
          </div>
        ) : (
          <div
            className="cooking-instruction"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="cooking-step-number">
              <span>Étape</span>
              <strong>{currentStepIndex + 1}</strong>
              <span>sur {steps.length}</span>
            </p>
            <p className="cooking-instruction-text">{currentStep.instruction}</p>
          </div>
        )}

        <div className="cooking-scene-wrapper">
          <img
            className="cooking-scene"
            src={scene.src}
            alt={scene.alt}
            width={1448}
            height={1086}
          />
          {isRecipeComplete && (
            <span className="cooking-sparkle" aria-hidden="true">
              ✦
            </span>
          )}
        </div>

      </div>

      {!isRecipeComplete && (stepIngredients.length > 0 || currentStep.durationSeconds !== undefined || currentStep.tip || currentStep.details) && (
        <div className="cooking-support">
          {stepIngredients.length > 0 && (
            <aside className="step-ingredients">
              <h3>Pour cette étape</h3>
              <ul>
                {stepIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    <span>{ingredient.name}</span>
                    <strong>{ingredient.quantity}</strong>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          {currentStep.durationSeconds !== undefined && (
            <Timer
              key={`${recipeId}:${currentStep.id}`}
              storageKey={`komekokeshi:timer:${recipeId}:${currentStep.id}`}
              durationSeconds={currentStep.durationSeconds}
            />
          )}
          {currentStep.tip && (
            <aside className="kokeshi-tip">
              <h3>Astuce Kokeshi</h3>
              <p>{currentStep.tip}</p>
            </aside>
          )}
          {currentStep.details && (
            <aside className="cooking-step-details" key={currentStep.id}>
              <h3>Précisions de l’étape</h3>
              <p>{currentStep.details}</p>
            </aside>
          )}
        </div>
      )}

      {!isRecipeComplete && (
        <ol className="cooking-step-track" aria-label="Progression de la recette">
          {visibleStepIndices.map((index, position) => (
            <li key={steps[index].id} className={index < currentStepIndex ? "is-done" : ""}
              aria-current={index === currentStepIndex ? "step" : undefined}>
              {position > 0 && index - visibleStepIndices[position - 1] > 1 && (
                <span className="step-track-gap" aria-hidden="true">…</span>
              )}
              <span className="step-track-dot" aria-hidden="true">
                {index < currentStepIndex ? "✓" : index + 1}
              </span>
              <span className="step-track-label">
                Étape {index + 1}{index < currentStepIndex ? ", terminée" : index === currentStepIndex ? ", en cours" : ""}
              </span>
            </li>
          ))}
        </ol>
      )}

      <nav className="step-navigation" aria-label="Étapes de préparation">
        {isRecipeComplete ? (
          <>
            <button type="button" onClick={onReturnToRecipe}>Voir ma recette</button>
            <button className="step-primary" type="button" onClick={handleRestart}>
              Recommencer
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={currentStepIndex === 0}
              onClick={handlePreviousStep}
            >
              Précédent
            </button>

            <button
              className="step-primary"
              type="button"
              onClick={handleNextStep}
            >
              {isLastStep ? "Terminer la recette" : "Étape suivante"}
            </button>
          </>
        )}
      </nav>
    </section>
  );
}
