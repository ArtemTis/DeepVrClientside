import { Col, Modal, Row } from "antd";
import { useState } from "react";
import { Api } from "../../../../lib/utils/api";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import close from "../../../assets/close-cross.svg"

import "./GamesStyles.css";
import styled from "styled-components";
import { selectSelectedCity, selectToken } from "../../../auth-feature/store/selectors";
import { ICity } from "../../../../lib/utils/types";
import { selectCity } from "../../../booking-feature/store/selectors";
import { setSelectedCity } from "../../../auth-feature/store/slice";
import { setCity } from "../../../booking-feature/store/slice";
import { SelectCityList } from "../../../../lib/ui/SelectCityList";
import { NextButton } from "../../../../lib/ui/NextButton";
import CitySelectList from "./CitySelectList";

export const CitySelectHome: React.FC = () => {
  const isSelectedCity = !!useAppSelector(selectCity);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isSelectedCity ? false : true);

  return (
    <StyledModal open={isModalOpen} footer={[]} closeIcon={<></>}>
      <CitySelectList setIslOpen={setIsModalOpen} isSelectedCity={isSelectedCity}/>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  margin: 0 auto;
  width: 25vw !important;
  min-width: 280px;
  max-width: 350px;

  border-radius: 16px;
background: var(--101-a-29, #191A29);

  img{
    cursor: default !important;
  }

  .ant-modal-close{
    cursor: default !important;
  }


`

