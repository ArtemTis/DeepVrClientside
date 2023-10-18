import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NextButton } from '../../../lib/ui/NextButton';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { SelectInstanceList } from '../../../lib/ui/SelectInstanceList';
import { useNavigate } from 'react-router';
import { BOOKING_PATH } from '../../../lib/utils/routeConstants';
import { setCredentials, setDate, setGame, setBookingInstance, setPlayersCount, setTime, setTypeGame } from '../../booking-feature/store/slice';
import { IGame } from '../../../lib/utils/types';
import { selectGameTypes } from '../../games-feature/store/gamesType/selectors';
import { gamesTypes } from '../../games-feature/store/gamesType/asyncActions';
import useGameType from '../../../lib/utils/hooks/useGameTypes';
import InstanceSelectList from './InstanceSelectList';
import { getAllGames } from '../../games-feature/store/games/asyncActions';
import { selectBookingInstance } from '../../booking-feature/store/selectors';

interface IInstance {
  id: number,
  name: string
}

interface IProp {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  game: IGame;
}

const ModalInstance: React.FC<IProp> = ({ isModalOpen, setIsModalOpen, game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gameTypes = useAppSelector(selectGameTypes);
  
  const gameTypeOfGame = gameTypes.find(type => type.id === game.game_type_id);

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate(`/`);
  };

  const goToBooking = (instance?: IInstance) => {

    dispatch(setBookingInstance(instance));
    
    dispatch(setTypeGame(gameTypeOfGame));
    dispatch(setGame(game));
    dispatch(setPlayersCount(game.guest_min));
    
    dispatch(setDate(undefined));
    dispatch(setTime(undefined));
    dispatch(setCredentials(undefined));
    navigate(`${BOOKING_PATH}/3`);

    setIsModalOpen(false);
  }

  return (
    <StyledModal open={isModalOpen} footer={[]} onCancel={handleCancel}>
      <InstanceSelectList setIslOpen={setIsModalOpen} goToBooking={goToBooking} />
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
