import { useEffect, useState } from "react";
import { Api } from "../../../Utils/api";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { ICity } from "../../../Utils/types";
import { LoadWrapper } from "./LoadWrapper";

import "../CommonStyles.css";
import { allCities } from "../../../Utils/redux/profile/asyncActions";
import { selectSelectedCity } from "../../../Utils/redux/auth/selectors";
import { ReqStatus } from "../../../Utils/enums";


interface Props {
  selected: ICity | undefined;
  onSelect: (city: ICity | undefined) => void;
}

export const SelectCityList: React.FC<Props> = ({ selected, onSelect }) => {
  const dispatch = useAppDispatch();

  const selectedCity = useAppSelector(selectSelectedCity);
  const cityList = useAppSelector(state => state.profileReducer.allCities);
  const loadingStatus = useAppSelector(state => state.profileReducer.reqStatus === ReqStatus.pending);

  useEffect(() => {
    dispatch(allCities());
  }, []);

  return (
    <LoadWrapper isLoading={loadingStatus} height={1}>
      <div className="city-select-wrapper">
        {!!cityList ? (
          cityList.map((c) => {
            return (
              <div
                className={`city-select-row${c.id === selected?.id ? " city-select-row-selected" : ""
                  }`}
                key={c.code}
                onClick={() => onSelect(c)}
              >
                {c.name}
              </div>
            );
          })
        ) : (
          <div className="city-select-no-available">Нет доступных городов</div>
        )}
      </div>
    </LoadWrapper>
  );
};
