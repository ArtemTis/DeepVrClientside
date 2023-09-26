import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../../lib/utils/api";
import { RootState } from "../../../app/store";
import { selectToken } from "../../auth-feature/store/selectors";

export const getAllThumbnails = createAsyncThunk(
    'getAllThumbnail',    
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined;
        try {
            const res = await Api.getAllThumbnails(token);
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
    async function (id: number, { rejectWithValue, getState }) {       
        const state = getState() as RootState;
        const token = selectToken(state) || undefined; 
        try {
            const res = await Api.getGroupStoriesById(id, token);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка загрузки группы историй");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)
