import { Navigate, Route, Routes, useLocation } from "react-router";
import { router } from "./Utils/router";

import { NotFound } from "./core/404";
import { Account } from "./features/profile-feature/presentation/pages/Account";
import { Achievements } from "./features/achievements-feature/presentation/pages/Achievements";
import { Booking } from "./features/booking-feature/presentation/pages/Booking";
import { Games } from "./features/games-feature/presentation/pages/Games";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_CONFIRM_PATH,
  BOOKING_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  SELECT_CITY_PATH,
  SINGIN_CODE_PATH,
  SINGIN_EMAIL_PATH,
  SINGIN_TEL_PATH,
  STORIES_PATH,
} from "./Utils/routeConstants";
import { Register } from "./Components/Account/Panels/Register";
import LoginCode from "./features/auth-feature/presentation/components/LoginCode";
import LoginEmail from "./Components/Account/Panels/Login/LoginEmail";
import LoginTel from "./Components/Account/Panels/Login/LoginTel";
import { Login } from "./features/auth-feature/presentation/pages/Login";
import { Profile } from "./features/profile-feature/presentation/pages/Profile";
import { AuthGuard } from "./features/auth-feature/utils/AuthGuard";
import { CitySelect } from "./features/booking-feature/presentation/components/Stages/CitySelect.";
import { GameSelect } from "./features/booking-feature/presentation/components/Stages/GameSelect";
import { PlayersCountSelect } from "./features/booking-feature/presentation/components/Stages/PlayersCountSelect";
import { DateSelect } from "./features/booking-feature/presentation/components/Stages/DateSelect";
import { TimeSelect } from "./features/booking-feature/presentation/components/Stages/TimeSelect";
import { CredentialsForm } from "./features/booking-feature/presentation/components/Stages/CredentialsForm";
import { ConfirmBooking } from "./features/booking-feature/presentation/components/Stages/ConfirmBooking";
import { Done } from "./features/booking-feature/presentation/components/Stages/Done";
import TypeGameSelect from "./features/booking-feature/presentation/components/Stages/GamesTypeSelect";
import Story from "./feature/stories-feature/presentation/Story";

import "./App.css";
import BookingStep from "./Components/Booking/Components/BookingStep";
import { CitySelectHome } from "./features/games-feature/presentation/components/CitySelectHome";
import { Modal } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/store";
import { selectCity } from "./Utils/redux/booking/selectors";
import { setCity } from "./Utils/redux/booking/slice";

export const App = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <div className="App">
      <Routes location={previousLocation || location}>

        {/* <Route index element={<CityGuard element={<Navigate to={HOME_PATH} replace />} />} />
        <Route path={SELECT_CITY_PATH} element={<CityGuard element={<CitySelectHome />} />} /> */}
        {/* <Route path={SELECT_CITY_PATH} element={<CitySelectHome />} /> */}


        <Route path={HOME_PATH} element={<Games />} />
        <Route path={BOOKING_PATH} element={<Booking />} >
          {/* <Route index element={<AuthGuard element={<Navigate to={PROFILE_PATH} replace />} />} /> */}

          <Route index element={<BookingStep />} />
          <Route path={`${BOOKING_PATH}/:step`} element={<BookingStep />} />
          <Route path={BOOKING_CONFIRM_PATH} element={<ConfirmBooking />} />
        </Route>

        <Route path={ACHIVEMENTS_PATH} element={<Achievements />} />

        <Route path={ACCOUNT_PATH} element={<Account />}>
          <Route index element={<AuthGuard element={<Navigate to={PROFILE_PATH} replace />} />} />
          <Route path={LOGIN_PATH} element={<Login />} >
            <Route index element={<Navigate to={SINGIN_TEL_PATH} />} />
            <Route path={SINGIN_TEL_PATH} element={<LoginTel />} />
            <Route path={SINGIN_EMAIL_PATH} element={<LoginEmail />} />
            <Route path={SINGIN_CODE_PATH} element={<LoginCode />} />
          </Route>
          <Route path={PROFILE_PATH} element={<AuthGuard element={<Profile />} />} />
          <Route path={REGISTER_PATH} element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

      {previousLocation && (
        <Routes>
          <Route path={`${STORIES_PATH}/:id`} element={<Story location={previousLocation} />} />
        </Routes>
      )}

      <CitySelectHome />
    
    </div>
  );
}
