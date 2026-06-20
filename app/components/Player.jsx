import Counter from "./Counter";
import Icon from "./Icon";

export default function Player({
  name,
  id,
  score,
  removePlayer,
  changeScore,
  isHighScore,
}) {
  return (
    <div className="player">
      <span className="player-name">
        <button
          className="remove-player"
          onClick={() => removePlayer(id)}
          aria-label={`Remove ${name}`}
        >
          ✖
        </button>
        <Icon isHighScore={isHighScore} />
        {name}
      </span>

      <Counter id={id} score={score} changeScore={changeScore} />
    </div>
  );
}