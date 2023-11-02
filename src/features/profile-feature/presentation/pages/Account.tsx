import { DefaultLayout } from "../../../../core/DefaultLayout";
import { useAppSelector } from "../../../../app/store";
import { Profile } from "./Profile";

import { Navigate, Outlet} from "react-router";

import "./AccountStyles.css";
import { selectIsAuthorised } from "../../../auth-feature/store/selectors";
import ProfileLayout from "./ProfileLayout";

export const Account: React.FC = () => {
  const isAuthorised = useAppSelector(selectIsAuthorised);

  return (
    <DefaultLayout>
      {
        isAuthorised
          // ? <Profile />
          ? <ProfileLayout />
          : <Outlet/>
      }
    </DefaultLayout>
  )
};
