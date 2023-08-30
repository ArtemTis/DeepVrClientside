import { DefaultLayout } from "../../../../core/DefaultLayout";
import { useAppSelector } from "../../../../app/store";
import { selectIsAuthorised } from "../../Utils/redux/auth/selectors";
import { Profile } from "./Profile";

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
