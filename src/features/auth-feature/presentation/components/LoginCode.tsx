import { PhoneInput } from '../../../../lib/ui/FormFields/PhoneField'
import { useForm } from 'react-hook-form';
import { FormField } from '../../../../lib/ui/FormFields/FormField';
import passIcon from "../../../../assets/passIcon.svg";
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { singInCode } from '../../store/asyncActions';
import { ILoginForm } from '../../../../lib/utils/types';
import { NextButton } from '../../../../lib/ui/NextButton';

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