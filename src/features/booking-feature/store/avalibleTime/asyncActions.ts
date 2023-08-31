import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import axios from "axios";
import { Api } from "../../../../lib/utils/api";
import { selectToken } from "../../../auth-feature/store/selectors";
import { selectGameId, selectPlayersCount } from "../selectors";


export const getAvalibleDateAndTime = createAsyncThunk(
    'getAvalibleTime',
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;

        const token = selectToken(state);
        const gameId = selectGameId(state);
        const playersCount = selectPlayersCount(state);
        try {
            const res = await Api.getAvalibleDateAndTime(gameId, playersCount, token,);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора времени");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)