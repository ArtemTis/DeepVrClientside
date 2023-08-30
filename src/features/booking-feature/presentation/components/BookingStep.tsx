import React, { useEffect, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { selectCurrentStep } from '../../../Utils/redux/booking/selectors';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { BOOKING_PATH } from '../../../Utils/routeConstants';
import { Config } from '../../../features/booking-feature/presentation/components/Stages/Config';
import { setStep } from '../../../Utils/redux/booking/slice';

const BookingStep = () => {

  const { step } = useParams() ?? 1;
  const currentStep = useAppSelector(selectCurrentStep);
  const dispatch = useAppDispatch();

  const safetyStep = useMemo(() => +(step ?? 1), [step])

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