import { Navigate, Route, Routes, useLocation } from "react-router";
import { router } from "./Utils/router";

import { NotFound } from "./Components/404";
import { Account } from "./Components/Account/Account";
import { Achievements } from "./Components/Achievements/Achievements";
import { Booking } from "./Components/Booking/Booking";
import { Games } from "./Components/Games/Games";
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
  STORIES_PATH,
} from "./Utils/routeConstants";
import { Register } from "./Components/Account/Panels/Register";
import LoginCode from "./Components/Account/Panels/Login/LoginCode";
import LoginEmail from "./Components/Account/Panels/Login/LoginEmail";
import LoginTel from "./Components/Account/Panels/Login/LoginTel";
import { Login } from "./Components/Account/Panels/Login";
import { Profile } from "./Components/Account/Panels/Profile";
import { AuthGuard } from "./Utils/guards/AuthGuard";
import { CitySelect } from "./Components/Booking/Stages/CitySelect.";
import { GameSelect } from "./Components/Booking/Stages/GameSelect";
import { PlayersCountSelect } from "./Components/Booking/Stages/PlayersCountSelect";
import { DateSelect } from "./Components/Booking/Stages/DateSelect";
import { TimeSelect } from "./Components/Booking/Stages/TimeSelect";
import { CredentialsForm } from "./Components/Booking/Stages/CredentialsForm";
import { ConfirmBooking } from "./Components/Booking/Stages/ConfirmBooking";
import { Done } from "./Components/Booking/Stages/Done";
import TypeGameSelect from "./Components/Booking/Stages/GamesTypeSelect";
import Story from "./feature/stories-feature/presentation/Story";

import "./App.css";
import BookingStep from "./Components/Booking/Components/BookingStep";

export const App = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <div className="App">
      <Routes location={previousLocation || location}>

        <Route path={HOME_PATH} element={<Games />} />
        <Route path={BOOKING_PATH} element={<Booking />} >
        {/* <Route index element={<AuthGuard element={<Navigate to={PROFILE_PATH} replace />} />} /> */}

        <Route index element={<BookingStep/>} />
        <Route path={`${BOOKING_PATH}/:step`} element={<BookingStep/>} />
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
          <Route path={`${STORIES_PATH}/:id`} element={<Story location={previousLocation}/>} />
        </Routes>
      )}
    </div>
  );
}
