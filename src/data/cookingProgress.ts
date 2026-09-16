export type CookingProgress = {
  stepIndex: number;
  isComplete: boolean;
};

export function readProgress(storageKey: string, stepCount: number): CookingProgress {
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

