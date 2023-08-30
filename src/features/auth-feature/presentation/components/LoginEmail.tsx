import { EmailField } from '../../../../lib/ui/FormFields/EmailField';
import { PassField } from '../../../../lib/ui/FormFields/PassField';
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';
import { NextButton } from '../../../Common/Markup/NextButton';
import { singIn } from '../../../../features/auth-feature/store/asyncActions';
import { useAppDispatch } from '../../../../app/store';

const LoginEmail = () => {

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
            <EmailField
                control={control}
                error={errors.email}
                autocomplete="email"
                required
                unregister
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

export default LoginEmail