import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";
import bookingReducer from "./booking/slice";
import gamesType from "./gamesType/slice";
import allGames from "./games/slice";
import { storiesReducer } from "../../feature/stories-feature/store/slice";

const rootReducer = combineReducers({
    bookingReducer,
    authReducer,
    gamesType,
    allGames,
    storiesReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    devTools: !!process.env.NODE_ENV && process.env.NODE_ENV === 'development',
});

export const store = setupStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
