import {
  clearState,
  decreaseStep,
  increaseStep,
  setStep,
} from "../../Utils/redux/booking/slice";
import { selectCurrentStep, selectIsFinished } from "../../Utils/redux/booking/selectors";
import { useAppDispatch, useAppSelector } from "../../Utils/redux/store";
import { DefaultLayout } from "../Layout/DefaultLayout";
import { CitySelect } from "./Stages/CitySelect.";
import { ConfirmBooking } from "./Stages/ConfirmBooking";
import { CredentialsForm } from "./Stages/CredentialsForm";
import { DateSelect } from "./Stages/DateSelect";
import { Done } from "./Stages/Done";
import { GameSelect } from "./Stages/GameSelect";
import { PlayersCountSelect } from "./Stages/PlayersCountSelect";
import { TimeSelect } from "./Stages/TimeSelect";

import "./BookingStyles.css";
import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import TypeGameSelect from "./Stages/GamesTypeSelect";
import { Button } from "antd";
import { Config } from "./Stages/Config";
import { Link } from "react-router-dom";
import { BOOKING_PATH } from "../../Utils/routeConstants";
import { LoaderGipno } from "../Stepper/loader-components";

export const Booking: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const isFinished = useAppSelector(selectIsFinished);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return function checkState() {
      if (isFinished) {
        dispatch(setStep(0));
        dispatch(clearState());
      }
    };
  }, [dispatch, isFinished]);


  console.log(currentStep);


  const nextStep = () => {
    navigate(`${currentStep + 1}`)
  }

  const booking = useAppSelector(state => state.bookingReducer);

  const isFinish = useCallback(() => {

    return Config[currentStep].isFinished(booking)
  }, [booking])

  return (
    <DefaultLayout>
      <div className="booking-wrapper">
        {/* <CurrentPanel /> */}



        <LoaderGipno innerText={"stepper"} labelPosition={"left"} type={"circle"} 
          fontSize={20} value={currentStep} maxValue={6} width={100}
          height={8} colorStops={[{ color: '#30A5D1', percent: 100 },]} 
        />




        <Outlet />


        {
          currentStep > 0 &&
          <Button onClick={() => navigate(`${currentStep - 1}`)}>Назад</Button>
        }
        <Button disabled={!isFinish()} onClick={() => nextStep()}>Далее</Button>

      </div>
    </DefaultLayout>
  );
};
