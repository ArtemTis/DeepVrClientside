import { useState } from "react";
import { createHashRouter, RouterProvider, } from "react-router-dom";
import { Login } from "../Panels/Login";

import {
    SINGIN_TEL_PATH,
    SINGIN_EMAIL_PATH,
    SINGIN_CODE_PATH,
    ACCOUNT_PATH
} from "../../../Utils/routeConstants";


const [loginForm, setLoginForm] = useState<"login" | "register">("login");

const onRegClick = () => {
    setLoginForm("register");
};
const onLoginClick = () => {
    setLoginForm("login");
};

const router = createHashRouter([
    {
        path: ACCOUNT_PATH,
        element: <Login onRegisterClick={onRegClick} />,
        children: [
            {
                path: SINGIN_TEL_PATH,
                element: <Login onRegisterClick={onRegClick} />,
            },
            {
                path: SINGIN_EMAIL_PATH,
                element: <Login onRegisterClick={onRegClick} />,
            },
            {
                path: SINGIN_CODE_PATH,
                element: <Login onRegisterClick={onRegClick} />,
            },
        ],
    },
]);
