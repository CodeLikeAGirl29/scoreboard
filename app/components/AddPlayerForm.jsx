"use client";
import { useRef } from "react";

export default function AddPlayerForm({ addPlayer }) {
  const playerInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(playerInput.current.value);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={playerInput} placeholder="Enter a player's name" />
      <input type="submit" value="Add Player" />
    </form>
  );
}