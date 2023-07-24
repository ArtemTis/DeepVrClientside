import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectAvalibleTime = createDraftSafeSelector(
    [(state: RootState) => state.timeReducer.avalibleTime],
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
