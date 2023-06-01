import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";

export const gamesTypes = createAsyncThunk(
    'booling/gamesTypes',
   async function(_, { rejectWithValue }){
    try {
        const res = await Api.getGamesTypes();

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора типа игры");
        }
        return rejectWithValue('Неизвестная ошибка');
    }
   }
)