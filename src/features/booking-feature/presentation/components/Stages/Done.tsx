import { Col, Row, Space } from "antd";
import { useAppDispatch } from "../../../../../app/store";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import "../../pages/BookingStyles.css";

import doneImg from "../../../../../assets/mirage-done.png";
import styled from "styled-components";
import { Title } from "../Title";
import { NextButton } from "../../../../../lib/ui/NextButton";

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
