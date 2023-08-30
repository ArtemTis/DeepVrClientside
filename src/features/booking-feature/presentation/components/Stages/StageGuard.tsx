import React from 'react'
import { useAppSelector } from '../../../../../app/store';
import { selectCurrentStep } from '../../../Utils/redux/booking/selectors';

interface AuthGuardProps {
    element: React.ReactElement
}

// const StageGuard:React.FC<AuthGuardProps> = ({element})  => {

    

//     const currentStep = useAppSelector(selectCurrentStep);

//     return isAuthorised ? element : <Navigate to={LOGIN_PATH} replace/>
// }

// export default StageGuard