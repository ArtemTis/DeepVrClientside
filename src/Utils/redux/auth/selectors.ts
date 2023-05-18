import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"


export const selectToken = createDraftSafeSelector(
    [(state: RootState) => state.authReducer.token],
    (token) => token
)

export const selectIsAuthorised = createDraftSafeSelector(
    [selectToken],
    (token) => !!token
)

export const selectUser = createDraftSafeSelector(
    [(state: RootState) => state.authReducer.user],
    (user) => user
)

export const selectSelectedCity = createDraftSafeSelector(
    [(state: RootState) => state.authReducer.selectedCity],
    (selectedCity) => selectedCity
)

export const selectReqStatus = createDraftSafeSelector(
    [(state: RootState) => state.authReducer.reqStatus],
    (reqStatus) => reqStatus
)

export const selectTextErrors = createDraftSafeSelector(
    [(state: RootState) => state.authReducer.textError],
    (textError) => textError
)