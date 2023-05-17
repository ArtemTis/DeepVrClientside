import { PhoneInput } from '../../../Common/FormFields/PhoneField'
import { PassField } from '../../../Common/FormFields/PassField'
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';
import { NextButton } from '../../../Common/Markup/NextButton';
import { useState } from 'react';
import { Api } from '../../../../Utils/api';
import { useAppDispatch } from '../../../../Utils/redux/store';
import { setToken, setUser } from '../../../../Utils/redux/authSlice';

const LoginTel = () => {

    const {
        control,
        getValues,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onTouched",
    });

    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [reqError, setReqError] = useState<string>();

    const onLoginClick = () => {
        setReqError("");
        setIsLoading(true);
        

        Api.login(getValues())
            .then((res) => {
                console.log(res);
                if (Api.checkStatus(res)) {
                    if (!!res.data && !res.data.error) {
                        dispatch(setToken(res.data.token));
                        dispatch(setUser(res.data.user));
                    } else {
                        setReqError(
                            (res.data.error_text as string) ?? "Ошибка авторизации"
                        );
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                if (!!err.data?.error) {
                    setReqError(err.data.error_text);
                } else if (err.response.status >= 500)
                    setReqError("Ошибка сервера, попробуйте позже");
            })
            .finally(() => setIsLoading(false));

    };

    return (
        <>
            <PhoneInput
                control={control}
                error={errors.phone}
                autocomplete="username"
                unregister
                required
            />
            <PassField
                control={control}
                name="password"
                error={errors.password}
                autocomplete="current-password"
                unregister
            />
            <NextButton isActive={isValid} onClick={onLoginClick}>
                Войти
            </NextButton>
        </>
    )
}

export default LoginTel