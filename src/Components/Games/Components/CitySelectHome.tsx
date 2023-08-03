import { Row } from "antd";
import { useState } from "react";
import { Api } from "../../../Utils/api";
import {
  selectSelectedCity,
  selectToken
} from "../../../Utils/redux/auth/selectors";
import { setSelectedCity } from "../../../Utils/redux/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { ICity } from "../../../Utils/types";
import { ColLg } from "../../Common/Markup/ColLg";
import { NextButton } from "../../Common/Markup/NextButton";
import { SelectCityList } from "../../Common/Markup/SelectCityList";

import "../GamesStyles.css";
import Stories from "../../../feature/stories-feature/presentation/Stories";

export const CitySelectHome: React.FC = () => {
  const selectedCityProfile = useAppSelector(selectSelectedCity) as ICity;
  const [selected, setSelected] = useState<ICity | undefined>(
    selectedCityProfile
  );
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const onSelect = (city: ICity | undefined) => {
    setSelected(city);

    if (!!token)
      Api.setUserCity({ token, city: city?.name ?? "" }).catch((err) =>
        console.log(err)
      );
  };

  const confirmm = () => {
    if (selected) dispatch(setSelectedCity(selected));
  };

  return (
    <>
    <Row justify="center">
      <ColLg className="home-city-select-container ">
        <div className="home-title">Чтобы посмотреть игры, выберите город</div>
        <SelectCityList selected={selected} onSelect={onSelect} />
        <NextButton onClick={confirmm} isActive={!!selected}>
          Подтвердить
        </NextButton>
      </ColLg>
    </Row>
    
    <Stories/>
    </>
  );
};
