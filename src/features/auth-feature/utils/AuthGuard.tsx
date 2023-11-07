import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../../app/store";
import { selectIsAuthorised } from "../store/selectors";
import { LOGIN_PATH } from "../../../lib/utils/routeConstants";

interface AuthGuardProps {
    element: React.ReactElement
}

export const AuthGuard: React.FC<AuthGuardProps> = ({element}) => {
    const isAuthorised = useAppSelector(selectIsAuthorised);
    const location = useLocation();

    
    console.log("AuthGuard location = ", location);
    

    return isAuthorised ? element : <Navigate to={LOGIN_PATH} replace/>

}