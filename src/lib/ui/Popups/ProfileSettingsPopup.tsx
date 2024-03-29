import { PopupLayout } from "./PopupLayout";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useForm, useWatch } from "react-hook-form";
import { FormField } from "../FormFields/FormField";
import userIcon from "../../../assets/user-icon-liliac.svg";
import { EmailField } from "../FormFields/EmailField";
import { PhoneInput } from "../FormFields/PhoneField";
import { useEffect, useState } from "react";
import { PassField } from "../FormFields/PassField";
import { FormError } from "../FormFields/FormError";
import { Api } from "../../utils/api";
import { selectToken, selectUser } from "../../../features/auth-feature/store/selectors";
import { IChangePassForm, IEditProfileForm } from "../../utils/types";
import { setUser } from "../../../features/auth-feature/store/slice";
import { NextButton } from "../NextButton";
import { LoadWrapper } from "../LoadWrapper";
import "../../../features/profile-feature/presentation/pages/AccountStyles.css"

interface Props {
  onBackClick: () => void;
}

export const ProfileSettingsPopup: React.FC<Props> = ({ onBackClick }) => {
  const user = useAppSelector(selectUser);

  const {
    control: controlEdit,
    getValues: getValuesEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
  } = useForm<IEditProfileForm>({
    mode: "onTouched",
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: `8${user?.phone}`,
    },
  });

  const {
    control: controlPass,
    getValues: getValuesPass,
    formState: { errors: errorsPass, isValid: isValidPass },
  } = useForm<IChangePassForm>({
    mode: "onTouched",
  });

  const watchAllFields = useWatch({ control: controlEdit });

  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  // const values = getValuesEdit();
  let equalValues =
    (watchAllFields.email!! !== user?.email ||
      watchAllFields.name!! !== user.name ||
      watchAllFields.phone!! !== `8${user?.phone}`);

  const canUpdateProfile = isValidEdit && equalValues;

  const onSubmitEdit = () => {
    setIsLoadingEditProfile(true);
    setErrorEdit(undefined);
    if (canUpdateProfile) {
      // api call
      Api.editProfile({
        token,
        ...getValuesEdit(),
      })
        .then((res) => {
          if (Api.checkStatus(res)) {
            if (!res.data.error) {
              console.log(res.data);
              dispatch(setUser(res.data));
              onBackClick();
            } else {
              setErrorEdit(res.data.error_text);
            }
          }
        })
        .catch((err) => console.log(err));
      console.log("updating profile");
      setIsLoadingEditProfile(false);
    }
  };

  const onSubmitPass = () => {
    setIsLoadingChangePass(true);
    setErrorPass(undefined);
    if (isValidPass) {
      Api.changePass({ ...getValuesPass(), token })
        .then((res) => {
          console.log(res);
          if (!!res.data.eror) {
            setErrorPass(res.data.error_message);
          } else {
            onBackClick();
          }
        })
        .catch((err) => console.log(err));
      console.log("updating pass");
      setIsLoadingChangePass(false);
    }
  };

  const [errorEdit, setErrorEdit] = useState<string | undefined>();
  const [errorPass, setErrorPass] = useState<string | undefined>();

  const [isLoadingEditProfile, setIsLoadingEditProfile] = useState(false);
  const [isLoadingChangePass, setIsLoadingChangePass] = useState(false);

  return (
    <PopupLayout title="Настройки профиля" onBackClick={onBackClick}>
      <div className="profile-settings-forms-wrapper">
        <form className="login-form">
          <FormField
            control={controlEdit}
            error={errorsEdit.name}
            type="text"
            icon={userIcon}
            name="name"
            autocomplete="name"
            required="Введите ваше имя"
            minLength={{
              value: 2,
              message: "Имя должно содержать не меньше 2 символов",
            }}
          />
          <EmailField
            control={controlEdit}
            error={errorsEdit.email}
            autocomplete="email"
            required
          />
          <PhoneInput
            control={controlEdit}
            error={errorsEdit.phone}
            autocomplete="tel"
            required
          />

          <FormError errorMsg={errorEdit} />
          <NextButton isActive={canUpdateProfile} onClick={onSubmitEdit}>
            Изменить профиль
          </NextButton>
          <LoadWrapper isLoading={isLoadingEditProfile} height={1} />
        </form>
        <form className="login-form">
          <PassField
            name="password"
            control={controlPass}
            error={errorsPass.password}
            autocomplete="password"
            requred="Введите пароль"
            placeholder="Пароль"
          />
          <PassField
            name="newPassword"
            control={controlPass}
            error={errorsPass.newPassword}
            autocomplete="password-new"
            requred="Введите новый пароль"
            placeholder="Новый пароль"
            validate={{
              matchPass: (value) =>
                value !== getValuesPass().password ||
                "Новый и старый пароли не должны совпадать",
            }}
          />
          <PassField
            name="password-repeat"
            control={controlPass}
            error={errorsPass["password-repeat"]}
            autocomplete="password-new"
            placeholder="Подтверждение пароля"
            validate={{
              matchPass: (value) =>
                value === getValuesPass().newPassword ||
                "Пароли должны совпадать",
            }}
          />
          <FormError errorMsg={errorPass} />
          <NextButton isActive={isValidPass} onClick={onSubmitPass}>
            Изменить пароль
          </NextButton>
          <LoadWrapper isLoading={isLoadingChangePass} height={1} />
        </form>
      </div>
    </PopupLayout>
  );
};
