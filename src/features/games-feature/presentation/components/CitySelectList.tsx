import React, { useState } from 'react'
import styled from 'styled-components';
import { SelectCityList } from '../../../../lib/ui/SelectCityList';
import { NextButton } from '../../../../lib/ui/NextButton';
import { ICity } from '../../../../lib/utils/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { selectCity } from '../../../booking-feature/store/selectors';
import { selectSelectedCity, selectToken } from '../../../auth-feature/store/selectors';
import { Api } from '../../../../lib/utils/api';
import { setSelectedCity } from '../../../auth-feature/store/slice';
import { setCity } from '../../../booking-feature/store/slice';

interface IProps {
    setIslOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSelectedCity: boolean;
}

const CitySelectList:React.FC<IProps> = ({setIslOpen, isSelectedCity}) => {
    const selectedCityProfile = useAppSelector(selectSelectedCity) as ICity;


    const [selected, setSelected] = useState<ICity | undefined>(
        selectedCityProfile ?? isSelectedCity ?? undefined
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
        if (selected) {
            dispatch(setSelectedCity(selected));
            dispatch(setCity(selected));
        }
        setIslOpen(false);
    };

    return (
        <ModalWrapper>
            <SelectCityList selected={selected} onSelect={onSelect} />
            <NextButton onClick={confirmm} isActive={!!selected}>
                Выбрать
            </NextButton>
        </ModalWrapper>
    )
}

export default CitySelectList;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  max-width: 320px;
`
