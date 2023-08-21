import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../Utils/redux/store";
import { storiesAdapter } from "./slice";

export const baseSelectors = storiesAdapter.getSelectors();

export const selectThumbnails = (state: RootState) => baseSelectors.selectAll(state.storiesReducer);

export const selectById = (state: RootState, id: number) => baseSelectors.selectById(state.storiesReducer, id);

export const selectStoriesById = (state: RootState, id: number) => baseSelectors.selectById(state.storiesReducer, id)?.stories ?? [];

export const selectIsThumbnailLoaded = (state: RootState, id: number) => selectStoriesById(state, id).length != 0;

export const selectIds = (state: RootState) => baseSelectors.selectIds(state.storiesReducer) as number[];

export const selectThumbnailLoadingStatus = createDraftSafeSelector(
    (state: RootState) => state.storiesReducer,
    (state) => state.allThumbnailLoadingStatus
)

export const selectTextError = createDraftSafeSelector(
    (state: RootState) => state.storiesReducer,
    (state) => state.allThumbnailErrorText
)

export const selectStoryLoadingStatus = createDraftSafeSelector(
    (state: RootState) => state.storiesReducer,
    (state) => state.statusStoriesByThumbnailId
)
