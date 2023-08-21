import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";
import { IBookingFields, IGetSummaryRequestData } from "../../types";

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


export const createEmpty = createAsyncThunk(
    'bookingSlice/createEmpty',
    async function (_, { rejectWithValue }) {
        try {
            const res = await Api.createEmpty();

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка создания заказа");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)
