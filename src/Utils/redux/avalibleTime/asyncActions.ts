import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectToken } from "../auth/selectors";
import { selectDate, selectGameId, selectPlayersCount } from "../booking/selectors";
import axios from "axios";
import { Api } from "../../api";


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