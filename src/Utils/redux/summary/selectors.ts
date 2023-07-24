import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectSummary = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.summary],
    (summary) => summary
)
export const selectReqStatus = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.reqStatus],
    (reqStatus) => reqStatus
)
export const selectTextError = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.textError],
    (textError) => textError
)


export const selectPromoTextError = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.promoTextError],
    (promoReqStatus) => promoReqStatus
)
export const selectPromoReqStatus = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.promoReqStatus],
    (promoReqStatus) => promoReqStatus
)
export const selectPromo = createDraftSafeSelector(
    [(state: RootState) => state.summaryReducer.promo],
    (promo) => promo
)

