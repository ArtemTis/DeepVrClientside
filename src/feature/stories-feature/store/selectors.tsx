import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../Utils/redux/store";

export const selectThumbnails = createDraftSafeSelector(
    (state: RootState) => state.thumbnailsReducer,
    (state) => {
        const viewedThumbnails: number[] = JSON.parse(localStorage.getItem('viewedThumbnails') || '[]');

        const filteredThumbnails = state.thumbnails.filter(thumbnail => !viewedThumbnails.includes(thumbnail.id)).sort((a, b) => a.id - b.id);
        const movedThumbnails = state.thumbnails.filter(thumbnail => viewedThumbnails.includes(thumbnail.id)).sort((a, b) => a.id - b.id);
        const updatedThumbnails = filteredThumbnails.concat(movedThumbnails);

        return updatedThumbnails;
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