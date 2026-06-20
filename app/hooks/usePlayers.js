"use client";
import { useReducer, useEffect, useState, useCallback } from "react";
import {
  DEFAULT_PLAYERS,
  STORAGE_KEY,
  loadPlayers,
  savePlayers,
  playersReducer,
} from "../lib/players";

export function usePlayers() {
  const [players, dispatch] = useReducer(playersReducer, DEFAULT_PLAYERS);
  const [hydrated, setHydrated] = useState(false);

  // Load saved players after mount (localStorage is client-only, so the
  // initial render matches the server's default render — no hydration mismatch).
  useEffect(() => {
    const saved = loadPlayers();
    if (saved) dispatch({ type: "hydrate", players: saved });
    setHydrated(true);
  }, []);

  // Persist after every change, but only once hydrated, so we never
  // overwrite saved data with the defaults on first paint.
  useEffect(() => {
    if (!hydrated) return;
    savePlayers(players);
  }, [players, hydrated]);

  // Keep multiple open tabs in sync — the storage event fires in *other* tabs
  // when one of them writes.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      const saved = loadPlayers();
      if (saved) dispatch({ type: "hydrate", players: saved });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addPlayer = useCallback((name) => dispatch({ type: "add", name }), []);
  const removePlayer = useCallback(
    (id) => dispatch({ type: "remove", id }),
    [],
  );
  const changeScore = useCallback(
    (id, delta) => dispatch({ type: "changeScore", id, delta }),
    [],
  );
  const resetScores = useCallback(
    () => dispatch({ type: "resetScores" }),
    [],
  );

  return {
    players,
    hydrated,
    addPlayer,
    removePlayer,
    changeScore,
    resetScores,
  };
}