import {createSlice} from "@reduxjs/toolkit";
import { getAllThumbnails } from "./asyncActions";
import IThumbnail from "../data/thumbnailDto";

type Status = "never" | "loading" | "error" | "successfull";

interface KnowledgeByState {
    thumbnails: IThumbnail[],
    thumbnailsLoadingStatus: Status,
    thumbnailsErrorText?: string 
}

const initialState: KnowledgeByState = {
    thumbnails: [],
    thumbnailsLoadingStatus: 'never'
};

const thumbnailSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllThumbnails.pending, (state) => {
            state.thumbnailsLoadingStatus = "loading";
        }),
        builder.addCase(getAllThumbnails.fulfilled, (state, action) => {
            state.thumbnailsLoadingStatus = "successfull";

            const viewedThumbnails: number[] = JSON.parse(localStorage.getItem('viewedThumbnails') || '[]');
            
            const thumbnailsId = action.payload.map(elem => elem.id);
            const updatedViewedThumbnails = viewedThumbnails.filter(id => thumbnailsId.includes(id));
            localStorage.setItem('viewedThumbnails', JSON.stringify(updatedViewedThumbnails));

            state.thumbnails = action.payload.map(elem => {
                const updatedThumbnail = { ...elem };
                
                if(updatedViewedThumbnails.includes(elem.id)) updatedThumbnail.isViewed = true;
                else updatedThumbnail.isViewed = false;

                return updatedThumbnail;
            });
        }),
        builder.addCase(getAllThumbnails.rejected, (state, action) => {
            state.thumbnailsLoadingStatus = "error";
            state.thumbnailsErrorText = action.error.message ?? 'текст ошибки';
        })
    },
});

export const thumbnailsReducer = thumbnailSlice.reducer;