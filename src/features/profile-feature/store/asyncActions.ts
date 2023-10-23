import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../lib/utils/api";
import axios from "axios";
import { RootState } from "../../../app/store";
import { selectInstancePrefix } from "./selectors";
import { ICity, ITokenDTO } from "../../../lib/utils/types";
import { selectCity, selectGameId } from "../../booking-feature/store/selectors";
import { selectToken } from "../../auth-feature/store/selectors";

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

export const allInstances = createAsyncThunk(
    'profileSlice/allInstances',
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined;
        const cityId = selectCity(state)?.id!!;
        try {            
            const res = await Api.getAllInstances(token, cityId);

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
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state);
        try {            
            const res = await Api.getBonusesInfo({token});

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
    async function (value: number, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state);
        try {            
            const res = await Api.getHistory(value, token);

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
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state);
        try {            
            const res = await Api.getUserCity(token);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const setUserCity = createAsyncThunk(
    'profileSlice/setUserCity',
    async function (value: ICity, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state);
        try {            
            const res = await Api.setUserCity(token, value);
            console.log(res);
            
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
