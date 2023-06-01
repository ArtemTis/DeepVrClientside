import React, { useState } from 'react'
import { StageLayout } from './StageLayout'
import { LoadWrapper } from '../../Common/Markup/LoadWrapper'
import { Col, Row } from 'antd'
import TypeGameCard from '../Components/TypeGameCard'
import { IGameType } from '../../../Utils/types'
import { useAppDispatch, useAppSelector } from '../../../Utils/redux/store'
import { selectGameTypes } from '../../../Utils/redux/gamesType/selectors'
import { decreaseStep, increaseStep, setTypeGame } from '../../../Utils/redux/booking/slice'

const TypeGameSelect = () => {

  const dispatch = useAppDispatch();

  const typeGames = useAppSelector(selectGameTypes);
  const [selected, setSelected] = useState<IGameType>();

  const [isLoading, setIsLoading] = useState(false);

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
          {typeGames &&
            typeGames.map((typeGame) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={typeGame.id}>
                <TypeGameCard
                  room={typeGame}
                  isSelected={selected?.id === typeGame.id}
                  onClick={onCardClick}
                />
              </Col>
            ))}
        </Row>
      </LoadWrapper>
    </StageLayout>
  )
}

export default TypeGameSelect