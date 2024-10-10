import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../lib/utils/api";
import axios from "axios";
import { IBookingFields, IGetSummaryRequestData } from "../../../lib/utils/types";
import { RootState } from "../../../app/store";
import { selectToken } from "../../auth-feature/store/selectors";

export const createBooking = createAsyncThunk(
    'bookingSlice/createBooking',
    async function (values: IGetSummaryRequestData, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined; 
        try {
            const res = await Api.createBooking(values, token);
            
            return res.data;
        } catch (error) {    
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка создания заказа");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)


export const createEmpty = createAsyncThunk(
    'bookingSlice/createEmpty',
    async function (_, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined; 
        try {
            const res = await Api.createEmpty(token);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка создания заказа");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)
