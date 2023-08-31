import { createBrowserRouter, createRoutesFromElements, Location, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_CONFIRM_PATH,
  BOOKING_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  SINGIN_CODE_PATH,
  SINGIN_EMAIL_PATH,
  SINGIN_TEL_PATH,
} from "./routeConstants";
import { Games } from "../../features/games-feature/presentation/pages/Games";
import { Booking } from "../../features/booking-feature/presentation/pages/Booking";
import BookingStep from "../../features/booking-feature/presentation/components/BookingStep";
import { ConfirmBooking } from "../../features/booking-feature/presentation/components/Stages/ConfirmBooking";
import { Achievements } from "../../features/achievements-feature/presentation/pages/Achievements";
import { Account } from "../../features/profile-feature/presentation/pages/Account";
import { AuthGuard } from "../../features/auth-feature/utils/AuthGuard";
import { Login } from "../../features/auth-feature/presentation/pages/Login";
import LoginTel from "../../features/auth-feature/presentation/components/LoginTel";
import LoginEmail from "../../features/auth-feature/presentation/components/LoginEmail";
import LoginCode from "../../features/auth-feature/presentation/components/LoginCode";
import { Profile } from "../../features/profile-feature/presentation/pages/Profile";
import { Register } from "../../features/auth-feature/presentation/pages/Register";
import { NotFound } from "../../core/404";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* <C buildChild={(loc) => ( */}
      {/* <Routes location={loc.state?.previousLocation || loc}> */}
      <Route path={HOME_PATH} element={<Games />} />
      
      {/* <Route path={`${STORIES_PATH}/:id`} element={<Story />} /> */}

      <Route path={BOOKING_PATH} element={<Booking />} >
        {/* <Route index element={<AuthGuard element={<Navigate to={PROFILE_PATH} replace />} />} /> */}

        <Route index element={<BookingStep/>} />
        <Route path={`${BOOKING_PATH}/:step`} element={<BookingStep/>} />
        <Route path={BOOKING_CONFIRM_PATH} element={<ConfirmBooking />} />
        {/* <Route path={BOOKING_DONE_PATH} element={<Done />} /> */}
    
        {/* <Route index element={<Navigate to={BOOKING_ADDRESS_PATH} />} /> */}
        {/* <Route path={BOOKING_ADDRESS_PATH} element={<CitySelect />} />
        <Route path={BOOKING_TYPEGAME_PATH} element={<TypeGameSelect />} />
        <Route path={BOOKING_GAME_PATH} element={<GameSelect />} />
             <Route path={BOOKING_PLAYERS_PATH} element={<PlayersCountSelect />} />
        <Route path={BOOKING_DATE_PATH} element={<DateSelect />} />
        <Route path={BOOKING_TIME_PATH} element={<TimeSelect />} />
        <Route path={BOOKING_CREDITIALS_PATH} element={<CredentialsForm />} />
              <Route path={BOOKING_CONFIRM_PATH} element={<ConfirmBooking />} />
        <Route path={BOOKING_DONE_PATH} element={<Done />} /> */}
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

    {/* </Routes>
    )}/> */}
    </>
  ));