import { useState } from "react";
import { createHashRouter } from "react-router-dom";
import { Login } from "../Panels/Login";
import LoginTel from "../Panels/Login/LoginTel";
import LoginEmail from "../Panels/Login/LoginEmail";
import LoginCode from "../Panels/Login/LoginCode";

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

export const router = createHashRouter([
    {
        path: ACCOUNT_PATH,
        element: <Login onRegisterClick={onRegClick} />,
        children: [
            {
                path: SINGIN_TEL_PATH,
                element: <LoginTel />,
            },
            {
                path: SINGIN_EMAIL_PATH,
                element: <LoginEmail />,
            },
            {
                path: SINGIN_CODE_PATH,
                element: <LoginCode />,
            },
        ],
    },
]);
