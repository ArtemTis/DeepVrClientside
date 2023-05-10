import React from "react";
import { Navigate } from "react-router";
import { getIsAuthorised } from "../redux/authSlice";
import { useAppSelector } from "../redux/store";
import { LOGIN_PATH } from "../routeConstants";

interface AuthGuardProps {
    element: React.ReactElement
}

export const AuthGuard: React.FC<AuthGuardProps> = ({element}) => {
    const isAuthorised = useAppSelector(getIsAuthorised);

    return isAuthorised ? element : <Navigate to={LOGIN_PATH} replace/>

}