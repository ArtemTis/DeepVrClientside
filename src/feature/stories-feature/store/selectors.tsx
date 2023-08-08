import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../Utils/redux/store";

export const selectThumbnails = createDraftSafeSelector(
    (state: RootState) => state.thumbnailsReducer,
    (state) => {
        const sortedThumbnails = state.thumbnails.slice().sort((a, b) => {
            if (a.isViewed && !b.isViewed) {
                return 1;
            } else if (!a.isViewed && b.isViewed) {
                return -1; 
            } else {
                return a.id - b.id;
            }
        });

        return sortedThumbnails;
    }
)

export const selectThumbnailLoadingStatus = createDraftSafeSelector(
    (state: RootState) => state.thumbnailsReducer,
    (state) => state.thumbnailsLoadingStatus
)

export const selectThumbnailTextError = createDraftSafeSelector(
    (state: RootState) => state.thumbnailsReducer,
    (state) => state.thumbnailsErrorText
)

export const selectStories = createDraftSafeSelector(
    (state: RootState) => state.storiesReducer,
    (state) => state.stories
)

export const selectStoryLoadingStatus = createDraftSafeSelector(
    (state: RootState) => state.storiesReducer,
    (state) => state.storiesLoadingStatus
)

export const selectStoryTextError = createDraftSafeSelector(
    (state: RootState) => state.storiesReducer,
    (state) => state.storiesErrorText
)