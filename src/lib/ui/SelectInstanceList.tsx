import { useEffect, useState } from "react";
import { ICity, IInstance } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { allCities, allInstances } from "../../features/profile-feature/store/asyncActions";
import { selectSelectedCity } from "../../features/auth-feature/store/selectors";
import { ReqStatus } from "../utils/enums";
import { LoadWrapper } from "./LoadWrapper";
import styled from "styled-components";

// interface IInstance   {
//     id: number,
//     name: string
// }


interface Props {
    selected: IInstance | undefined;
    onSelect: (instance: IInstance | undefined) => void;
    instances?: IInstance[];
}


export const SelectInstanceList: React.FC<Props> = ({ selected, onSelect, instances }) => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(state => state.profileReducer.reqStatus === ReqStatus.pending);

    return (
        <LoadWrapper isLoading={isLoading} height={1}>
            <CitiesList>
                {!!instances ? (
                    instances.map((c) => {
                        return (
                            <StyledCity
                                className={`city-select-row${c.id === selected?.id ? " city-select-row-selected" : ""
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
    min-width: 230px;
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