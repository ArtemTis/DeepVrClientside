import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Api } from "../../api";
import { IBookingCredentials, ICity, IGame, IGameType } from "../../types";
import { gamesTypes } from "../gamesType/asyncActions";

interface BookingState {
    currentStep: number;
    city?: ICity;
    typeGame?: IGameType;
    game?: IGame;
    playersCount?: number;
    date?: string;
    time?: string;
    credentials?: IBookingCredentials;
    isFinished: boolean;
    textError?: string;
    reqStatus: string;
}

const initialState: BookingState = {
    currentStep: 0,
    isFinished: false,
    reqStatus: '',
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
            state.time = action.payload;
        },

        setCredentials(state, action) {
            state.credentials = action.payload;
        },

        decreaseStep(state) {
            state.currentStep--;
            if (state.currentStep < 0) state.currentStep = 0;
        },

        // clearState(state) {
        //     return {
        //         currentStep: state.currentStep,
        //         isFinished: false,
        //         credentials: {
        //             name: state.credentials?.name ?? '',
        //             phone: state.credentials?.phone ?? '',
        //             licenseAgree: false,
        //         },
        //     };
        // },

        setIsFinished(state, action) {
            state.isFinished = action.payload;
        }
    },

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
    // clearState,
    decreaseStep,
    setStep,
    setIsFinished
} = bookingSlice.actions;
export default bookingSlice.reducer;

