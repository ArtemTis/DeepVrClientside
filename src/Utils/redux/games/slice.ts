import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IGame } from "../../types";
import { getAllGames } from "./asyncActions";
import { ReqStatus } from "../../enums";


export const allGamesAdapter = createEntityAdapter<IGame>({
    selectId: (allGames) => allGames.id,
})

const allGames = createSlice({
    name: 'allGames',
    initialState: allGamesAdapter.getInitialState({ requestStatus: ReqStatus.never }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllGames.pending,
            (state) => {
                state.requestStatus = ReqStatus.pending;
            }
        )
        builder.addCase(getAllGames.fulfilled,
            (state, action) => {
                allGamesAdapter.setAll(state, action.payload);
                state.requestStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(getAllGames.rejected,
            (state) => {
                state.requestStatus = ReqStatus.rejected;
            }
        )
    }
})

export default allGames.reducer;