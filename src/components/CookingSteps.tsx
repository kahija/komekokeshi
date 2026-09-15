import { useEffect, useState } from "react";
import type { RecipeIngredient, RecipeStep } from "../data/recipes";
import { IngredientList } from "./IngredientList";
import kokeshiCut from "../assets/kokeshi-cut.webp";
import { Timer } from "./Timer";
import kokeshiKitchen from "../assets/kokeshi-kitchen.webp";
import kokeshiComplete from "../assets/kokeshi-complete-w.webp";
import "./CookingSteps.css";

type CookingStepsProps = {
  recipeId: string;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
};

type CookingProgress = {
  stepIndex: number;
  isComplete: boolean;
};

function readProgress(storageKey: string, stepCount: number): CookingProgress {
  const initialProgress = {
    stepIndex: 0,
    isComplete: false,
  };

  try {
    const storedValue = localStorage.getItem(storageKey);

    if (!storedValue) return initialProgress;

    const saved = JSON.parse(storedValue);

    if (
      saved === null ||
      typeof saved !== "object" ||
      !Number.isInteger(saved.stepIndex) ||
      saved.stepIndex < 0 ||
      saved.stepIndex >= stepCount ||
      typeof saved.isComplete !== "boolean" ||
      (saved.isComplete && saved.stepIndex !== stepCount - 1)
    ) {
      return initialProgress;
    }

    return {
      stepIndex: saved.stepIndex,
      isComplete: saved.isComplete,
    };
  } catch {
    return initialProgress;
  }
}

export function CookingSteps({ recipeId, steps, ingredients }: CookingStepsProps) {
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

  const currentStep = steps[currentStepIndex];
  const isCuttingOnions = currentStep.id === "prepare-toppings";
  const scene = isRecipeComplete ? kokeshiComplete : isCuttingOnions ? kokeshiCut : kokeshiKitchen;
  const isLastStep = currentStepIndex === steps.length - 1;

  function handleNextStep() {
    if (isLastStep) {
      setIsRecipeComplete(true);
    } else {
      setCurrentStepIndex((index) => index + 1);
    }
  }

  function handleRestart() {
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
    <section className="cooking" aria-labelledby="cooking-title">
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
          src={scene}
          alt={
            isRecipeComplete
              ? "La Kokeshi présente le ramen au poulet terminé."
              : isCuttingOnions ? "La Kokeshi découpe les oignons nouveaux." : "La Kokeshi t’accompagne dans sa cuisine japonaise."
          }
          width={1448}
          height={1086}
        />
        {isRecipeComplete && (
          <span className="cooking-sparkle" aria-hidden="true">
            ✦
          </span>
        )}
      </div>

      {!isRecipeComplete && (
        <div className="cooking-support">
          <details className="cooking-ingredients">
            <summary>Ingrédients de la recette</summary>
            <IngredientList ingredients={ingredients} />
          </details>
          {currentStep.durationSeconds !== undefined ? (
            <Timer
              key={`${recipeId}:${currentStep.id}`}
              storageKey={`komekokeshi:timer:${recipeId}:${currentStep.id}`}
              durationSeconds={currentStep.durationSeconds}
            />
          ) : (
            <aside className="kokeshi-tip">
              <h3>Le petit mot de Kokeshi</h3>
              <p>Prends ton temps. Passe à la suite quand tu as terminé ce geste.</p>
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

      <nav className="step-navigation" aria-label="Étapes de préparation">
        {isRecipeComplete ? (
          <button className="step-primary" type="button" onClick={handleRestart}>
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
