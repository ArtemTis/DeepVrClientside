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
    if (selected) {
      dispatch(setSelectedCity(selected));
      dispatch(setCity(selected));
    }
    setIsModalOpen(false);
  };
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!!isSelectedCity ? false : true);

  // const handleCancel = () => {
  //   // setIsModalOpen(false);
  // };<img src={close} alt="close"/>

  return (
    <StyledModal open={isModalOpen} footer={[]} closeIcon={<></>}>

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
  min-width: 280px;

  img{
    cursor: default !important;
  }

  .ant-modal-close{
    cursor: default !important;
  }

`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`