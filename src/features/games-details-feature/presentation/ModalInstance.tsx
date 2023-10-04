import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NextButton } from '../../../lib/ui/NextButton';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { SelectInstanceList } from '../../../lib/ui/SelectInstanceList';
import { useNavigate } from 'react-router';
import { BOOKING_PATH } from '../../../lib/utils/routeConstants';
import { setGame, setTypeGame } from '../../booking-feature/store/slice';
import { IGame } from '../../../lib/utils/types';
import { selectGameTypes } from '../../games-feature/store/gamesType/selectors';
import { gamesTypes } from '../../games-feature/store/gamesType/asyncActions';
import useGameType from '../../../lib/utils/hooks/useGameTypes';

interface IInstance {
  id: number,
  name: string
}

interface IProp {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInstance: IInstance;
  game: IGame;

  // setIslOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // isSelectedInstance: boolean;
}

const ModalInstance: React.FC<IProp> = ({ isModalOpen, setIsModalOpen, selectedInstance, game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const isSelectedInstance = !!useAppSelector(selectInstance);
  const isSelectedInstance = !!selectedInstance;

  // useEffect(() => {
  //   dispatch(gamesTypes())
  // }, [])

  const { gameTypes, isLoading } = useGameType();
  //useAppSelector(selectGameTypes)
  const gameTypeOfGame = gameTypes.find(type => type.id === game.gameTypeId);

  const [selected, setSelected] = useState<IInstance | undefined>(
    selectedInstance ?? undefined
  );

  const onSelect = (instance: IInstance | undefined) => {
    setSelected(instance);
  };

  // const confirmm = () => {
  //     if (selected) {
  //         // dispatch(setSelectedInstance(selected));
  //         // dispatch(setInstance(selected));
  //     }
  //     setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate(`/`);
  };

  const goToBooking = () => {
    // e.stopPropagation();

    navigate(`${BOOKING_PATH}/3`);
    dispatch(setTypeGame(gameTypeOfGame));
    dispatch(setGame(game));
    console.log(game);

    setIsModalOpen(false);
  }

  return (
    <StyledModal open={isModalOpen} footer={[]} onCancel={handleCancel}>
      <ModalWrapper>
        <SelectInstanceList selected={selected} onSelect={onSelect} />
        <NextButton onClick={goToBooking} isActive={!!selected}>
          Выбрать
        </NextButton>
      </ModalWrapper>
    </StyledModal>
  )
}

export default ModalInstance

const StyledModal = styled(Modal)`
  margin: 0 auto;
  width: 25vw !important;
  min-width: 280px;

  border-radius: 16px;
background: var(--101-a-29, #191A29);

  img{
    cursor: default !important;
  }

  .ant-modal-close{
    cursor: default !important;
  }

  .ant-modal-close-x{
    cursor: pointer;
  }
`
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`