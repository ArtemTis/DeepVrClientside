import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NextButton } from '../../../lib/ui/NextButton'
import { SelectInstanceList } from '../../../lib/ui/SelectInstanceList'
import { IInstance } from '../../../lib/utils/types';
import { Navigate, useNavigate } from 'react-router';
import { BOOKING_PATH } from '../../../lib/utils/routeConstants';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setGame, setBookingInstance, setPlayersCount, setTypeGame } from '../../booking-feature/store/slice';
import { allInstances } from '../../profile-feature/store/asyncActions';
import { selectAllInstances } from '../../profile-feature/store/selectors';
import { selectBookingInstance } from '../../booking-feature/store/selectors';

interface IProps {
    setIslOpen: React.Dispatch<React.SetStateAction<boolean>>;
    goToBooking?: (selected?: IInstance) => void;
}

const InstanceSelectList: React.FC<IProps> = ({ setIslOpen, goToBooking }) => {
    const dispatch = useAppDispatch();

    const selectedInstance = useAppSelector(selectBookingInstance);
    const [selected, setSelected] = useState<IInstance | undefined>(
      selectedInstance ?? undefined
    );

    const onSelect = (instance: IInstance | undefined) => {
        setSelected(instance);
    };

    const confirmm = () => {
        if (selected) {
            dispatch(setBookingInstance(selected));
        }

        if (goToBooking) {
            return goToBooking(selected);
        }
        setIslOpen(false);
    };

    const instances = useAppSelector(selectAllInstances);

    useEffect(() => {
        // dispatch(allInstances())

        if (instances.length === 1) {
            setSelected(instances[0]);
        }
    }, [])

    return (
        <ModalWrapper>
            <SelectInstanceList selected={selected} onSelect={onSelect} instances={instances} />
            <NextButton onClick={confirmm} isActive={!!selected}>
                Выбрать
            </NextButton>
        </ModalWrapper>
    )
}

export default InstanceSelectList

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`