import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";

export const allCities = createAsyncThunk(
    'profileSlice/allCities',
    async function (_, { rejectWithValue }) {
        try {            
            const res = await Api.getAllCities();

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)