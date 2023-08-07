import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";

export const getAllGames = createAsyncThunk(
    'games',
    async function (_, { rejectWithValue }) {
        try {
            const res = await Api.getAllGames();

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора игры");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const getGameByType = createAsyncThunk(
    'gameByType',
    async function(id: number | undefined, {rejectWithValue}){
        try {
            const res = await Api.getGameByType(id);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора игры");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)