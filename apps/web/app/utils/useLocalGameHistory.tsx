import { useLocalStorageState } from "./useLocalStorageState";
import { GameHistory } from "@repo/types";
import { GameHistoryMap } from "@repo/types";

function useLocalGameHistory() {
  const [history, setHistory] = useLocalStorageState<GameHistoryMap>(
    "gameHistory",
    {}
  );

  const addPlay = (gameId: number) => {
    const today = new Date().toISOString().slice(0, 10);
    const todayGames = history[today] || [];
    if (!todayGames.includes(gameId)) {
      setHistory({ ...history, [today]: [...todayGames, gameId] });
    }
  };

  const isPlayedToday = (gameId: number) => {
    const today = new Date().toISOString().slice(0, 10);
    return history[today]?.includes(gameId) ?? false;
  };

  const getPlayedCountToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    return history[today]?.length ?? 0;
  };

  return { history, addPlay, isPlayedToday, getPlayedCountToday };
}

//old version that used GameHistory type
// function useLocalGameHistory() {
//     const [history, setHistory] = useLocalStorageState<GameHistory[]>("gameHistory", []);

//     const addPlay = (gameId: number) => {
//         const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
//         const existingEntry = history.find(entry => entry.gameId === gameId && entry.date === today);

//         if (existingEntry) {
//             const updatedHistory = history.map(entry =>
//                 entry.gameId === gameId && entry.date === today
//                     ? { ...entry, played: entry.played + 1 }
//                     : entry
//             );
//             setHistory(updatedHistory);
//         }
//         else {
//             setHistory([...history, { gameId, date: today, played: 1 }]);
//         }
//     };

//     return {history, addPlay};

// }

export { useLocalGameHistory };
