import { DefaultLayout } from "../Layout/DefaultLayout";
import { useAppSelector } from "../../Utils/redux/store";
import { selectIsAuthorised } from "../../Utils/redux/auth/selectors";
import { Profile } from "./Panels/Profile";

import { Navigate, Outlet} from "react-router";

import "./AccountStyles.css";

export const Account: React.FC = () => {
  const isAuthorised = useAppSelector(selectIsAuthorised);

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
