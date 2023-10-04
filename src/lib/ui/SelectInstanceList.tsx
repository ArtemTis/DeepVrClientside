import { useEffect, useState } from "react";
import { ICity } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { allCities, allInstances } from "../../features/profile-feature/store/asyncActions";
import { selectSelectedCity } from "../../features/auth-feature/store/selectors";
import { ReqStatus } from "../utils/enums";
import { LoadWrapper } from "./LoadWrapper";
import styled from "styled-components";

interface IInstance   {
    id: number,
    name: string
}


interface Props {
    selected: IInstance | undefined;
    onSelect: (instance: IInstance | undefined) => void;
}


export const SelectInstanceList: React.FC<Props> = ({ selected, onSelect }) => {
    const dispatch = useAppDispatch();

    const selectedCity = useAppSelector(selectSelectedCity);
    //   const cityList = useAppSelector(state => state.profileReducer.allCities);
    const loadingStatus = useAppSelector(state => state.profileReducer.reqStatus === ReqStatus.pending);
    const cityList = [
        {
            id: 1,
            name: 'Все филиалы'
        },
        {
            id: 2,
            name: 'Ул. Мясницкая'
        },
        {
            id: 3,
            name: 'Ул. Кутякова'
        },
        {
            id: 4,
            name: 'Ул. Чапаева'
        },
    ];
    

    useEffect(() => {
        dispatch(allInstances());
    }, []);

    return (
        <LoadWrapper isLoading={loadingStatus} height={1}>
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
    width: 20vw;
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