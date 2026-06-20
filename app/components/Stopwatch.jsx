"use client";
import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const previousTimeRef = useRef(0);

  useEffect(() => {
    if (!isRunning) return;

    previousTimeRef.current = Date.now();
    const intervalId = setInterval(() => {
      const now = Date.now();
      setElapsedTime((prev) => prev + (now - previousTimeRef.current));
      previousTimeRef.current = now;
    }, 100);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStopwatch = () => setIsRunning((running) => !running);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const seconds = Math.floor(elapsedTime / 1000);

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <span className="stopwatch-time">{seconds}</span>
      <button onClick={handleStopwatch}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
