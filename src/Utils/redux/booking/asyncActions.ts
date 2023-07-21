import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";
import { IBookingFields, IGetSummaryRequestData } from "../../types";
import { RootState } from "../store";
import { selectToken } from "../auth/selectors";
import { selectDate, selectGameId, selectPlayersCount } from "./selectors";

export const getDate = createAsyncThunk(
    'bookingSlice/getDate',
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

export const getAvalibleTime = createAsyncThunk(
    'bookingSlice/getAvalibleTime',
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;

        const token = selectToken(state);
        const gameId = selectGameId(state);
        const playersCount = selectPlayersCount(state);
        const date = selectDate(state);
        try {
            // const res = await Api.getTimesOfDay(date);
            const res = await Api.getAvalibleTime(gameId, playersCount, token, date ?? '');

            return res;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка выбора времени");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const createBooking = createAsyncThunk(
    'bookingSlice/createBooking',
    async function (values: IBookingFields, { rejectWithValue }) {
        try {
            const res = await Api.createBooking(values);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка создания заказа");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)


