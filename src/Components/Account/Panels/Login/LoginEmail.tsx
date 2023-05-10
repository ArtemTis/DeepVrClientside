import { EmailField } from '../../../Common/FormFields/EmailField';
import { PassField } from '../../../Common/FormFields/PassField';
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';

const LoginEmail = () => {

    const {
        control,
        getValues,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onTouched",
    });



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
        </>
    )
}

export default LoginEmail