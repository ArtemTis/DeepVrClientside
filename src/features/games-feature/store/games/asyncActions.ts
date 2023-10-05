import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../../lib/utils/api";
import axios from "axios";
import { RootState } from "../../../../app/store";
import { selectToken } from "../../../auth-feature/store/selectors";

export const getAllGames = createAsyncThunk(
    'games',
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined;
        try {
            const res = await Api.getAllGames(token);

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
    async function(id: number | undefined, {rejectWithValue, getState}){
        const state = getState() as RootState;
        const token = selectToken(state) || undefined;
        try {
            const res = await Api.getGameByType(id, token);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора игры");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)