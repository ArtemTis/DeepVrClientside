import { PhoneInput } from '../../../../lib/ui/FormFields/PhoneField'
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';
import { FormField } from '../../../../lib/ui/FormFields/FormField';
import passIcon from "../../../../Assets/passIcon.svg";
import { NextButton } from '../../../Common/Markup/NextButton';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { singInCode } from '../../store/asyncActions';

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