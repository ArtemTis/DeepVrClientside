import { PhoneInput } from '../../../Common/FormFields/PhoneField'
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../../Utils/types';
import { FormField } from '../../../Common/FormFields/FormField';
import passIcon from "../../../Assets/passIcon.svg";

const LoginCode = () => {

    const {
        control,
        formState: { errors },
    } = useForm<ILoginForm>({
        mode: "onTouched",
    });

    return (
        <div>
            <PhoneInput
                control={control}
                error={errors.phone}
                autocomplete="username"
                unregister
                required
            />
            { codeState === "auth" && (
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
        </div>
    )
}

export default LoginCode