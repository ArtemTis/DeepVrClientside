import { DefaultLayout } from "../Layout/DefaultLayout";
import { useAppSelector } from "../../Utils/redux/store";
import { getIsAuthorised } from "../../Utils/redux/authSlice";
import { Profile } from "./Panels/Profile";

import { Navigate, Outlet} from "react-router";

import "./AccountStyles.css";

export const Account: React.FC = () => {
  const isAuthorised = useAppSelector(getIsAuthorised);

  return (
    <DefaultLayout>
      {
        isAuthorised
          ? <Profile />
          : <Outlet/>
      }
    </DefaultLayout>
  )
};
