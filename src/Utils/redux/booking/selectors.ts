import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCurrentStep = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.currentStep],
    (currentStep) => currentStep
)
export const selectCity = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.city],
    (city) => city
)
export const selectTypeGame = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.typeGame],
    (typeGame) => typeGame
)
export const selectGame = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.game],
    (game) => game
)
export const selectPlayersCount = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.playersCount],
    (playersCount) => playersCount
)
export const selectDate = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.date],
    (date) => date
)
export const selectTime = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.avalibleTime,
    (state: RootState) => state.bookingReducer.selectedTime],
    (avalibleTime, selectedTime) => avalibleTime?.map(time => {
        time.start_at.split(':')
        selectedTime
    })
)
export const selectCredentials = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.credentials],
    (credentials) => credentials
)
export const selectIsFinished = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.isFinished],
    (isFinished) => isFinished
)
