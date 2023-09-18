import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch } from "../../../../app/store";
import { FormError } from "../../../../lib/ui/FormFields/FormError";
import "../../../profile-feature/presentation/pages/AccountStyles.css";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ILoginForm } from "../../../../lib/utils/types";
import { ReqStatus } from "../../../../lib/utils/enums";
import { REGISTER_PATH } from "../../../../lib/utils/routeConstants";
import { LoadWrapper } from "../../../../lib/ui/LoadWrapper";


export const Login = () => {
  const {
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onTouched",
  });


  let textError = useSelector((state: RootState) => state.authReducer.textError) === 'Rejected' ? 'Ошибка авторизации' : '';

  const isLoading = useSelector((state: RootState) => state.authReducer.reqStatus === ReqStatus.pending);

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
  }, []);

  return (
    <Row justify="center">
      <LoginContainer>
        <div className="login-title">Вход</div>
        <form className="login-form">
          <Row justify="center" gutter={[10, 10]}>
            <Col span={24} className="login-variants-header">
              Данные для входа
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
      </LoginContainer>
    </Row>
  );
};


const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 20px;

  /* next-btn-inactive */
  button{
    margin: 20px 0;
  }

  .login-title{
    margin: 40px 0 20px;
  }

  @media screen and (max-width: 400px) {
    margin-bottom: -50px;
    }
`