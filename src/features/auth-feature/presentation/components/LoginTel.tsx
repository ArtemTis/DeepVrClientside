import { PhoneInput } from '../../../../lib/ui/FormFields/PhoneField'
import { PassField } from '../../../../lib/ui/FormFields/PassField'
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { singIn } from '../../../../features/auth-feature/store/asyncActions';
import { ILoginForm } from '../../../../lib/utils/types';
import { NextButton } from '../../../../lib/ui/NextButton';
import { useCookies } from 'react-cookie';
import { selectUser } from '../../store/selectors';

const LoginTel = () => {

    const {
        control,
        getValues,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onTouched",
    });

    const dispatch = useAppDispatch();

    const login = () => {
        dispatch(singIn(getValues()))
    }
    

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
            <NextButton isActive={isValid} onClick={() => login()}>
                Войти
            </NextButton>
        </>
    )
}

export default LoginTel