import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ICity, IGetBonusesInfoResponse, IInstance, IOrderHistoryItem, IUser } from "../../../lib/utils/types";
import { ReqStatus } from "../../../lib/utils/enums";
import { Api } from "../../../lib/utils/api";
import { allCities, allInstances, getBonusesInfo, getHistory, setUserCity } from "./asyncActions";

interface ProfileState {
    user?: IUser;
    city?: ICity;
    allCities: ICity[];
    allInstances: IInstance[];
    instance?:IInstance
    instancePrefix: string;
    bonuses?: IGetBonusesInfoResponse;
    history?: IOrderHistoryItem[];
    textError?: string;
    reqStatus?: ReqStatus;
}

const initialState: ProfileState = {
    reqStatus: ReqStatus.never,
    instancePrefix: '',
    allCities: [],
    allInstances: [],
};

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {

        setCityProfile(state, action) {
            state.city = action.payload;
            // Api.setInstanceUrl(state.city?.instances[0].code);
        },
        setInstance(state, action){
            state.instance = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(allCities.fulfilled,
            (state, action) => {
                state.allCities = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(allInstances.fulfilled,
            (state, action) => {
                state.allInstances = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(getBonusesInfo.fulfilled,
            (state, action) => {
                state.bonuses = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(getHistory.fulfilled,
            (state, action) => {
                state.history = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(setUserCity.fulfilled,
            (state, action) => {
                state.city = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(setUserCity.rejected,
            (state, action) => {
                state.reqStatus = ReqStatus.fulfield;
            }
        )

        builder.addMatcher(
            isAnyOf(allCities.pending, allInstances.pending, getBonusesInfo.pending, getHistory.pending, setUserCity.pending),
            (state, action) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addMatcher(
            isAnyOf(allCities.rejected, allInstances.rejected, getBonusesInfo.rejected, getHistory.rejected),
            (state, action) => {
                state.reqStatus = ReqStatus.fulfield;
                state.textError = action.error.message;
            }
        )
    }

});


export const {
    setCityProfile,
    // setInstance,
} = profileSlice.actions;

export default profileSlice.reducer;

