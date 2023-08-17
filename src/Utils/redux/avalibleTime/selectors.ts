import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectAvalibleDayAndTime = createDraftSafeSelector(
    [(state: RootState) => state.timeReducer.avalibleDayAndTime],
    (avalibleTime) => avalibleTime ?? []
)
export const selectReqStatus = createDraftSafeSelector(
    [(state: RootState) => state.timeReducer.reqStatus],
    (reqStatus) => reqStatus
)

export const selectTextError = createDraftSafeSelector(
    [(state: RootState) => state.timeReducer.textError],
    (textError) => textError
)
