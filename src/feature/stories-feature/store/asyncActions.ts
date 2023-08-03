import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../data/storiesApi";

export const getAllThumbnails = createAsyncThunk(
    "getAllThumbnails",
    async () => {
        return await api.getThumbnails();
    }
);

export const getAllStories = createAsyncThunk(
    "getAllStories",
    async () => {
        return await api.getStories();
    }
);