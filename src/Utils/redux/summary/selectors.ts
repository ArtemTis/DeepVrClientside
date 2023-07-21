import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectReqStatus = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.reqStatus],
    (reqStatus) => reqStatus
)
export const selectSummary = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.summary],
    (summary) => summary
)

export const selectTextError = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.textError],
    (textError) => textError
)