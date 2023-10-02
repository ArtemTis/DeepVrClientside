import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ICity, IInstance } from "../../../lib/utils/types";
import { ReqStatus } from "../../../lib/utils/enums";
import { Api } from "../../../lib/utils/api";
import { allCities, allInstances } from "./asyncActions";

interface ProfileState {
    city?: ICity;
    allCities: ICity[];
    allInstances: IInstance[];
    instance?:IInstance
    instancePrefix: string;
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

        setCity(state, action) {
            state.city = action.payload;
            Api.setInstanceUrl(state.city?.code);
        },
        setInstance(state, action){
            state.instance = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase( allCities.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(allCities.fulfilled,
            (state, action) => {
                state.allCities = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(allCities.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )

        builder.addCase( allInstances.pending,
            (state) => {
                state.reqStatus = ReqStatus.pending;
            }
        )
        builder.addCase(allInstances.fulfilled,
            (state, action) => {
                state.allInstances = action.payload;
                state.reqStatus = ReqStatus.fulfield;
            }
        )
        builder.addCase(allInstances.rejected,
            (state) => {
                state.reqStatus = ReqStatus.rejected;
            }
        )
    }

});


export const {
    setCity,
} = profileSlice.actions;

export default profileSlice.reducer;

