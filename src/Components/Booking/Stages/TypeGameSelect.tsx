import React from 'react'
import { StageLayout } from './StageLayout'
import { LoadWrapper } from '../../Common/Markup/LoadWrapper'
import { Col, Row } from 'antd'

const TypeGameSelect = () => {
  return (
    <StageLayout
    title="Выберите Тип Игры"
    onNextClick={onNextClick}
    onBackClick={onBackClick}
    isNextBtnActive={!!selected}
  >
    <LoadWrapper isLoading={isLoading}>
      <Row justify="start" gutter={[20, 20]}>
        {rooms &&
          rooms.map((room) => (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={room.id}>
              <RoomCard
                room={room}
                isSelected={selected?.id === room.id}
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