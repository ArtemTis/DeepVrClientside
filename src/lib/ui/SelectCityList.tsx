import { useEffect, useState } from "react";
import { ICity } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { allCities } from "../../features/profile-feature/store/asyncActions";
import { selectSelectedCity } from "../../features/auth-feature/store/selectors";
import { ReqStatus } from "../utils/enums";
import { LoadWrapper } from "./LoadWrapper";
import styled from "styled-components";


interface Props {
  selected: ICity | undefined;
  onSelect: (city: ICity | undefined) => void;
}

export const SelectCityList: React.FC<Props> = ({ selected, onSelect }) => {
  const dispatch = useAppDispatch();

  const selectedCity = useAppSelector(selectSelectedCity);
  const cityList = useAppSelector(state => state.profileReducer.allCities);
  const isLoading = useAppSelector(state => state.profileReducer.reqStatus === ReqStatus.pending);
  const loading = useAppSelector(state => state.profileReducer.reqStatus);

  useEffect(() => {
    if (cityList.length === 0) {
      dispatch(allCities());
    }
  }, []);

  return (
    <LoadWrapper isLoading={isLoading} height={1}>
      <CitiesList>
        {!!cityList ? (
          cityList.map((c) => {
            return (
              <StyledCity
                className={`city-select-row${c.id === (selected?.id || selectedCity?.id) ? " city-select-row-selected" : ""
                  }`}
                key={c.id}
                onClick={() => onSelect(c)}
              >
                {c.name}
              </StyledCity>
            );
          })
        ) : (
          <div className="city-select-no-available">Нет доступных городов</div>
        )}
      </CitiesList>
    </LoadWrapper>
  );
};

const CitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 14px;
  margin-top: 5px;
`

const StyledCity = styled.div`
  color: #ABAFE5;
  text-align: center;
  font-family: SF Pro Display;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 30.8px */


  &.city-select-row{
    /* width: 20vw; */
    width: 280px;
    padding: 14px 0px;
  }
  
  &.city-select-row-selected{
    text-align: center;
    font-family: SF Pro Display;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; 

    color: white;
    border-radius: 15px;
    background: #1F253F;
    min-width: 230px;
  }
`