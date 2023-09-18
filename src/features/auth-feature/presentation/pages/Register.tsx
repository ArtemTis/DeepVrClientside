import { Row } from "antd";
import { useForm } from "react-hook-form";
import userIcon from "../../../../assets/user-icon-liliac.svg";
import "../../../profile-feature/presentation/pages/AccountStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../../../app/store";
import { ReqStatus } from "../../../../lib/utils/enums";
import { FormField } from "../../../../lib/ui/FormFields/FormField";
import { EmailField } from "../../../../lib/ui/FormFields/EmailField";
import { PassField } from "../../../../lib/ui/FormFields/PassField";
import { FormError } from "../../../../lib/ui/FormFields/FormError";
import { PhoneInput } from "../../../../lib/ui/FormFields/PhoneField";
import { NextButton } from "../../../../lib/ui/NextButton";
import { register } from "../../store/asyncActions";
import { LoadWrapper } from "../../../../lib/ui/LoadWrapper";


export const Register = () => {
  const {
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      phone: "",
      password: "",
      "password-repeat": "",
      email: "",
    },
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const textError = useSelector((state: RootState) => state.authReducer.textError);
  const isLoading = useSelector((state: RootState) => state.authReducer.reqStatus === ReqStatus.pending)


  return (
    <Row justify="center">
      <RegisterContainer>
        <div className="login-title">Регистрация</div>
        <form className="login-form">
          <FormField
            control={control}
            icon={userIcon}
            name="name"
            type="text"
            required="Введите ваше имя"
            placeholder="Имя"
            autocomplete="name"
          />
          <PhoneInput
            control={control}
            error={errors.phone}
            autocomplete="username"
            required
          />
          <EmailField
            control={control}
            error={errors.email}
            autocomplete="email"
            required
          />
          <PassField
            control={control}
            name="password"
            error={errors.password}
            autocomplete="current-password"
          />
          <PassField
            control={control}
            name="password-repeat"
            error={errors["password-repeat"]}
            placeholder="Повторите пароль"
            requred="Введите подтверждение пароля"
            validate={{
              matchPass: (value) =>
                value === getValues().password || "Пароли должны совпадать",
            }}
            autocomplete="new-password"
          />
        </form>
        <FormError errorMsg={textError} />
        <NextButton onClick={() => dispatch(register(getValues()))} isActive={isValid}>
          Зарегистрироваться
        </NextButton>
        <div className="login-description">
          У меня уже есть аккаунт.{" "}
          <label onClick={() => navigate(-1)} className="login-description-link">Войти.</label>

        </div>
        <LoadWrapper isLoading={isLoading} height={1} />
      </RegisterContainer>
    </Row>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 35vw;

  /* next-btn-inactive */
  button{
    margin: 20px 0;
  }

  .login-title{
    margin: 40px 0 20px;
  }

  @media screen and (max-width: 400px) {
    margin-bottom: -60px;
  }
`