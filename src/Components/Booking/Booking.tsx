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


  console.log(currentStep);


  const booking = useAppSelector(state => state.bookingReducer);

  const isFinish = useCallback(() => {

    return Config[currentStep].isFinished(booking)
  }, [booking])

  return (
    <DefaultLayout>
      <div className="booking-wrapper">


        <LoaderGipno innerText={"stepper"} type={"circle"}
          fontSize={20} value={currentStep} maxValue={Config.length} width={100}
          height={8} colorStops={[{ color: '#30A5D1', percent: 100 },]}
          label={<Title fontSize={46}>{Config[currentStep].title}</Title>}
          labelPosition="right"
        />


        <Outlet />


        {
          currentStep > 1 &&
          <Button onClick={() => navigate(`${currentStep - 1}`)}>Назад</Button>
        }
        <Button disabled={!isFinish()} onClick={() => navigate(`${currentStep + 1}`)}>Далее</Button>


        <Footer className="app-footer">
          <FooterMenu />
        </Footer>
      </div>
    </DefaultLayout>
  );
};
