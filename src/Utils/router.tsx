import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../Components/404";
import { Account } from "../Components/Account/Account";
import { Achievements } from "../Components/Achievements/Achievements";
import { Booking } from "../Components/Booking/Booking";
import { Games } from "../Components/Games/Games";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  SINGIN_CODE_PATH,
  SINGIN_EMAIL_PATH,
  SINGIN_TEL_PATH,
} from "./routeConstants";
import { Register } from "../Components/Account/Panels/Register";
import LoginCode from "../Components/Account/Panels/Login/LoginCode";
import LoginEmail from "../Components/Account/Panels/Login/LoginEmail";
import LoginTel from "../Components/Account/Panels/Login/LoginTel";
import { Login } from "../Components/Account/Panels/Login";
import { Profile } from "../Components/Account/Panels/Profile";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Games />,
  },
  {
    path: BOOKING_PATH,
    element: <Booking />,
  },
  {
    path: ACCOUNT_PATH,
    element: <Account />,
    children: [
      {
        path: PROFILE_PATH,
        element: <Profile />,
      },
      {
        path: REGISTER_PATH,
        element: <Register/>,
      },
      {
        path: LOGIN_PATH,
        element: <Login />,
        children: [
          {
            path: SINGIN_TEL_PATH,
            element: <LoginTel />,
          },
          {
            path: SINGIN_EMAIL_PATH,
            element: <LoginEmail />,
          },
          {
            path: SINGIN_CODE_PATH,
            element: <LoginCode />,
          },
        ],
      },
    ],
  },
  {
    path: ACHIVEMENTS_PATH,
    element: <Achievements />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
