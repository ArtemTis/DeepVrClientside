import { allGamesAdapter } from "./slice";
import { RootState } from "../store";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

const baseSelectors = allGamesAdapter.getSelectors((state: RootState) => state.allGames);

export const selectGames = baseSelectors.selectAll;
export const selectGamesByType = createDraftSafeSelector(
    [selectGames,
        (state: RootState, gamesTypeId: number | undefined) => gamesTypeId],
    (games, gamesTypeId) => games.filter(game => game.game_type_id === gamesTypeId)
)

export const selectGamesByTypeId = createDraftSafeSelector(
    [(state: RootState) => state.allGames.gameByType],
    (gameByType) => gameByType
)