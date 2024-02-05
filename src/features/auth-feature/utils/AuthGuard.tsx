import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../../app/store";
import { selectIsAuthorised } from "../store/selectors";
import { LOGIN_PATH } from "../../../lib/utils/routeConstants";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice";

interface AuthGuardProps {
    element: React.ReactElement
}

export const AuthGuard: React.FC<AuthGuardProps> = ({element}) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    console.log(cookies.user);

    const isAuthorised = useAppSelector(selectIsAuthorised) || !!cookies.user;
    const location = useLocation();

    const dispatch = useDispatch();
    dispatch(setUser(cookies.user))
    
    console.log("AuthGuard location = ", location);
    

    return isAuthorised ? element : <Navigate to={LOGIN_PATH} replace/>

}