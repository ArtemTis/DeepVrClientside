import { useAppSelector } from "../../../../app/store";
import { DefaultLayout } from "../../../../core/DefaultLayout";
import "../components/GamesStyles.css";
import { selectSelectedCity } from "../../../auth-feature/store/selectors";
import { GamesList } from "../components/GamesList";

export const Games: React.FC = () => {
  const city = useAppSelector(selectSelectedCity);
  return (
    // <DefaultLayout>{!!city ? <GamesList /> : <CitySelectHome />}</DefaultLayout>
    <DefaultLayout><GamesList /></DefaultLayout>
  );
};
