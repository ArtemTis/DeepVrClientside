import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Api } from "../../api";
import { IBookingCredentials, ICity, IGame, IGameType } from "../../types";
import { gamesTypes } from "../gamesType/asyncActions";
import { getAvalibleTime, getDate } from "./asyncActions";


enum ReqStatus {
    never,
    pending,
    fulfield,
    rejected
}
interface BookingState {
    currentStep: number;
    city?: ICity;
    allCities?: ICity[];
    typeGame?: IGameType;
    game?: IGame;
    playersCount?: number;
    date?: string;
    selectedTime?: string;
    avalibleTime?: string[];
    credentials?: IBookingCredentials;
    isFinished: boolean;
    textError?: string;
    reqStatus?: ReqStatus;
}

const initialState: BookingState = {
    currentStep: 0,
    isFinished: false,
    reqStatus: ReqStatus.never,
};

const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState,
    reducers: {
        increaseStep(state) {
            state.currentStep++;
        },

        setStep(state, action) {
            state.currentStep = action.payload;
        },

        setCity(state, action) {
            state.city = action.payload;
            Api.setInstanceUrl(state.city?.code);
        },

        setTypeGame(state, action) {
            state.typeGame = action.payload;
        },

        setGame(state, action) {
            state.game = action.payload;
        },
        setPlayersCount(state, action) {
            state.playersCount = action.payload;
        },
        setDate(state, action) {
            state.date = action.payload;
        },
        setTime(state, action) {
            state.selectedTime = action.payload;
        },

        setCredentials(state, action) {
            state.credentials = action.payload;
        },

        decreaseStep(state) {
            state.currentStep--;
            if (state.currentStep < 0) state.currentStep = 0;
        },

        clearState(state) {
            return {
                currentStep: state.currentStep,
                isFinished: false,
                credentials: {
                    name: state.credentials?.name ?? '',
                    phone: state.credentials?.phone ?? '',
                    licenseAgree: false,
                },
            };
        },

        setIsFinished(state, action) {
            state.isFinished = action.payload;
        }
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


export const {
    increaseStep,
    setCity,
    setTypeGame,
    setDate,
    setGame,
    setTime,
    setPlayersCount,
    setCredentials,
    clearState,
    decreaseStep,
    setStep,
    setIsFinished
} = bookingSlice.actions;
export default bookingSlice.reducer;

