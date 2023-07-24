import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetSummaryRequestData, IValidatePromoRequestData } from "../../types";
import { Api } from "../../api";
import axios from "axios";

export const getSummary = createAsyncThunk(
    'summarySlice/getSummary',
    async function (values: IGetSummaryRequestData, { rejectWithValue }) {
        try {
            const res = await Api.getSummary(values);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const postValidatePromo = createAsyncThunk(
    'summarySlice/validatePromo',
    async function (values: IValidatePromoRequestData, { rejectWithValue }) {
        try {
            const res = await Api.validatePromo(values);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

