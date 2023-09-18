import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../lib/utils/api";
import axios from "axios";
import { RootState } from "../../../app/store";
import { selectInstancePrefix } from "./selectors";
import { ITokenDTO } from "../../../lib/utils/types";
import { selectGameId } from "../../booking-feature/store/selectors";

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


export const getBonusesInfo = createAsyncThunk(
    'profileSlice/getBonusesInfo',
    async function (value: ITokenDTO, { rejectWithValue }) {
        try {            
            const res = await Api.getBonusesInfo(value);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const getHistory = createAsyncThunk(
    'profileSlice/getHistory',
    async function (value: number, { rejectWithValue }) {
        try {            
            const res = await Api.getHistory(value);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const getUserCity = createAsyncThunk(
    'profileSlice/getUserCity',
    async function (value: string, { rejectWithValue }) {
        try {            
            const res = await Api.getUserCity(value);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const getGameInfo = createAsyncThunk(
    'profileSlice/getGameInfo',
    async function (_, { rejectWithValue, getState }) {

        const state = getState() as RootState;

        const instancePrefix = selectInstancePrefix(state);
        const gameId = selectGameId(state);

        try {            
            const res = await Api.getGameInfo(instancePrefix, gameId);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

// checkStatus

// logout