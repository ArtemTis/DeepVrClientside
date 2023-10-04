import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../../lib/utils/api";
import axios from "axios";
import { IGetSummaryRequestData, IValidatePromoRequestData } from "../../../../lib/utils/types";
import { RootState } from "../../../../app/store";
import { selectToken } from "../../../auth-feature/store/selectors";

export const getSummary = createAsyncThunk(
    'summarySlice/getSummary',
    async function (values: IGetSummaryRequestData, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined; 
        try {
            const res = await Api.getSummary(values, token);

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
    async function (values: IValidatePromoRequestData, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state) || undefined; 
        try {
            const res = await Api.validatePromo(values, token);

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка результата");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

