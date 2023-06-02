import React, { useState } from 'react'
import { StageLayout } from './StageLayout'
import { LoadWrapper } from '../../Common/Markup/LoadWrapper'
import { Col, Row } from 'antd'
import TypeGameCard from '../Components/TypeGameCard'
import { IGameType } from '../../../Utils/types'
import { RootState, useAppDispatch, useAppSelector } from '../../../Utils/redux/store'
import { selectGameTypes } from '../../../Utils/redux/gamesType/selectors'
import { decreaseStep, increaseStep, setTypeGame } from '../../../Utils/redux/booking/slice'

enum ReqStatus {
  pending,
  fulfield,
  rejected
}

const GamesTypeSelect = () => {

  const dispatch = useAppDispatch();

  const gameTypes = useAppSelector(selectGameTypes);
  const [selected, setSelected] = useState<IGameType>();

  const isLoading = useAppSelector((state: RootState) => state.allGames.requestStatus === ReqStatus.pending);

  const onCardClick = (room: IGameType) => {
    setSelected(room);
  };

  const onNextClick = () => {
    if (!!selected) {
      dispatch(setTypeGame(selected));
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };
  return (
    <StageLayout
      title="Выберите Тип Игры"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!!selected}
    >
      <LoadWrapper isLoading={isLoading}>
        <Row justify="start" gutter={[20, 20]}>
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
        </Row>
      </LoadWrapper>
    </StageLayout>
  )
}

export default GamesTypeSelect