import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { BackButton } from "../BackButton";
import { Api } from "../../../../../lib/utils/api";
import { FormError } from "../../../../../lib/ui/FormFields/FormError";

import "../../pages/BookingStyles.css";

import userIcon from "../../../../../assets/user-icon-liliac.svg";
import gameIcon from "../../../../../assets/console.svg";
import dateIcon from "../../../../../assets/calendar.svg";
import timeIcon from "../../../../../assets/time.svg";
import { getSummary } from "../../../store/summary/asyncActions";
import styled from "styled-components";
import { selectToken, selectUser } from "../../../../auth-feature/store/selectors";
import { selectCredentials, selectDate, selectGame, selectPlayersCount, selectSelectedTime } from "../../../store/selectors";
import { IBookingCredentials } from "../../../../../lib/utils/types";
import { ReqStatus } from "../../../../../lib/utils/enums";
import { LoadIcon } from "../../../../../lib/ui/LoadIcon";
import { curencyFormat } from "../../../../../lib/utils/format";
import { LoadWrapper } from "../../../../../lib/ui/LoadWrapper";

export const ConfirmBooking: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const typeGame = useAppSelector(state => state.bookingReducer.typeGame);
  const game = useAppSelector(selectGame);
  const count = useAppSelector(selectPlayersCount);
  const date = useAppSelector(selectDate)?.substring(0, 10);
  const time = useAppSelector(selectSelectedTime)?.substring(0, 5);

  const loadingStatus = useAppSelector(state => state.bookingReducer.reqStatus === ReqStatus.pending);
  const errorText = useAppSelector(state => state.bookingReducer.textError);
  const summary = useAppSelector(state => state.summaryReducer.summary);

  console.log(summary);

  const [isPostingForm, setIsPostingForm] = useState(false);


  return (
    <>
      <div className="booking-viewport">
        <Row justify="center">
          <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
            <Row
              justify="center"
              className="summary-params-table"
              gutter={[10, 24]}
            >
              <Col span={24}>
                <StyledTitle>Бронирование</StyledTitle>
              </Col>


              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={gameIcon}
                  alt="Игра"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {game?.title}
              </Col>

              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={userIcon}
                  alt="Число игроков"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {count}
              </Col>

              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={dateIcon}
                  alt="Дата"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {date}
              </Col>

              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={timeIcon}
                  alt="Время"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {time}
              </Col>

              <FormError errorMsg={errorText} />
            </Row>
            <Col span={24} className="summary-bg">
              <div className="summary-row">
                <span>Стоимость заказа:</span>
                <span className="summary-row-price">
                  {loadingStatus ? (
                    <LoadIcon />
                  ) : (
                    <>{summary && curencyFormat.format(summary.price)}</>
                  )}
                </span>
              </div>
              {!!summary && !!summary.promo && (
                <div className="summary-row">
                  <span>Промокод:</span>
                  <span className="summary-row-price">
                    {loadingStatus ? (
                      <LoadIcon />
                    ) : (
                      <>{curencyFormat.format(summary.promo)}</>
                    )}
                  </span>
                </div>
              )}
              {!!summary && !!summary.discount && (
                <div className="summary-row">
                  <span>Бонусы:</span>
                  <span className="summary-row-price">
                    {loadingStatus ? (
                      <LoadIcon />
                    ) : (
                      <>{curencyFormat.format(summary.discount)}</>
                    )}
                  </span>
                </div>
              )}

              <div className="summary-total">
                <span>Итого:</span>
                <span className="summary-total-price">
                  {loadingStatus ? (
                    <LoadIcon />
                  ) : (
                    <>{summary && curencyFormat.format(summary.total)}</>
                  )}
                </span>
              </div>
            </Col>
          </Col>
        </Row>
        <LoadWrapper isLoading={isPostingForm} height={1} />
      </div>
    </>
  );
};


const StyledTitle = styled.h1`
  margin: 0 0 60px;

  color: rgb(255, 255, 255);
  font-family: "SF Pro Display";
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`