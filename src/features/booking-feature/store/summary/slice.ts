import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Api } from "../../../../lib/utils/api";
import { getSummary } from "./asyncActions";
import { ReqStatus } from "../../../../lib/utils/enums";
import { ISummaryResponse, IValidatePromo } from "../../../../lib/utils/types";

interface SummaryState {
    textError?: string;
    reqStatus?: ReqStatus;
    summary?: ISummaryResponse;
    promo?: IValidatePromo;
    promoTextError?: string
    promoReqStatus: ReqStatus;
}

const initialState: SummaryState = {
    reqStatus: ReqStatus.never,
    promoReqStatus: ReqStatus.never
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

