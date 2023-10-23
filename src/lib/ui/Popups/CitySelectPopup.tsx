import { PopupLayout } from "./PopupLayout";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import "../../../features/profile-feature/presentation/pages/AccountStyles.css"
import { Api } from "../../utils/api";
import { ICity } from "../../utils/types";
import { selectToken } from "../../../features/auth-feature/store/selectors";
import { setSelectedCity } from "../../../features/auth-feature/store/slice";
import { SelectCityList } from "../SelectCityList";
import { NextButton } from "../NextButton";
import { setUserCity } from "../../../features/profile-feature/store/asyncActions";

interface Props {
  onBackClick: () => void;
  preselected?: ICity;
}

export const CitySelectPopup: React.FC<Props> = ({
  onBackClick,
  preselected,
}) => {
  const [selected, setSelected] = useState<ICity | undefined>(preselected);
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);

  const onSubmit = () => {
    if (!!selected) {
      dispatch(setSelectedCity(selected));
      // Api.setUserCity({ token, city: selected.name }).catch((err) =>
      //   console.log(err)
      // );
      dispatch(setUserCity(selected))
      onBackClick();
    }
  };
  return (
    <PopupLayout title="Выбрать город" onBackClick={onBackClick}>
      <div className="select-city-popup-wrapper">
        <SelectCityList onSelect={setSelected} selected={selected} />
        <NextButton isActive={!!selected} onClick={onSubmit}>
          Подтвердить
        </NextButton>
      </div>
    </PopupLayout>
  );
};
