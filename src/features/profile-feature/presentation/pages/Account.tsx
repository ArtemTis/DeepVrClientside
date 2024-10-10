import { DefaultLayout } from "../../../../core/DefaultLayout";
import { useAppSelector } from "../../../../app/store";
import { Profile } from "./Profile";

import { Navigate, Outlet, redirect, useNavigate } from "react-router";

import "./AccountStyles.css";
import { selectIsAuthorised } from "../../../auth-feature/store/selectors";
import ProfileLayout from "./ProfileLayout";
import { LOGIN_PATH, PROFILE_MAIN_PATH, PROFILE_PATH } from "../../../../lib/utils/routeConstants";
import { useEffect, useMemo } from "react";
import { AuthGuard } from "../../../auth-feature/utils/AuthGuard";

export const Account: React.FC = () => {
  const isAuthorised = useAppSelector(selectIsAuthorised);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorised) {
      navigate(PROFILE_PATH);
    }
    else{
      navigate(LOGIN_PATH);
    }
  },[isAuthorised])


  return (
    <DefaultLayout>
      <Outlet/>
    </DefaultLayout>
  )
};
