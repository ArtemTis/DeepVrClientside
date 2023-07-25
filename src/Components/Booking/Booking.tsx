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
import { Outlet } from "react-router";
import TypeGameSelect from "./Stages/GamesTypeSelect";
import { Button } from "antd";
import { Config } from "./Stages/Config";
import { Link } from "react-router-dom";
import { BOOKING_PATH } from "../../Utils/routeConstants";

export const Booking: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const isFinished = useAppSelector(selectIsFinished);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return function checkState() {
      if (isFinished) {
        dispatch(setStep(0));
        dispatch(clearState());
      }
    };
  }, [dispatch, isFinished]);


  console.log(currentStep);
  

  const booking = useAppSelector(state => state.bookingReducer);

  const isFinish = useCallback(()=> {
    
    return Config[currentStep].isFinished(booking)
  },[booking])

  return (
    <DefaultLayout>
      <div className="booking-wrapper">
        {/* <CurrentPanel /> */}

        <Outlet />


        {
          currentStep > 0 &&
          <Button onClick={()=> dispatch(decreaseStep())}>Назад</Button>
        }
        <Link to={`${BOOKING_PATH}/${Config[currentStep].path}`}  onClick={()=> dispatch(increaseStep())}>Далее</Link>
        {/* disabled={!isFinish()} */}
      </div>
    </DefaultLayout>
  );
};
