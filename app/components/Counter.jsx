export default function Counter({ id, score, changeScore }) {
  return (
    <div className="counter">
      <button
        className="counter-action decrement"
        onClick={() => changeScore(id, -1)}
        aria-label="Decrease score"
      >
        −
      </button>
      <span className="counter-score">{score}</span>
      <button
        className="counter-action increment"
        onClick={() => changeScore(id, 1)}
        aria-label="Increase score"
      >
        +
      </button>
    </div>
  );
}