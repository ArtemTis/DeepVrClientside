import React, { useEffect, useState } from 'react'
import { StageLayout } from './StageLayout'
import { LoadWrapper } from '../../Common/Markup/LoadWrapper'
import { Col, Row } from 'antd'
import TypeGameCard from '../Components/TypeGameCard'
import { IGameType } from '../../../Utils/types'
import { RootState, useAppDispatch, useAppSelector } from '../../../Utils/redux/store'
import { selectGameTypes } from '../../../Utils/redux/gamesType/selectors'
import { decreaseStep, increaseStep, setTypeGame } from '../../../Utils/redux/booking/slice'
import { gamesTypes } from '../../../Utils/redux/gamesType/asyncActions'
import { ReqStatus } from '../../../Utils/enums'
import styled from 'styled-components'

const GamesTypeSelect = () => {

  const dispatch = useAppDispatch();

  const gameTypes = useAppSelector(selectGameTypes);
  const [selected, setSelected] = useState<IGameType>();

  const isLoading = useAppSelector((state: RootState) => state.allGames.requestStatus === ReqStatus.pending);

  useEffect(() => {
    dispatch(gamesTypes());
  },[])
  
  useEffect(() => {
    dispatch(setTypeGame(selected));
  },[selected])

  const onCardClick = (room: IGameType) => {
    setSelected(room);
  };
  

  return (
    <>
      <LoadWrapper isLoading={isLoading}>
        {/* <Row justify="start" gutter={[20, 20]}> */}
        <TypeGameWrapper>
          {gameTypes &&
            gameTypes.map((gameType) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={gameType.id}>
                <TypeGameCard
                  gameType={gameType}
                  isSelected={selected?.id === gameType.id}
                  onClick={onCardClick}
                />
              </Col>
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
`