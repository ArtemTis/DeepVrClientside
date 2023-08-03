import { createSlice } from "@reduxjs/toolkit";
import { getAllStories } from "./asyncActions";
import IStories from "../data/storiesDto";

type Status = "never" | "loading" | "error" | "successfull";

interface KnowledgeByState {
    stories: IStories[],
    storiesLoadingStatus: Status,
    storiesErrorText?: string
}

const initialState: KnowledgeByState = {
    stories: [],
    storiesLoadingStatus: 'never'
};

const storiesSlice = createSlice({
    name: "stories",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllStories.pending, (state) => {
            state.storiesLoadingStatus = "loading";
        }),
        builder.addCase(getAllStories.fulfilled, (state, action) => {
            state.storiesLoadingStatus = "successfull";
            state.stories = action.payload;
        }),
        builder.addCase(getAllStories.rejected, (state, action) => {
            state.storiesLoadingStatus = "error";
            state.storiesErrorText = action.error.message ?? 'текст ошибки';
        })
    },
});

export const storiesReducer = storiesSlice.reducer;