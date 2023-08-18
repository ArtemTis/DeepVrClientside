import { Col, Row, Space } from "antd";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../../Common/Markup/NextButton";
import { Title } from "../Components/Title";
import { useAppDispatch } from "../../../Utils/redux/store";
import { setIsFinished } from "../../../Utils/redux/booking/slice";
import { HOME_PATH } from "../../../Utils/routeConstants";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import "../BookingStyles.css";

import doneImg from "../../../Assets/mirage-done.png";
import styled from "styled-components";

export const Done: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [useRedirect, setUseRedirect] = useState(false);

  const onNextClick = () => {
    navigate('/');
  };


  return (
    <Row justify="center" >
      <Space direction="vertical" size="large" align="center">
        <Row justify="center">
          <img src={doneImg} alt="Готово" className="done-img" />
          <Title fontSize={46}>Ваша бронь принята!</Title>
          <Row justify="center" gutter={[20, 20]}>
            {/* <Col xs={24} sm={20} md={18} lg={16} xl={14} xxl={12}> */}
            <Col >
              <p className="done-text">
                В ближайшее время с вами свяжется менеджер для подтверждения
                бронирования.
              </p>
            </Col>
          </Row>
        </Row>

        <Row justify="center">
          <NextButton onClick={onNextClick} isActive={true}>
            Жду встречи!
          </NextButton>
        </Row>
      </Space>
    </Row>
  );
};
