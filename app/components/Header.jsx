import Stats from "./Stats";
import Stopwatch from "./Stopwatch";

export default function Header({ players, title = "Scoreboard" }) {
  return (
    <header>
      <Stats players={players} />
      <h1>{title}</h1>
      <Stopwatch />
    </header>
  );
}
