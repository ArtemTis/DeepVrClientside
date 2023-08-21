import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../../Utils/api";

export const getAllThumbnails = createAsyncThunk(
    'getAllThumbnail',    
    async function (_, { rejectWithValue }) {
        try {
            const res = await Api.getAllThumbnails();
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка загрузки миниатюр историй");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const getGroupStoriesById = createAsyncThunk(
    'getGroupStoriesById',
    async function (id: number, { rejectWithValue }) {        
        try {
            const res = await Api.getGroupStoriesById(id);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка загрузки группы историй");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)
