import {
  clearState,
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
import { useEffect } from "react";
import { Outlet } from "react-router";
import TypeGameSelect from "./Stages/GamesTypeSelect";

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

  const CurrentPanel = () => {
    switch (currentStep) {
      case 0:
        return <CitySelect />;
      case 1:
        return <TypeGameSelect />;
      case 2:
        return <GameSelect />;
      case 3:
        return <PlayersCountSelect />;
      case 4:
        return <DateSelect />;
      case 5:
        return <TimeSelect />;
      case 6:
        return <CredentialsForm />;
      case 7:
        return <ConfirmBooking />;
      case 8:
        return <Done />;
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <div className="booking-wrapper">
        {/* <CurrentPanel /> */}

        <Outlet/>

      </div>
    </DefaultLayout>
  );
};
