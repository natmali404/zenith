'use client';
import { useState } from "react";
import { Game } from "@repo/types";
import GameTile from "./GameTile";
import GameModal from "./GameModal";
import { useLocalStorageState } from "../utils/localStorageState";
import { PlusIcon } from "@radix-ui/react-icons";

export default function TileGrid() {
    const [games, setGames] = useLocalStorageState<Game[]>("games", []);
    const [showModal, setShowModal] = useState(false);
    const [manageMode, setManageMode] = useState(false);
    const [editGame, setEditGame] = useState<Game | null>(null);

    const addGame = (title: string, url: string) => {
    const newGame: Game = { id: Date.now(), name: title, gameUrl: url };
    setGames([...games, newGame]);
    };

    const updateGame = (title: string, url: string) => {
        if (!editGame) return;
        setGames(
        games.map((g) =>
            g.id === editGame.id ? { ...g, name: title, gameUrl: url } : g
        )
        );
        setEditGame(null);
    };

    const deleteGame = (id: number) => {
        setGames(games.filter((g) => g.id !== id));
    };

    return (
        <div>
            <div className="mb-2 flex justify-center items-center gap-2">
            <button
                onClick={() => {
                    setEditGame(null);
                    setShowModal(true);
                }}
                className="bg-black/60 hover:bg-black/80 hover:cursor-pointer text-white rounded-full p-2 flex items-center justify-center transition"
            >
            <PlusIcon className="w-5 h-5" />
            </button>
            <button
            className="bg-black/60 hover:bg-black/80 hover:cursor-pointer text-white px-4 py-2 rounded-4xl transition"
            onClick={() => setManageMode((prev) => !prev)}
            >
            {manageMode ? "Done" : "Manage"}
            </button>
        </div>
        {(showModal || editGame) && (
            <GameModal
            mode={editGame ? "edit" : "add"}
            initialValues={
                editGame
                ? { title: editGame.name, url: editGame.gameUrl }
                : undefined
            }
            onSubmit={editGame ? updateGame : addGame}
            onClose={() => {
                setShowModal(false);
                setEditGame(null);
            }}
            />
        )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-10 mx-auto w-full">
                {Object.values(games).map((game: Game) => (
                <GameTile
                key={game.id}
                game={game}
                manageMode={manageMode}
                onEdit={setEditGame}
                onDelete={deleteGame}
            />
                ))}
            </div>
        </div>
        
    );
}   