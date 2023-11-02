import { Navigate, Route, Routes, useLocation } from "react-router";
import { NotFound } from "./core/404";
import { Account } from "./features/profile-feature/presentation/pages/Account";
import { Achievements } from "./features/achievements-feature/presentation/pages/Achievements";
import { AchievementsTemporarily } from "./features/achievements-feature/presentation/pages/AchievementsTemporarily";
import { Booking } from "./features/booking-feature/presentation/pages/Booking";
import { Games } from "./features/games-feature/presentation/pages/Games";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_CONFIRM_PATH,
  BOOKING_PATH,
  GAMES_DETAILS_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_ABOUT_PATH,
  PROFILE_CITY_PATH,
  PROFILE_FEEDBACK_PATH,
  PROFILE_MAIN_PATH,
  PROFILE_ORDERS_PATH,
  PROFILE_PATH,
  PROFILE_SETTINGS_PATH,
  REGISTER_PATH,
  SINGIN_CODE_PATH,
  SINGIN_EMAIL_PATH,
  SINGIN_TEL_PATH,
  STORIES_PATH,
} from "./lib/utils/routeConstants";
import LoginCode from "./features/auth-feature/presentation/components/LoginCode";
import { Login } from "./features/auth-feature/presentation/pages/Login";
import { Profile } from "./features/profile-feature/presentation/pages/Profile";
import { AuthGuard } from "./features/auth-feature/utils/AuthGuard";
import { ConfirmBooking } from "./features/booking-feature/presentation/components/Stages/ConfirmBooking";

import "./App.css";
import { CitySelectHome } from "./features/games-feature/presentation/components/CitySelectHome";
import { Modal } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/store";
import BookingStep from "./features/booking-feature/presentation/components/BookingStep";
import LoginTel from "./features/auth-feature/presentation/components/LoginTel";
import LoginEmail from "./features/auth-feature/presentation/components/LoginEmail";
import { Register } from "./features/auth-feature/presentation/pages/Register";
import Story from "./features/stories-feature/presentation/Story";
import ModalContainer from "./features/games-details-feature/presentation/ModalContainer";
import { selectCurrentStep } from "./features/booking-feature/store/selectors";
import StepGuard from "./features/booking-feature/utils/StepGuard";
import { OrdersAllPopup } from "./lib/ui/Popups/OrdersAllPopup";
import { CitySelectPopup } from "./lib/ui/Popups/CitySelectPopup";
import { SettingsPopup } from "./lib/ui/Popups/SettingsPopup";
import { ProfileSettingsPopup } from "./lib/ui/Popups/ProfileSettingsPopup";
import ProfileLayout from "./features/profile-feature/presentation/pages/ProfileLayout";

export const App = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const currentStep = useAppSelector(selectCurrentStep);
  return (
    <div className="App">
      <Routes location={previousLocation || location}>

        {/* <Route index element={<CityGuard element={<Navigate to={HOME_PATH} replace />} />} />
        <Route path={SELECT_CITY_PATH} element={<CityGuard element={<CitySelectHome />} />} /> */}
        {/* <Route path={SELECT_CITY_PATH} element={<CitySelectHome />} /> */}


        <Route path={HOME_PATH} element={<Games />} />
        <Route path={BOOKING_PATH} element={<Booking />} >
          {/* <Route index element={<StepGuard element={<Navigate to={`${BOOKING_PATH}/:step`} replace />} />} /> */}
          {
            currentStep > 1 &&
            <Route index element={<Navigate to={`${BOOKING_PATH}/${currentStep}`} />} />
          }
          <Route index element={<BookingStep />} />
          {/* <Route path={`${BOOKING_PATH}/:step`} element={<StepGuard element={<BookingStep />}/> } /> */}
          <Route path={`${BOOKING_PATH}/:step`} element={<BookingStep />} />
          <Route path={BOOKING_CONFIRM_PATH} element={<ConfirmBooking />} />
        </Route>

        {/* <Route path={ACHIVEMENTS_PATH} element={<Achievements />} /> */}
        <Route path={ACHIVEMENTS_PATH} element={<AchievementsTemporarily />} />

        <Route path={ACCOUNT_PATH} element={<Account />}>
          <Route index element={<AuthGuard element={<Navigate to={PROFILE_MAIN_PATH} replace />} />} />

          <Route path={LOGIN_PATH} element={<Login />} >
            <Route index element={<Navigate to={SINGIN_TEL_PATH} />} />
            <Route path={SINGIN_TEL_PATH} element={<LoginTel />} />
            <Route path={SINGIN_EMAIL_PATH} element={<LoginEmail />} />
            <Route path={SINGIN_CODE_PATH} element={<LoginCode />} />
          </Route>

          <Route path={REGISTER_PATH} element={<Register />} />

          <Route path={PROFILE_PATH} element={<AuthGuard element={<ProfileLayout />} />} >
            <Route index element={<Navigate to={PROFILE_MAIN_PATH} replace />} />
            <Route path={PROFILE_MAIN_PATH} element={<Profile />} />

            <Route path={PROFILE_ORDERS_PATH} element={<AuthGuard element={<OrdersAllPopup />} />} />
            <Route path={PROFILE_SETTINGS_PATH} element={<AuthGuard element={<ProfileSettingsPopup />} />} />
            <Route path={PROFILE_CITY_PATH} element={<AuthGuard element={<CitySelectPopup />} />} />
            <Route path={PROFILE_ABOUT_PATH} element={<AuthGuard element={<Profile />} />} />
            <Route path={PROFILE_FEEDBACK_PATH} element={<AuthGuard element={<Profile />} />} />

          </Route>

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

      {previousLocation && (
        <Routes>
          <Route path={`${GAMES_DETAILS_PATH}/:id`} element={<ModalContainer location={previousLocation} />} />
          <Route path={`${STORIES_PATH}/:id`} element={<Story location={previousLocation} />} />
        </Routes>
      )}

      <CitySelectHome />

    </div>
  );
}
