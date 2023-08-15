import {
  clearState,
  decreaseStep,
  increaseStep,
  setStep,
} from "../../Utils/redux/booking/slice";
import { selectCurrentStep, selectIsFinished } from "../../Utils/redux/booking/selectors";
import { useAppDispatch, useAppSelector } from "../../Utils/redux/store";
import "./BookingStyles.css";
import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import TypeGameSelect from "./Stages/GamesTypeSelect";
import { Button } from "antd";
import { Config } from "./Stages/Config";
import { Link } from "react-router-dom";
import { BOOKING_PATH } from "../../Utils/routeConstants";
import { LoaderGipno } from "../Stepper/loader-components";
import { Title } from "./Components/Title";
import styled from "styled-components";
import { DefaultLayout } from "../Layout/DefaultLayout";
import { Footer } from "antd/es/layout/layout";
import { FooterMenu } from "../Layout/Footer/FooterMenu";
import { NextButton } from "../Common/Markup/NextButton";

export const Booking: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const isFinished = useAppSelector(selectIsFinished);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return function checkState() {
      if (isFinished) {
        dispatch(setStep(1));
        dispatch(clearState());
      }
    };
  }, [dispatch, isFinished]);

  const booking = useAppSelector(state => state.bookingReducer);

  const isFinish = useCallback(() => {

    return Config[currentStep].isFinished(booking)
  }, [booking])

  const Label = () => {
    return (
      <div>
        <StyledCurrentStep>{Config[currentStep].title}</StyledCurrentStep>
        <StyledNextStep>Далее: {Config[currentStep + 1].title}</StyledNextStep>
      </div>
    )
  }


  return (
    <DefaultLayout>
      <div className="booking-wrapper">

        <StyledLoaderWrapper>

          <LoaderGipno innerText={"stepper"} type={"circle"}
            fontSize={20} value={currentStep} maxValue={Config.length - 1} width={100}
            height={8} colorStops={[{ color: '#30A5D1', percent: 100 },]}
            label={<Label />}
            labelPosition="right"
          />
        </StyledLoaderWrapper>


        <Outlet />

        <StyledWrapperButtons>
          {
            currentStep > 1 &&
            <StyledPrevButton onClick={() => navigate(`${currentStep - 1}`)}>Назад</StyledPrevButton>
          }
          <StyledNextButton isActive={isFinish()} onClick={() => navigate(`${currentStep + 1}`)}>Далее</StyledNextButton>
        </StyledWrapperButtons>

      </div>
    </DefaultLayout>
  );
};

const StyledLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 15vh;
`

const StyledNextButton = styled(NextButton)`
  border-radius: 30px;
  background: var(--linear, linear-gradient(163deg, #952EF1 0%, #17C5E7 100%));
`

const StyledPrevButton = styled(Button)`
  border-radius: 30px;
  background: #3A3A6B;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #FFFFFF;
  backdrop-filter: blur(9px);
  outline: none;
  border: 0;
  width: 20vw;

  height: 60px;
  padding: 16px 32px;

  :hover{
    color: #FFFFFF !important;
  }
`

const StyledWrapperButtons = styled.div`
  padding: 20px 12vw 0;
  display: flex;
  justify-content: space-around;

  cursor: pointer;
  border: none;
`

const StyledNextStep = styled.h3`
  color: #B2BBD2;
  text-align: right;
  font-family: SF Pro Display;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
`

const StyledCurrentStep = styled.h2`
  color: #FFF;
  text-align: right;
  font-family: SF Pro Display;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
  margin-bottom: 8px;
`