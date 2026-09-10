import { useEffect, useState } from "react";
import "./Timer.css";

type TimerProps = {
  durationSeconds: number;
};

export function Timer({ durationSeconds }: TimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [endsAt, setEndsAt] = useState<number | null>(null);

  const isRunning = endsAt !== null;
  const isFinished = remainingSeconds === 0;

  useEffect(() => {
    if (endsAt === null) return;

    const intervalId = window.setInterval(() => {
      const secondsLeft = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));

      setRemainingSeconds(secondsLeft);

      if (secondsLeft === 0) {
        setEndsAt(null);
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [endsAt]);

  function handleToggle() {
    if (endsAt !== null) {
      setRemainingSeconds(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
      setEndsAt(null);
    } else if (!isFinished) {
      setEndsAt(Date.now() + remainingSeconds * 1000);
    }
  }

  function handleReset() {
    setEndsAt(null);
    setRemainingSeconds(durationSeconds);
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
