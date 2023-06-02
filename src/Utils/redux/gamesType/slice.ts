import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IGameType } from "../../types";
import { gamesTypes } from "./asyncActions";

enum ReqStatus {
    never,
    pending,
    fulfield,
    rejected
}

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