import React from 'react'
import { useAppSelector } from '../../../app/store';
import { Navigate, useLocation, useParams } from 'react-router';
import { selectCurrentStep } from '../store/selectors';
import { BOOKING_PATH } from '../../../lib/utils/routeConstants';

interface StepGuardProps {
    element: React.ReactElement
}

const StepGuard:React.FC<StepGuardProps> = ({element}) => {
    const storeStep = useAppSelector(selectCurrentStep);
    const params = useParams();
    const location = useLocation().pathname;
    const paramStep = +(params.step ?? 1);

    console.log('paramStep: ' + paramStep + "; storeStep " + storeStep  + 'location: ' + location);
    

    return paramStep <= storeStep ? element : <Navigate to={`${BOOKING_PATH}/${storeStep}`} />
}

export default StepGuard
