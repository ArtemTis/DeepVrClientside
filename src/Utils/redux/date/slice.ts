import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ReqStatus } from "../../enums";
import { getDate } from "./asyncActions";

interface DateState {
    date: {
        date: string;
        freePlace: number
    }[];
    textError?: string;
    reqStatus?: ReqStatus;
}

const initialState: DateState = {
    date: [],
    reqStatus: ReqStatus.never,
};

const dateSlice = createSlice({
    name: "dateSlice",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(getDate.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(getDate.fulfilled,
            (state, action) => {
                state.date = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(getDate.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
    }

});

export default dateSlice.reducer;

