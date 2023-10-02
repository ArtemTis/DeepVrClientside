import { createDraftSafeSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"

export const selectAllCities = createDraftSafeSelector(
    [(state: RootState) => state.profileReducer.allCities],
    (allCities) => allCities
)

export const selectInstancePrefix = createDraftSafeSelector(
    [(state: RootState) => state.profileReducer.instancePrefix],
    (instancePrefix) => instancePrefix
)

export const selectAllInstances = createDraftSafeSelector(
    [(state: RootState) => state.profileReducer.allInstances],
    (allInstances) => allInstances
)