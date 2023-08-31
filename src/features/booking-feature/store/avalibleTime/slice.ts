import { createSlice } from "@reduxjs/toolkit";
import { getAvalibleDateAndTime } from "./asyncActions";
import { IAvalibleTime } from "../../../../lib/utils/types";
import { ReqStatus } from "../../../../lib/utils/enums";

interface TimeState {
    avalibleDayAndTime?: IAvalibleTime[];
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
        builder.addCase(getAvalibleDateAndTime.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(getAvalibleDateAndTime.fulfilled,
            (state, action) => {
                state.avalibleDayAndTime = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(getAvalibleDateAndTime.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
    }

});

export default timeSlice.reducer;

