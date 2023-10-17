import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createBooking, createEmpty } from "./asyncActions";
import { IBookingCredentials, ICity, IGame, IGameType, IInstance } from "../../../lib/utils/types";
import { ReqStatus } from "../../../lib/utils/enums";
import { Api } from "../../../lib/utils/api";
import { useAppSelector } from "../../../app/store";
import { selectAllInstances } from "../../profile-feature/store/selectors";

export interface BookingState {
    currentStep: number;
    city?: ICity;
    instance?: IInstance;
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
    bookingId?: {id: string, clientId: string}
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

        setStep(state, action : PayloadAction<number>) {
            state.currentStep = action.payload;
        },

        setCity(state, action) {
            state.city = action.payload;
            Api.setInstanceUrl(state.city?.instances[0].code);
        },

        setInstance(state, action) {
            state.instance = action.payload;
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
        builder.addCase(createBooking.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(createBooking.fulfilled,
            (state, action) => {

                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(createBooking.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
        builder.addCase(createEmpty.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(createEmpty.fulfilled,
            (state, action) => {
                state.bookingId = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(createEmpty.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
    }

});


export const {
    increaseStep,
    setCity,
    setInstance,
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

