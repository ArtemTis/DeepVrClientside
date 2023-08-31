import { PhoneInput } from '../../../../lib/ui/FormFields/PhoneField'
import { PassField } from '../../../../lib/ui/FormFields/PassField'
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../app/store';
import { singIn } from '../../../../features/auth-feature/store/asyncActions';
import { ILoginForm } from '../../../../lib/utils/types';
import { NextButton } from '../../../../lib/ui/NextButton';

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