import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectToken } from "../auth/selectors";
import { selectGameId, selectPlayersCount } from "../booking/selectors";
import { Api } from "../../api";
import axios from "axios";

export const getDate = createAsyncThunk(
    'getDate',
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;

        const token = selectToken(state);
        const gameId = selectGameId(state);
        const playersCount = selectPlayersCount(state);

        try {
            const res = await Api.getDate(gameId, playersCount, token);

            return res;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора времени");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)