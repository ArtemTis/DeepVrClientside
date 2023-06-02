import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../Utils/api";
import { RootState, useAppDispatch } from "../../../Utils/redux/store";
import { ColLg } from "../../Common/Markup/ColLg";
import { FormError } from "../../Common/FormFields/FormError";
import { NextButton } from "../../Common/Markup/NextButton";
import { PassField } from "../../Common/FormFields/PassField";
import { PhoneInput } from "../../Common/FormFields/PhoneField";
import { EmailField } from "../../Common/FormFields/EmailField";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";
import { FormField } from "../../Common/FormFields/FormField";
import { ILoginForm } from "../../../Utils/types";

import "../AccountStyles.css";

import passIcon from "../../../Assets/passIcon.svg";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { REGISTER_PATH } from "../../../Utils/routeConstants";
import { useSelector } from "react-redux";

enum reqStatus {
  pending,
  fulfield,
  rejected
}

export const Login = () => {
  const {
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onTouched",
  });

  const textError = useSelector((state: RootState) => state.authReducer.textError);
  const isLoading = useSelector((state: RootState) => state.authReducer.reqStatus === reqStatus.pending);
  
  //get last route name for change active tab
  let location = useLocation();
  let prevPath = location.pathname.split('/').splice(-1)[0];

  const [loginVariant, setLoginVariant] = useState<"tel" | "email" | "code">(
    "tel"
  );

  const changeVariant = (variant: "tel" | "email" | "code") => {
    if (loginVariant !== variant) setLoginVariant(variant)
  };


  useEffect(() => {
    changeVariant("tel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row justify="center">
      <ColLg className="login-container">
        <div className="login-title">Вход</div>
        <form className="login-form">
          <Row justify="center" gutter={[10, 10]}>
            <Col span={24} className="login-variants-header">
              Войти с помощью:
            </Col>
            <Col span={8}>
              <Link
                to={"tel"}
                className={`login-variant${prevPath === "tel" ? " login-variant-selected" : ""
                  }`}
                onClick={() => changeVariant("tel")}
              >
                Номер телефона
              </Link>
            </Col>
            <Col span={8}>
              <Link
                to={"email"}
                className={`login-variant${prevPath === "email" ? " login-variant-selected" : ""
                  }`}
                onClick={() => changeVariant("email")}
              >
                E-Mail
              </Link>
            </Col>
            <Col span={8}>
              <Link
                to={"code"}
                className={`login-variant${prevPath === "code" ? " login-variant-selected" : ""
                  }`}
                onClick={() => changeVariant("code")}
              >
                Код на номер телефона
              </Link>
            </Col>
          </Row>


          <FormError errorMsg={textError} />


          <Outlet />

          <LoadWrapper isLoading={isLoading} height={1} />
        </form>
        <div className="login-description">
          У меня еще нет аккаунта, хочу{" "}
          <Link to={`../${REGISTER_PATH}`} className="login-description-link">зарегистрироваться.</Link>
        </div>
      </ColLg>
    </Row>
  );
};
