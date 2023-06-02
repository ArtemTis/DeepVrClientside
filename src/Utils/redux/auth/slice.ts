import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ICity, IUser } from "../../types";
import { register, singIn, singInCode } from "./asyncActions";

enum ReqStatus {
    pending,
    fulfield,
    rejected
}
interface AuthState {
    token: string;
    user?: IUser;
    selectedCity?: ICity;
    textError?: string;
    reqStatus: ReqStatus;
    codeStatus: 'send' | 'auth';
}

const initialState: AuthState = {
    token: '',
    reqStatus: ReqStatus.pending,
    codeStatus: 'send'
};

const bookingSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action: { payload: IUser | undefined }) => {
            state.user = action.payload;
        },
        setSelectedCity: (state, action: { payload: ICity | undefined }) => {
            state.selectedCity = action.payload;
        },
        setErrorText: (state, action) => {
            state.textError = action.payload;
        },
        setReqStatus: (state, action) => {
            state.reqStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(singInCode.pending, (state, action) => {
            state.codeStatus = 'auth';
        })
        builder.addCase(singIn.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
        builder.addMatcher(
            isAnyOf(singIn.pending, singInCode.pending, register.pending),
            (state, action) => {
                state.reqStatus = ReqStatus.pending;
                state.textError = '';
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

export const { setToken, setUser, setSelectedCity, setErrorText, setReqStatus } = bookingSlice.actions;
export default bookingSlice.reducer;