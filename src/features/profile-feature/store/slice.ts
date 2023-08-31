import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ICity } from "../../../lib/utils/types";
import { ReqStatus } from "../../../lib/utils/enums";
import { Api } from "../../../lib/utils/api";
import { allCities } from "./asyncActions";

interface ProfileState {
    // currentStep: number;
    city?: ICity;
    allCities: ICity[];
    // typeGame?: IGameType;
    // game?: IGame;
    // playersCount?: number;
    // date?: string;
    // selectedTime?: string;
    // avalibleTime?: string[];
    // credentials?: IBookingCredentials;
    // isFinished: boolean;
    instancePrefix: string;
    textError?: string;
    reqStatus?: ReqStatus;
}

const initialState: ProfileState = {
    reqStatus: ReqStatus.never,
    instancePrefix: '',
    allCities: [],
};

const profileSlice = createSlice({
    name: "bookingSlice",
    initialState,
    reducers: {

        setCity(state, action) {
            state.city = action.payload;
            Api.setInstanceUrl(state.city?.code);
        },
    },
    extraReducers: (builder) => {
        builder.addCase( allCities.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(allCities.fulfilled,
            (state, action) => {
                state.allCities = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(allCities.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
    }

});


export const {
    setCity,
} = profileSlice.actions;

export default profileSlice.reducer;

