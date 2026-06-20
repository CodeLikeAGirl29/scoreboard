"use client";
import { useState, useMemo } from "react";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayerForm";
import { usePlayers } from "../hooks/usePlayers";

export default function Scoreboard() {
  const { players, addPlayer, removePlayer, changeScore, resetScores } =
    usePlayers();
  const [sortByScore, setSortByScore] = useState(false);

  const highScore = useMemo(() => {
    const scores = players.map((p) => p.score);
    const max = Math.max(...scores, 0); // the 0 guards the empty-list case
    if (max > 0 && scores.filter((s) => s === max).length === 1) return max;
    return null;
  }, [players]);

  // Derived view only — stored order is never mutated by sorting.
  const orderedPlayers = useMemo(() => {
    if (!sortByScore) return players;
    return players
      .map((p, i) => [p, i]) // carry the original index...
      .sort((a, b) => b[0].score - a[0].score || a[1] - b[1]) // ...so ties keep entry order
      .map(([p]) => p);
  }, [players, sortByScore]);

  const allZero = players.every((p) => p.score === 0);

  return (
    <div className="scoreboard">
      <Header title="Scoreboard" players={players} />

      <div className="scoreboard-controls">
        <button onClick={() => setSortByScore((s) => !s)}>
          {sortByScore ? "Sort: by score ▼" : "Sort: entry order"}
        </button>
        <button
          className="reset-scores"
          onClick={resetScores}
          disabled={allZero}
        >
          Reset Scores
        </button>
      </div>

      {orderedPlayers.length === 0 ? (
        <p className="empty-state">No players yet — add one below.</p>
      ) : (
        orderedPlayers.map((player) => (
          <Player
            key={player.id.toString()}
            name={player.name}
            score={player.score}
            id={player.id}
            changeScore={changeScore}
            removePlayer={removePlayer}
            isHighScore={highScore === player.score}
          />
        ))
      )}

      <AddPlayerForm addPlayer={addPlayer} />
    </div>
  );
}