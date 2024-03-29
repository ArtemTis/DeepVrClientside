import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { selectToken } from "./selectors";
import { Api } from "../../../lib/utils/api";
import axios from "axios";
import { ILoginForm, IRegisterForm } from "../../../lib/utils/types";

export const singIn = createAsyncThunk(
    'authSlice/singIn',
    async function (getValues: ILoginForm, { rejectWithValue, getState }) {
        const state = getState() as RootState;
        const token = selectToken(state);
        try {
            const res = await Api.login(getValues);
            
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка авторизации");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const singInCode = createAsyncThunk(
    'authSlice/singInCode',
    async function (phone: string, { rejectWithValue }) {
        try {
            const res = await Api.loginSendCode({phone});

            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.error_text ?? "Ошибка авторизации");
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)

export const register = createAsyncThunk(
    'authSlice/register',
   async function(getValues: IRegisterForm, { rejectWithValue }){
    try {
        const res = await Api.register(getValues);

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.error_text ?? "Ошибка регистрации");
        }
        return rejectWithValue('Неизвестная ошибка');
    }
   }
)