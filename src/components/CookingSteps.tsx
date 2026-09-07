import { useState } from "react";
import type { RecipeStep } from "../data/recipes";
import { Timer } from "./Timer";

type CookingStepsProps = {
  steps: RecipeStep[];
};

export function CookingSteps({ steps }: CookingStepsProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRecipeComplete, setIsRecipeComplete] = useState(false);

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

      {isRecipeComplete ? (
        <div role="status">
          <h3>Recette terminée !</h3>
          <p>Ton plat est prêt. Bon appétit !</p>
        </div>
      ) : (
        <div>
          <p>
            Étape {currentStepIndex + 1} sur {steps.length}
          </p>
          <p>{currentStep.instruction}</p>
          {currentStep.durationSeconds !== undefined && (
            <Timer
              key={currentStep.id}
              durationSeconds={currentStep.durationSeconds}
            />
          )}
        </div>
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

            <button type="button" onClick={handleNextStep}>
              {isLastStep ? "Terminer la recette" : "Suivant"}
            </button>
          </>
        )}
      </nav>
    </section>
  );
}
