import { Col, Modal, Row } from "antd";
import { useState } from "react";
import { Api } from "../../../Utils/api";
import {
  selectSelectedCity,
  selectToken
} from "../../../Utils/redux/auth/selectors";
import { setSelectedCity } from "../../../Utils/redux/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { ICity } from "../../../Utils/types";
import { ColLg } from "../../Common/Markup/ColLg";
import { NextButton } from "../../Common/Markup/NextButton";
import { SelectCityList } from "../../Common/Markup/SelectCityList";
import close from "../../../Assets/close-cross.svg"

import "../GamesStyles.css";
import ThumbnailsContainer from "../../../feature/stories-feature/presentation/ThumbnailsContainer";
import styled from "styled-components";
import { selectCity } from "../../../Utils/redux/booking/selectors";

export const CitySelectHome: React.FC = () => {
  const selectedCityProfile = useAppSelector(selectSelectedCity) as ICity;
  const isSelectedCity = useAppSelector(selectCity);

  const [selected, setSelected] = useState<ICity | undefined>(
    selectedCityProfile ?? isSelectedCity ?? undefined
  );
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const onSelect = (city: ICity | undefined) => {
    setSelected(city);

    if (!!token)
      Api.setUserCity({ token, city: city?.name ?? "" }).catch((err) =>
        console.log(err)
      );
  };

  const confirmm = () => {
    if (selected) dispatch(setSelectedCity(selected));
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(!!isSelectedCity ? false : true);

  // const handleCancel = () => {
  //   // setIsModalOpen(false);
  // };<img src={close} alt="close"/>

  return (
    <StyledModal open={isModalOpen} footer={[]} closeIcon={<img src={close} alt="close"/>}>

      <ModalWrapper>
        <SelectCityList selected={selected} onSelect={onSelect} />
        <NextButton onClick={confirmm} isActive={!!selected}>
          Выбрать
        </NextButton>
      </ModalWrapper>

    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  margin: 0 auto;
  width: 25vw !important;

  img{
    cursor: default !important;
  }
`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`