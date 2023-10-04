import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Api } from "../../../../../lib/utils/api";
import { RootState, useAppDispatch, useAppSelector } from "../../../../../app/store";

import "../BookingStyles.css";
import { useSelector } from "react-redux";
import { selectSelectedCity } from "../../../../auth-feature/store/selectors";
import { ICity } from "../../../../../lib/utils/types";
import { selectCity } from "../../../store/selectors";
import { ReqStatus } from "../../../../../lib/utils/enums";
import { selectAllCities } from "../../../../profile-feature/store/selectors";
import { increaseStep, setCity } from "../../../store/slice";
import { setSelectedCity } from "../../../../auth-feature/store/slice";
import { Title } from "../Title";
import { LoadWrapper } from "../../../../../lib/ui/LoadWrapper";
import { CityCard } from "../CityCard";
import { FixedPanel } from "../FixedPanel";
import { NextButton } from "../../../../../lib/ui/NextButton";

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
                key={city.id}
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
