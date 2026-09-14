import { useEffect, useState } from "react";
import "./Timer.css";

type TimerProps = {
  storageKey: string;
  durationSeconds: number;
};

type TimerState = {
  durationSeconds: number;
  remainingSeconds: number;
  endsAt: number | null;
};

function readTimer(storageKey: string, durationSeconds: number): TimerState {
  const initialState: TimerState = {
    durationSeconds,
    remainingSeconds: durationSeconds,
    endsAt: null,
  };

  try {
    const storedValue = localStorage.getItem(storageKey);

    if (!storedValue) return initialState;

    const saved = JSON.parse(storedValue);

    if (
      saved === null ||
      typeof saved !== "object" ||
      saved.durationSeconds !== durationSeconds ||
      !Number.isInteger(saved.remainingSeconds) ||
      saved.remainingSeconds < 0 ||
      saved.remainingSeconds > durationSeconds ||
      (saved.endsAt !== null &&
        (!Number.isFinite(saved.endsAt) ||
          saved.endsAt <= 0 ||
          saved.endsAt > Date.now() + durationSeconds * 1000))
    ) {
      return initialState;
    }

    return {
      durationSeconds,
      remainingSeconds: saved.remainingSeconds,
      endsAt: saved.endsAt,
    };
  } catch {
    return initialState;
  }
}

export function Timer({ storageKey, durationSeconds }: TimerProps) {
  const [timer, setTimer] = useState(() =>
    readTimer(storageKey, durationSeconds),
  );
  const [now, setNow] = useState(() => Date.now());

  const remainingSeconds =
    timer.endsAt === null
      ? timer.remainingSeconds
      : Math.max(0, Math.ceil((timer.endsAt - now) / 1000));

  const isFinished = remainingSeconds === 0;
  const isRunning = timer.endsAt !== null && !isFinished;

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  function saveTimer(nextTimer: TimerState) {
    setTimer(nextTimer);

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextTimer));
    } catch {
      // The timer still works when browser storage is unavailable.
    }
  }

  function handleToggle() {
    const currentTime = Date.now();
    setNow(currentTime);

    if (timer.endsAt !== null) {
      saveTimer({
        durationSeconds,
        remainingSeconds: Math.max(
          0,
          Math.ceil((timer.endsAt - currentTime) / 1000),
        ),
        endsAt: null,
      });
    } else if (timer.remainingSeconds > 0) {
      saveTimer({
        ...timer,
        endsAt: currentTime + timer.remainingSeconds * 1000,
      });
    }
  }

  function handleReset() {
    setNow(Date.now());

    saveTimer({
      durationSeconds,
      remainingSeconds: durationSeconds,
      endsAt: null,
    });
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  return (
    <div className="timer">
      <p>Minuteur</p>

      <p role="timer" aria-label="Temps restant">
        {formattedTime}
      </p>

      <div className="step-navigation">
        <button type="button" onClick={handleToggle} disabled={isFinished}>
          {isRunning ? "Pause" : "Démarrer"}
        </button>

        <button type="button" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>

      <p role="status">{isFinished ? "Temps écoulé !" : ""}</p>
    </div>
  );
}
