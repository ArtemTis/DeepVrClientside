import { Col, Row } from "antd";
import { FixedPanel } from "../../../../../Components/Booking/Components/FixedPanel";
import { NextButton } from "../../Common/Markup/NextButton";
import { Title } from "../../../../../Components/Booking/Components/Title";
import { useEffect, useState } from "react";
import { ICity } from "../../../Utils/types";
import { Api } from "../../../../../lib/utils/api";
import { CityCard } from "../../../../../Components/Booking/Components/CityCard";
import { RootState, useAppDispatch, useAppSelector } from "../../../../../app/store";
import {
  increaseStep,
  setCity,
} from "../../../Utils/redux/booking/slice";
import { selectCity} from "../../../Utils/redux/booking/selectors";
import { selectSelectedCity } from "../../../Utils/redux/auth/selectors";
import { setSelectedCity } from "../../../Utils/redux/auth/slice";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../BookingStyles.css";
import { useSelector } from "react-redux";
import { ReqStatus } from "../../../Utils/enums";
import { selectAllCities } from "../../../Utils/redux/profile/selectors";

export const CitySelect: React.FC = () => {
  const selectedCityProfile = useAppSelector(selectSelectedCity) as ICity;
  const selectedCity = (useAppSelector(selectCity) as ICity) ?? selectedCityProfile;
  const [selected, setSelected] = useState<ICity>();

  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.authReducer.reqStatus === ReqStatus.pending); 

  const cities = useAppSelector(selectAllCities);

  const getCity = (city: ICity) => {
    setSelected(city);
  };

  const onNextClick = () => {
    if (selected) {
      dispatch(setCity(selected));
      if (!selectedCityProfile) dispatch(setSelectedCity(selected));
      dispatch(increaseStep());
    }
  };

  return (
    <>
      <div className="booking-viewport">
        <Title fontSize={32}>Адреса</Title>

        <LoadWrapper isLoading={isLoading}>
          <Row justify="start" gutter={[20, 20]}>
            {cities?.map((city) => (
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={8}
                xxl={8}
                key={city.code}
              >
                <CityCard
                  city={city}
                  onClick={getCity}
                  isSelected={selected?.code === city.code}
                />
              </Col>
            ))}
          </Row>
        </LoadWrapper>
      </div>
      <FixedPanel>
        <Col xs={24} sm={20} md={18} lg={16} xl={14} xxl={12}>
          <NextButton onClick={onNextClick} isActive={!!selected}>
            Выбрать
          </NextButton>
        </Col>
      </FixedPanel>
    </>
  );
};
