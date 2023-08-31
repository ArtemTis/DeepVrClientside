import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../../../lib/utils/api";

export const gamesTypes = createAsyncThunk(
    'gamesTypes/gamesTypes',
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