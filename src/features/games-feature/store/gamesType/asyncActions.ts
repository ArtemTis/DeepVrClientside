import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../../../lib/utils/api";
import { RootState } from "../../../../app/store";
import { selectToken } from "../../../auth-feature/store/selectors";

export const gamesTypes = createAsyncThunk(
    'gamesTypes/gamesTypes',
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined;
        try {
            const res = await Api.getGamesTypes(token);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора типа игры");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)