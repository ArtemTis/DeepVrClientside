import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../store";

export const selectCurrentStep = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.currentStep],
    (currentStep) => currentStep
)
export const selectCity = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.city],
    (city) => city
)
export const selectDate = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.date],
    (date) => date
)
export const selectGame = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.game],
    (game) => game
)
export const selectPlayersCount = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.playersCount,
    (state: RootState) => selectGame(state)],
    (playersCount, selectGame) => playersCount ?? selectGame?.guest_min ?? 0
)
export const selectSelectedTime = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.selectedTime],
    (selectedTime) => selectedTime
)
export const selectCredentials = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.credentials],
    (credentials) => credentials
)
export const selectIsFinished = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.isFinished],
    (isFinished) => isFinished
)
export const selectGameId = createDraftSafeSelector(
    [selectGame],
    (game) => game?.id ?? -1
)
export const selectReqStatus = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.reqStatus],
    (reqStatus) => reqStatus
)

export const selectTextError = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.textError],
    (textError) => textError
)

export const selectBookingId = createDraftSafeSelector(
    [(state: RootState) => state.bookingReducer.bookingId],
    (bookingId) => bookingId
)
