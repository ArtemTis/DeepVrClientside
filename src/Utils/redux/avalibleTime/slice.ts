import { createSlice } from "@reduxjs/toolkit";
import { ReqStatus } from "../../enums";
import { getAvalibleTime } from "./asyncActions";
import { IAvalibleTime } from "../../types";

interface TimeState {
    avalibleTime?: IAvalibleTime[];
    textError?: string;
    reqStatus?: ReqStatus;
}

const initialState: TimeState = {
    reqStatus: ReqStatus.never,
};

const timeSlice = createSlice({
    name: "timeSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAvalibleTime.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(getAvalibleTime.fulfilled,
            (state, action) => {
                state.avalibleTime = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(getAvalibleTime.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
    }

});

export default timeSlice.reducer;

