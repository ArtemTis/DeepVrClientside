import {createSlice} from "@reduxjs/toolkit";
import { getAllThumbnails } from "./asyncActions";
import IThumbnail from "../data/thumbnailDto";

type Status = "never" | "loading" | "error" | "successfull";

interface KnowledgeByState {
    thumbnails: IThumbnail[],
    thumbnailsLoadingStatus: Status,
    isViewed: boolean,
    thumbnailsErrorText?: string 
}

const initialState: KnowledgeByState = {
    thumbnails: [],
    isViewed: false,
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
            state.thumbnails = action.payload;            
        }),
        builder.addCase(getAllThumbnails.rejected, (state, action) => {
            state.thumbnailsLoadingStatus = "error";
            state.thumbnailsErrorText = action.error.message ?? 'текст ошибки';
        })
    },
});

export const thumbnailsReducer = thumbnailSlice.reducer;