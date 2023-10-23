import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "../features/auth-feature/store/slice";
import bookingReducer from "../features/booking-feature/store/slice";
import gamesType from "../features/games-feature/store/gamesType/slice";
import allGames from "../features/games-feature/store/games/slice";
import profileReducer from "../features/profile-feature/store/slice";
import summaryReducer from "../features/booking-feature/store/summary/slice";
import timeReducer from "../features/booking-feature/store/avalibleTime/slice";
import { storiesReducer } from "../features/stories-feature/store/slice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    profileReducer,
    bookingReducer,
    authReducer,
    allGames,
    gamesType,
    timeReducer,
    summaryReducer,
    storiesReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer']
    // blacklist: ['authReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// export const setupStore = () => configureStore({
//     reducer: persistedReducer,
//     devTools: !!process.env.NODE_ENV && process.env.NODE_ENV === 'development',
// });

// export const store = setupStore();
export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
