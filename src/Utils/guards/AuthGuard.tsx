import React from "react";
import { Navigate } from "react-router";
import { selectIsAuthorised } from "../redux/auth/selectors";
import { useAppSelector } from "../redux/store";
import { LOGIN_PATH } from "../routeConstants";

interface AuthGuardProps {
    element: React.ReactElement
}

export const AuthGuard: React.FC<AuthGuardProps> = ({element}) => {
    const isAuthorised = useAppSelector(selectIsAuthorised);

    return isAuthorised ? element : <Navigate to={LOGIN_PATH} replace/>

}