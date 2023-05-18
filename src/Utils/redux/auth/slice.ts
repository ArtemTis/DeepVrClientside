import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ICity, IUser } from "../../types";
import { singIn } from "./asyncActions";

interface AuthState {
    token: string;
    user?: IUser;
    selectedCity?: ICity;
    textError?: string;
    reqStatus: string;
}

const initialState: AuthState = {
    token: '',
    reqStatus: ''
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
        builder.addMatcher(
            isAnyOf(singIn.pending ),
            (state, action) => {
                state.reqStatus = 'loading';
                state.textError = '';
            }
        )
        builder.addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state, action) => {
                state.reqStatus = 'resolve';
                state.token = action.payload.token;
                state.user = action.payload.user;
            }
        )
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                state.reqStatus = 'rejected';
                state.textError = action.error.message;
            }
        )
    }
});

export const { setToken, setUser, setSelectedCity, setErrorText, setReqStatus } = bookingSlice.actions;
export default bookingSlice.reducer;