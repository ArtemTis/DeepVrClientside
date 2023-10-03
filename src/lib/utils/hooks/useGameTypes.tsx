import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../app/store";
import { gamesTypes } from "../../../features/games-feature/store/gamesType/asyncActions";
import { selectGameTypes } from "../../../features/games-feature/store/gamesType/selectors";
import { ReqStatus } from "../enums";

const useGameType = () => {
    const dispatch = useAppDispatch();
    const gameTypes = useAppSelector(selectGameTypes);
    const isLoading = useAppSelector((state: RootState) => state.gamesType.requestStatus === ReqStatus.pending);

    if (!gameTypes) {
        dispatch(gamesTypes());
    }

    return gameTypes;
}

export default useGameType;