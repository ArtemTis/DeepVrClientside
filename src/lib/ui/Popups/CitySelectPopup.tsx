import { PopupLayout } from "./PopupLayout";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import "../../../features/profile-feature/presentation/pages/AccountStyles.css"
import { Api } from "../../utils/api";
import { ICity } from "../../utils/types";
import { selectSelectedCity, selectToken } from "../../../features/auth-feature/store/selectors";
import { setSelectedCity } from "../../../features/auth-feature/store/slice";
import { SelectCityList } from "../SelectCityList";
import { NextButton } from "../NextButton";
import { setUserCity } from "../../../features/profile-feature/store/asyncActions";
import { selectUserCity } from "../../../features/profile-feature/store/selectors";
import { useNavigate } from "react-router";


export const CitySelectPopup: React.FC = () => {
  const preselectedCity = useAppSelector(selectSelectedCity)
  const [selected, setSelected] = useState<ICity | undefined>(preselectedCity);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector(selectToken);

  const onSubmit = () => {
    if (!!selected) {
      dispatch(setSelectedCity(selected));
      // Api.setUserCity({ token, city: selected.name }).catch((err) =>
      //   console.log(err)
      // );
      dispatch(setUserCity(selected));
      // onBackClick();
      navigate(-1);
    }
  };
  return (
    <PopupLayout title="Выбрать город">
      <div className="select-city-popup-wrapper">
        <SelectCityList onSelect={setSelected} selected={selected} />
        <NextButton isActive={!!selected} onClick={onSubmit}>
          Подтвердить
        </NextButton>
      </div>
    </PopupLayout>
  );
};
