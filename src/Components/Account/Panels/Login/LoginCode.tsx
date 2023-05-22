import { PhoneInput } from '../../../Common/FormFields/PhoneField'
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';
import { FormField } from '../../../Common/FormFields/FormField';
import passIcon from "../../../../Assets/passIcon.svg";
import { useState } from 'react';
import { Api } from '../../../../Utils/api';
import { NextButton } from '../../../Common/Markup/NextButton';
import { useAppDispatch, useAppSelector } from '../../../../Utils/redux/store';
import { singInCode } from '../../../../Utils/redux/auth/asyncActions';
import { useSelector } from 'react-redux';

const LoginCode = () => {

    const {
        control,
        getValues,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onTouched",
    });

    const dispatch = useAppDispatch();
    const codeStatus = useAppSelector(state => state.authReducer.codeStatus)

    // const [codeState, setCodeState] = useState<"send" | "auth">("send");
    // const [isLoading, setIsLoading] = useState(false);
    // const [reqError, setReqError] = useState<string>();


    // const sendCode = () => {
    //     if (codeState === 'send') {
    //         Api.loginSendCode({ phone: getValues().phone ?? "" })
    //             .then((res) => {
    //                 if (Api.checkStatus(res)) {
    //                     console.log(res);
    //                     if (res.data.error) {
    //                         setReqError(res.data.error_text);
    //                     } else {
    //                         setCodeState('auth');
    //                     }
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 if (err.response.status >= 500)
    //                     setReqError("Ошибка сервера, попробуйте позже");
    //             })
    //             .finally(() => setIsLoading(false));
    //     }
    // }


    return (
        <>
            <PhoneInput
                control={control}
                error={errors.phone}
                autocomplete="username"
                unregister
                required
            />
            {codeStatus === "auth" && (
                <FormField
                    type="text"
                    name="code"
                    control={control}
                    icon={passIcon}
                    required="Введите код авторизации"
                    unregister
                    error={errors.code}
                    placeholder='Код авторизации'
                />)
            }
            <NextButton isActive={isValid} onClick={() => dispatch(singInCode( getValues().phone ?? ""))}>
                Войти
            </NextButton>
        </>
    )
}

export default LoginCode