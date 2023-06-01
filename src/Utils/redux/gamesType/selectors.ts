import { Root } from "react-dom/client";
import { gamesTypesAdapter } from "./slice";
import { RootState } from "../store";

const baseSelectors = gamesTypesAdapter.getSelectors((state: RootState) => state.gamesType);

export const selectGameTypes =  baseSelectors.selectAll;