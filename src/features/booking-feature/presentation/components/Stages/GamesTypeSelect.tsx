import React, { useEffect, useState } from 'react'
import { StageLayout } from './StageLayout'
import { Col, Row, Space } from 'antd'
import { RootState, useAppDispatch, useAppSelector } from '../../../../../app/store'
import styled from 'styled-components'
import { createEmpty } from '../../../store/asyncActions'
import { selectGameTypes } from '../../../../games-feature/store/gamesType/selectors'
import { IGameType } from '../../../../../lib/utils/types'
import { ReqStatus } from '../../../../../lib/utils/enums'
import { gamesTypes } from '../../../../games-feature/store/gamesType/asyncActions'
import { setTypeGame } from '../../../store/slice'
import { LoadWrapper } from '../../../../../lib/ui/LoadWrapper'
import TypeGameCard from '../TypeGameCard'

const GamesTypeSelect = () => {

  const dispatch = useAppDispatch();

  const gameTypes = useAppSelector(selectGameTypes);
  const [selected, setSelected] = useState<IGameType>();

  const isLoading = useAppSelector((state: RootState) => state.gamesType.requestStatus === ReqStatus.pending);

  useEffect(() => {
    dispatch(gamesTypes());
  }, [])

  useEffect(() => {
    dispatch(setTypeGame(selected)); 
  }, [selected])

  const onCardClick = (room: IGameType) => {
    setSelected(room);
  };


  return (
    <>
      <LoadWrapper isLoading={isLoading}>
        <TypeGameWrapper>
          {gameTypes &&
            gameTypes.map((gameType) => (
              // <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={gameType.id}>
                <TypeGameCard
                  gameType={gameType}
                  isSelected={selected?.id === gameType.id}
                  onClick={onCardClick}
                  key={gameType.id}
                />
              // </Col>
            ))}
        </TypeGameWrapper>
      </LoadWrapper>
    </>
  )
}

export default GamesTypeSelect

const TypeGameWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 20px;

   @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);

    .room-card-wrapper{
      width: 100%;
    }
  } 

  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);

    .room-card-wrapper{
      width: 100%;
    }
    
  } 
  @media screen and (max-width: 400px) {
    align-items: center;

    .room-card-wrapper{
      width: 100%;
    }
  } 
`