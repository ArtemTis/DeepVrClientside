import { selectSelectedCity } from "../../Utils/redux/auth/selectors";
import { useAppSelector } from "../../Utils/redux/store";
import { DefaultLayout } from "../Layout/DefaultLayout";
import { GamesList } from "./Components/GamesList";

import "./GamesStyles.css";
import { CitySelectHome } from "./Components/CitySelectHome";

export const Games: React.FC = () => {
  const city = useAppSelector(selectSelectedCity);
  return (
    <DefaultLayout>{!!city ? <GamesList /> : <CitySelectHome />}</DefaultLayout>
  );
};
