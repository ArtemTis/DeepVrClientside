import { PhoneInput } from '../../../Common/FormFields/PhoneField'
import { PassField } from '../../../Common/FormFields/PassField'
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';
import { NextButton } from '../../../Common/Markup/NextButton';

const LoginTel = () => {

    const {
        control,
        getValues,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onTouched",
    });

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
            <NextButton isActive={isValid}>
                Войти
            </NextButton>
        </>
    )
}

export default LoginTel