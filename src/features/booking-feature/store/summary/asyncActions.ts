import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../../lib/utils/api";
import axios from "axios";
import { IGetSummaryRequestData, IValidatePromoRequestData } from "../../../../lib/utils/types";

export const getSummary = createAsyncThunk(
    'summarySlice/getSummary',
    async function (values: IGetSummaryRequestData, { rejectWithValue }) {
        try {
            console.log(values);
            const res = await Api.getSummary(values);
            console.log(res.data);
            
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

