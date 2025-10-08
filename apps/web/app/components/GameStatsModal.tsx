"use client";
import { useState, useEffect } from "react";
import { Game, GameHistoryMap } from "@repo/types";

interface Props {
  games: Game[];
  history: GameHistoryMap; //[date: string]: number[]
  onClose: () => void;
}

export default function GameStatsModal({ games, history, onClose }: Props) {
  //map through history to get a map or a dict of games and how many times they were played
  const gamesCounted: Record<number, { name: string; count: number }> = {};
  const gameNameMap = Object.fromEntries(games.map((g) => [g.id, g.name]));

  for (const date in history) {
    const gameIds = history[date] || [];
    gameIds.forEach((gameId) => {
      const gameName = gameNameMap[gameId];
      if (!gameName) return;

      if (gamesCounted[gameId]) {
        gamesCounted[gameId].count += 1;
      } else {
        gamesCounted[gameId] = { name: gameName, count: 1 };
      }
    });
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-80 flex flex-col space-y-3">
          <h2 className="font-bold text-lg">Your game stats</h2>
          <div className="m-3 p-3 flex flex-col space-y-2 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between border-b py-1 text-gray-600 font-bold sticky top-0 bg-white z-10">
              <span>Game name</span>
              <span>Playcount</span>
            </div>

            {Object.entries(gamesCounted).map(([gameId, { name, count }]) => (
              <div key={gameId} className="flex justify-between border-b py-1">
                <span className="font-medium text-gray-800">{name}</span>
                <span className="text-gray-600">{count}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
