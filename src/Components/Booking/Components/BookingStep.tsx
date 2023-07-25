import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { selectCurrentStep } from '../../../Utils/redux/booking/selectors';
import { useAppSelector } from '../../../Utils/redux/store';
import { BOOKING_PATH } from '../../../Utils/routeConstants';

const BookingStep = () => {

  const {step} = useParams();
  const currentStep = useAppSelector(selectCurrentStep);
  const navigate = useNavigate();

  return navigate(`${BOOKING_PATH}/${currentStep}`, {replace: true})
}

export default BookingStep