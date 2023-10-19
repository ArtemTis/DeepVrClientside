import React, { useEffect, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { RootState, useAppDispatch, useAppSelector } from '../../../../app/store';
import { selectCurrentStep, selectSafetyStep } from '../../store/selectors';
import { setStep } from '../../store/slice';
import { BOOKING_PATH } from '../../../../lib/utils/routeConstants';
import { Config } from './Stages/Config';
import { allInstances } from '../../../profile-feature/store/asyncActions';

const BookingStep = () => {
  const selectedallInstances = useAppSelector((state: RootState) => state.profileReducer.allInstances);

  const { step } = useParams() ?? ( selectedallInstances.length > 1 ? 0 : 1);
  const currentStep = useAppSelector(selectCurrentStep);

  const dispatch = useAppDispatch();

  let safetyStep = useMemo(() => +(step ?? ( selectedallInstances.length > 1 ? 0 : 1)), [step])

  useEffect(() => {
    dispatch(setStep(safetyStep))
  }, [step])


  if (!step) {
    return <Navigate to={`${BOOKING_PATH}/${currentStep}`} />
  } else {
    return Config[currentStep].component;
  }
}

export default BookingStep