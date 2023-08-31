import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { gamesTypes } from "./asyncActions";
import { getGameByType } from "../games/asyncActions";
import { IGameType } from "../../../../lib/utils/types";
import { ReqStatus } from "../../../../lib/utils/enums";


export const gamesTypesAdapter = createEntityAdapter<IGameType>({
    selectId: (gamesType) => gamesType.id,
})

const gamesType = createSlice({
    name: "gamesType",
    initialState: gamesTypesAdapter.getInitialState({requestStatus: ReqStatus.never}),
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(gamesTypes.pending,
            (state) => {
                state.requestStatus = ReqStatus.pending;
            }
        )
        builder.addCase(gamesTypes.fulfilled,
            (state, action) => {
                gamesTypesAdapter.setAll(state, action.payload);
                state.requestStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(gamesTypes.rejected,
            (state) => {
                state.requestStatus = ReqStatus.rejected;
            }
        )
    }
});

export default gamesType.reducer;