import { selectSelectedCity } from "../../Utils/redux/auth/selectors";
import { useAppSelector } from "../../../../app/store";
import { DefaultLayout } from "../../../../core/DefaultLayout";
import { GamesList } from "../../../../Components/Games/Components/GamesList";

import "./GamesStyles.css";
import { CitySelectHome } from "../components/CitySelectHome";

export const Games: React.FC = () => {
  const city = useAppSelector(selectSelectedCity);
  return (
    // <DefaultLayout>{!!city ? <GamesList /> : <CitySelectHome />}</DefaultLayout>
    <DefaultLayout><GamesList /></DefaultLayout>
  );
};
