export const STORAGE_KEY = "scoreboard:players";
export const STORAGE_VERSION = 1;

export const DEFAULT_PLAYERS = [
  { name: "Lindsey", score: 0, id: 1 },
  { name: "Jonathan", score: 0, id: 2 },
  { name: "Bella", score: 0, id: 3 },
  { name: "Bobo", score: 0, id: 4 },
];

export function isValidPlayer(p) {
  return (
    p &&
    typeof p === "object" &&
    typeof p.name === "string" &&
    Number.isFinite(p.score) &&
    Number.isInteger(p.id)
  );
}

// Returns a clean array of players, or null if nothing usable is stored.
export function loadPlayers() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Accept both the legacy bare-array shape and the current { version, players } shape.
    const players = Array.isArray(parsed) ? parsed : parsed?.players;
    if (!Array.isArray(players)) return null;
    const clean = players.filter(isValidPlayer);
    return clean.length > 0 ? clean : null;
  } catch {
    return null;
  }
}

export function savePlayers(players) {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({ version: STORAGE_VERSION, players });
    window.localStorage.setItem(STORAGE_KEY, payload);
  } catch {
    // ignore quota or unavailable storage
  }
}

function nextId(players) {
  return players.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

export function playersReducer(players, action) {
  switch (action.type) {
    case "hydrate":
      return action.players;
    case "add": {
      const name = action.name.trim();
      if (!name) return players;
      return [...players, { name, score: 0, id: nextId(players) }];
    }
    case "remove":
      return players.filter((p) => p.id !== action.id);
    case "changeScore":
      return players.map((p) =>
        p.id === action.id ? { ...p, score: p.score + action.delta } : p,
      );
    case "resetScores":
      // Keep object identity for already-zero players to avoid needless re-renders.
      return players.map((p) => (p.score === 0 ? p : { ...p, score: 0 }));
    default:
      return players;
  }
}
