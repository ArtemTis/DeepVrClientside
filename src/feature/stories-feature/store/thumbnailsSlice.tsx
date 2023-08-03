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

const thumbnailslice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers(builder) {
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

export const thumbnailsReducer = thumbnailslice.reducer;