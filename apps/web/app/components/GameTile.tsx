'use client';
import { Game } from "@repo/types";

interface Props {
  game: Game;
  manageMode: boolean,
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
}

export default function GameTile({ game, manageMode, onEdit, onDelete }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-purple-900 to-purple-600 rounded-lg p-4 w-full h-40 flex items-end justify-center hover:scale-105 transition cursor-pointer overflow-hidden">
    {!manageMode && (
        <a
        href={game.gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        ></a>
    )}

    <p className="absolute bottom-2 right-2 font-megrim text-white text-3xl text-[clamp(1.1rem,2vw,2rem)]">
        {game.name}
    </p>

    {/* overlay */}
    {manageMode && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 px-4">
        <button
            onClick={() => onEdit(game)}
            className="bg-black/60 hover:bg-black/80 hover:cursor-pointer text-white px-4 py-2 rounded-4xl transition"
        >
            Edit
        </button>
        <button
            onClick={() => onDelete(game.id)}
            className="bg-red-900 hover:bg-red-950 hover:cursor-pointer bg-opacity-60 hover:bg-opacity-80 text-white px-4 py-2 rounded-4xl transition"
        >
            Delete
        </button>
        </div>
    )}
    </div>
  );
}
