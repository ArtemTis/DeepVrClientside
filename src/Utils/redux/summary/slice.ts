import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Api } from "../../api";
import { IBookingCredentials, ICity, IGame, IGameType, ISummaryResponse } from "../../types";
import { ReqStatus } from "../../enums";
import { getSummary } from "./asyncActions";

interface SummaryState {
    textError?: string;
    reqStatus?: ReqStatus;
    summary?: ISummaryResponse;
}

const initialState: SummaryState = {
    reqStatus: ReqStatus.never,
};

const summarySlice = createSlice({
    name: "summarySlice",
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder.addCase(getSummary.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(getSummary.fulfilled,
            (state, action) => {
                state.summary = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(getSummary.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
    }

});

export default summarySlice.reducer;

