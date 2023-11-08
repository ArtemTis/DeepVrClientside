import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, singIn, singInCode } from "./asyncActions";
import { ICity, IUser } from "../../../lib/utils/types";
import { ReqStatus } from "../../../lib/utils/enums";

interface AuthState {
    token: string;
    client?: IUser;
    selectedCity?: ICity;
    textError?: string;
    reqStatus: ReqStatus;
    codeStatus: 'send' | 'auth';
}

const initialState: AuthState = {
    token: '',
    reqStatus: ReqStatus.never,
    codeStatus: 'send'
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action: { payload: IUser | undefined }) => {
            state.client = action.payload;
        },
        setSelectedCity: (state, action: { payload: ICity | undefined }) => {
            state.selectedCity = action.payload;   
        },
        setErrorText: (state, action) => {
            state.textError = action.payload;
        },
        setReqStatus: (state, action) => {
            state.reqStatus = action.payload;
        },
        setCity: (state, action: { payload: ICity }) => {
            state.client ? state.client.city = action.payload : undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(singInCode.pending, (state, action) => {
            state.codeStatus = 'auth';
        })
        builder.addCase(singIn.fulfilled, (state, action) => {
            state.client = action.payload.client;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.client = action.payload.client;
        })
        builder.addMatcher(
            isAnyOf(singIn.pending, singInCode.pending, register.pending),
            (state, action) => {
                state.reqStatus = ReqStatus.pending;
                // state.textError = '';
            }
        )
        builder.addMatcher(
            isAnyOf(singIn.fulfilled, singInCode.fulfilled, register.fulfilled),
            (state, action) => {
                state.reqStatus = ReqStatus.fulfield;
                state.token = action.payload.token;
            }
        )
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                state.reqStatus = ReqStatus.rejected;
                state.textError = action.error.message;
            }
        )
    }
});

export const { setToken, setUser, setSelectedCity, setErrorText, setReqStatus, setCity } = authSlice.actions;
export default authSlice.reducer;