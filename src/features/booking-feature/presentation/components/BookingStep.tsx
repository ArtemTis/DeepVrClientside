import React, { useEffect, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { selectCurrentStep } from '../../store/selectors';
import { setStep } from '../../store/slice';
import { BOOKING_PATH } from '../../../../lib/utils/routeConstants';
import { Config } from './Stages/Config';

const BookingStep = () => {

  const { step } = useParams() ?? 1;
  const currentStep = useAppSelector(selectCurrentStep);

  const dispatch = useAppDispatch();

  let safetyStep = useMemo(() => +(step ?? 1), [step])

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