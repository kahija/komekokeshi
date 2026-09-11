import { useEffect, useState } from "react";
import type { RecipeStep } from "../data/recipes";
import { Timer } from "./Timer";
import kokeshiKitchen from "../assets/kokeshi-kitchen.png";
import "./CookingSteps.css";

type CookingStepsProps = {
  recipeId: string;
  steps: RecipeStep[];
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

export function CookingSteps({ recipeId, steps }: CookingStepsProps) {
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
  const isLastStep = currentStepIndex === steps.length - 1;

  function handleNextStep() {
    if (isLastStep) {
      setIsRecipeComplete(true);
    } else {
      setCurrentStepIndex((index) => index + 1);
    }
  }

  function handleRestart() {
    setCurrentStepIndex(0);
    setIsRecipeComplete(false);
  }

  return (
    <section className="cooking" aria-labelledby="cooking-title">
      <h2 id="cooking-title">Préparation</h2>

      <progress
        className="cooking-progress"
        aria-label="Étapes terminées"
        max={steps.length}
        value={isRecipeComplete ? steps.length : currentStepIndex}
      />

      {isRecipeComplete ? (
        <div role="status">
          <h3>Recette terminée !</h3>
          <p>Ton plat est prêt. Bon appétit !</p>
        </div>
      ) : (
        <div
          className="cooking-instruction"
          aria-live="polite"
          aria-atomic="true"
        >
          <p>
            Étape {currentStepIndex + 1} sur {steps.length}
          </p>
          <p className="cooking-instruction-text">{currentStep.instruction}</p>

          {currentStep.details && (
            <details key={currentStep.id} className="cooking-step-details">
              <summary>Précisions de l’étape</summary>
              <p>{currentStep.details}</p>
            </details>
          )}
        </div>
      )}

      <img
        className="cooking-scene"
        src={kokeshiKitchen}
        alt="La Kokeshi t’accompagne dans sa cuisine japonaise."
        width={1448}
        height={1086}
      />

      {!isRecipeComplete && currentStep.durationSeconds !== undefined && (
        <Timer
          key={currentStep.id}
          durationSeconds={currentStep.durationSeconds}
        />
      )}

      <nav className="step-navigation" aria-label="Étapes de préparation">
        {isRecipeComplete ? (
          <button type="button" onClick={handleRestart}>
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
              {isLastStep ? "Terminer la recette" : "Suivant"}
            </button>
          </>
        )}
      </nav>
    </section>
  );
}
