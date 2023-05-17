import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICity, ILoginForm, IUser } from "../types";
import { RootState } from "./store";
import { Api } from "../api";

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

export const singIn = createAsyncThunk(
    'authSlice/singIn',
    async function (getValues: ILoginForm,{rejectWithValue, dispatch}) {
        await Api.login(getValues)
            .then((res) => {
                
                if (Api.checkStatus(res)) {
                    if (!!res.data && !res.data.error) {
                        dispatch(setToken(res.data.token));
                        dispatch(setUser(res.data.user));
                    } else {
                        dispatch(setErrorText(
                            (res.data.error_text as string) ?? "Ошибка авторизации"
                        ));
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (!!err.data?.error) {
                    dispatch(setErrorText(err.data.error_text));
                } else if (err.response.status >= 500)
                    dispatch(setErrorText("Ошибка сервера, попробуйте позже"));
            })
            // .finally(() => setIsLoading(false));
    }
)

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
    // extraReducers: {
    //     [singIn.pending]: (state, action) => {
    //         state.status = 'loading';
    //         state.textError = null;
    //     },
    //     [singIn.fulfilled]: (state, action) => {
    //         state.status = 'resolve';
    //     },
    //     [singIn.rejected]: (state, action) => {},
    // }
});

export const getToken = (state: RootState) => state.authReducer.token;
export const getIsAuthorised = (state: RootState) => !!state.authReducer.token;
export const getUser = (state: RootState) => state.authReducer.user;
export const getSelectedCity = (state: RootState) => state.authReducer.selectedCity;
export const getReqStatus = (state: RootState) => state.authReducer.reqStatus;
export const getTextErrors = (state: RootState) => state.authReducer.textError;


export const { setToken, setUser, setSelectedCity, setErrorText, setReqStatus } = bookingSlice.actions;
export default bookingSlice.reducer;