import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectAllDate = createDraftSafeSelector(
    [(state: RootState) => state.dateReducer.date],
    (date) => date
)

export const selectReqStatus = createDraftSafeSelector(
    [(state: RootState) => state.dateReducer.reqStatus],
    (reqStatus) => reqStatus
)

export const selectTextError = createDraftSafeSelector(
    [(state: RootState) => state.dateReducer.textError],
    (textError) => textError
)
