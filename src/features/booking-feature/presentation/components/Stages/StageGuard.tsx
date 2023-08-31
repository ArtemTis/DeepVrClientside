import React from 'react'
import { useAppSelector } from '../../../../../app/store';

interface AuthGuardProps {
    element: React.ReactElement
}

// const StageGuard:React.FC<AuthGuardProps> = ({element})  => {

    

//     const currentStep = useAppSelector(selectCurrentStep);

//     return isAuthorised ? element : <Navigate to={LOGIN_PATH} replace/>
// }

// export default StageGuard