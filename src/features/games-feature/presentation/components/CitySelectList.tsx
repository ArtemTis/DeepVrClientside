import React, { useState } from 'react'
import styled from 'styled-components';
import { SelectCityList } from '../../../../lib/ui/SelectCityList';
import { NextButton } from '../../../../lib/ui/NextButton';
import { ICity, IInstance } from '../../../../lib/utils/types';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { selectCity } from '../../../booking-feature/store/selectors';
import { selectSelectedCity, selectToken } from '../../../auth-feature/store/selectors';
import { Api } from '../../../../lib/utils/api';
import { setSelectedCity } from '../../../auth-feature/store/slice';
import { setBookingInstance, setCity } from '../../../booking-feature/store/slice';
import { allInstances, setUserCity } from '../../../profile-feature/store/asyncActions';

interface IProps {
    setIslOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCity: ICity | undefined
    setIsOpenModal?: (value: boolean) => void;
}

const CitySelectList:React.FC<IProps> = ({setIslOpen, selectedCity, setIsOpenModal}) => {
    const selectedCityProfile = useAppSelector(selectSelectedCity) as ICity;

    const [selected, setSelected] = useState<ICity | undefined>(
        selectedCityProfile ?? selectedCity ?? undefined
    );
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);

    const onSelect = (city: ICity | undefined) => {
        setSelected(city);

        // if (!!token && city)
        // dispatch(setUserCity(city))
    };

    const confirmm = () => {
        if (selected) {
            // dispatch(setSelectedCity(selected));
            dispatch(setCity(selected));
            dispatch(setBookingInstance(undefined))
            dispatch(allInstances())
            // if (selected.instances.length === 1) {
            //     dispatch(setBookingInstance(selected.instances[0]));
            // }
            Api.setInstanceUrl();

            if (setIsOpenModal) {
                setIsOpenModal(false);
            }
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
