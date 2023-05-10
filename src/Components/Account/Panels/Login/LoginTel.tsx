import { PhoneInput } from '../../../Common/FormFields/PhoneField'
import { PassField } from '../../../Common/FormFields/PassField'
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';

const LoginTel = () => {

    const {
        control,
        formState: { errors },
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
        </>
    )
}

export default LoginTel