import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { Api } from "../../../../lib/utils/api";
import axios from "axios";
import { selectToken } from "../../../auth-feature/store/selectors";
import { selectGameId, selectPlayersCount } from "../selectors";

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