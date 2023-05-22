import { PhoneInput } from '../../../Common/FormFields/PhoneField'
import { PassField } from '../../../Common/FormFields/PassField'
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';
import { NextButton } from '../../../Common/Markup/NextButton';
import { useAppDispatch } from '../../../../Utils/redux/store';
import { singIn } from '../../../../Utils/redux/auth/asyncActions';

const LoginTel = () => {

    const {
        control,
        getValues,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onTouched",
    });

    const dispatch = useAppDispatch();

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
            <NextButton isActive={isValid} onClick={() => dispatch(singIn(getValues()))}>
                Войти
            </NextButton>
        </>
    )
}

export default LoginTel