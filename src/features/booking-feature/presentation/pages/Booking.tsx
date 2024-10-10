import { selectBookingId, selectCredentials, selectCurrentStep, selectDate, selectGame, selectIsFinished, selectPlayersCount, selectSelectedTime } from "../../store/selectors";
import { RootState, useAppDispatch, useAppSelector } from "../../../../app/store";
import "./BookingStyles.css";
import { useCallback, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router";
import TypeGameSelect from "../components/Stages/GamesTypeSelect";
import { Button, Modal } from "antd";
import { Config } from "../components/Stages/Config";
import { Link } from "react-router-dom";
import { LoaderGipno } from "../components/Stepper/loader-components";
import styled from "styled-components";
import { DefaultLayout } from "../../../../core/DefaultLayout";
import { Done } from "../components/Stages/Done";
import close from '../../../../assets/close-cross.svg'
import { selectToken, selectUser } from "../../../auth-feature/store/selectors";
import { clearState, setStep } from "../../store/slice";
import { NextButton } from "../../../../lib/ui/NextButton";
import { BOOKING_CONFIRM_PATH, BOOKING_PATH } from "../../../../lib/utils/routeConstants";
import { getSummary } from "../../store/summary/asyncActions";
import { IBookingCredentials, IGetSummaryRequestData } from "../../../../lib/utils/types";
import { createBooking } from "../../store/asyncActions";

export const Booking: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const isFinished = useAppSelector(selectIsFinished);
  const selectedallInstances = useAppSelector((state: RootState) => state.profileReducer.allInstances);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation().pathname;
  const { step } = useParams();

  useEffect(() => {
    return function checkState() {
      if (isFinished) {
        dispatch(setStep(1));
        dispatch(clearState());
      }
    };
  }, [dispatch, isFinished]);

  const booking = useAppSelector(state => state.bookingReducer);


  const isFinish = useCallback(() => {

    return Config[currentStep].isFinished(booking)
  }, [booking])

  const Label = () => {
    return (
      <div>
        <StyledCurrentStep>{Config[currentStep].title}</StyledCurrentStep>
        {
          currentStep < Config.length - 1
          &&
          <StyledNextStep>Далее: {Config[currentStep + 1].title}</StyledNextStep>
        }
      </div>
    )
  }

  let stepPath = location.split('/').slice(-1)[0]

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const user = useAppSelector(selectUser);

  let timeISO;

  if (booking.selectedTime) {

    let timeParse = new Date(booking.date ?? '');

    timeParse.setHours(timeParse.getHours() + Number.parseInt(booking.selectedTime ?? ''));

    timeISO = timeParse.toISOString();

  }

  const sendBooking: IGetSummaryRequestData = {
    client: {
      phone: booking.credentials?.phone ?? '',
      name: booking.credentials?.name ?? '',
      id: user?.id ?? null
    },
    bookings: [
      {
        gameId: booking.game?.id ?? '',
        time: timeISO ?? '',
        guestCount: booking.playersCount ?? -1,
        id: null
      }
    ],
    paymentInfo: {
      bonus: null,
      promoCode: booking.promo ?? null,
      certificates: null
    }
  }

  console.log(sendBooking);
  

  const confirm = () => {
    dispatch(createBooking(sendBooking))
    showModal();
  }

  const precalculate = () => {
    navigate(BOOKING_CONFIRM_PATH);

    dispatch(getSummary(sendBooking));
  }

  return (
    <DefaultLayout>
      <div className="booking-wrapper">

        {
          step && +step < Config.length
          &&
          <StyledLoaderWrapper>

            <LoaderGipno innerText={"stepper"} type={"circle"}
              fontSize={20} value={currentStep} maxValue={Config.length - 1} width={100}
              height={8} colorStops={[{ color: '#30A5D1', percent: 100 },]}
              label={<Label />}
              labelPosition="right"
            />
          </StyledLoaderWrapper>
        }



        <Outlet />


        {
          stepPath !== 'done'
          &&
          <StyledWrapperButtons>
            {
              +stepPath > 0 && selectedallInstances.length > 1
                ?
                <StyledPrevButton onClick={() => navigate(`${currentStep - 1}`)}>Назад</StyledPrevButton>
                :
                +stepPath > 1
                  ?
                  <StyledPrevButton onClick={() => navigate(`${currentStep - 1}`)}>Назад</StyledPrevButton>
                  :
                  stepPath === 'confirm'
                    ?
                    <StyledPrevButton onClick={() => navigate(`${currentStep}`)}>Назад</StyledPrevButton>
                    : <></>
            }
            {
              currentStep < Config.length - 1
                ?
                <StyledNextButton isActive={isFinish()} onClick={() => navigate(`${currentStep + 1}`)}>Далее</StyledNextButton>
                :
                !Number.isNaN(+stepPath)
                  ?
                  <StyledNextButton isActive={isFinish()} onClick={precalculate}>Далее</StyledNextButton>
                  :
                  <StyledNextButton isActive={true} onClick={confirm}>Готово</StyledNextButton>
            }
          </StyledWrapperButtons>
        }



      </div>


      <StyledModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]} closeIcon={<img src={close} alt="close icon" />}>
        <Done />
      </StyledModal>

    </DefaultLayout>
  );
};

const StyledLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 7vh;
`

const StyledNextButton = styled(NextButton)`
  border-radius: 30px;
  background: var(--linear, linear-gradient(163deg, #952EF1 0%, #17C5E7 100%));
`

const StyledPrevButton = styled(Button)`
  border-radius: 30px;
  background: #3A3A6B;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #FFFFFF;
  backdrop-filter: blur(9px);
  outline: none;
  border: 0;
  width: 20vw;
  min-width: 240px;

  height: 60px;
  padding: 16px 32px;

  :hover{
    color: #FFFFFF !important;
  }
`

const StyledWrapperButtons = styled.div`
  padding: 20px 12vw 0;
  display: flex;
  justify-content: center;
  gap: 20px;

  margin-top: 5vh;

  cursor: pointer;
  border: none;
  
  @media screen and (max-width: 750px) {
    padding: 0;

    button{
      min-width: 40vw;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    position: fixed;
    bottom: 72px;
    left: 0px;
    z-index: 10;
    margin: 0;
    padding: 12px 16px 20px 16px;

    display: flex;
    justify-content: space-between;

    background-color:  #080C22;

    gap: 10px;
    button{
      min-width: 45vw;
    }
  }
`

const StyledNextStep = styled.h3`
  color: #B2BBD2;
  text-align: right;
  font-family: SF Pro Display;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin: 0;

  @media screen and (max-width: 450px) {
    font-size: 16px;
    white-space: normal;
  }
`

const StyledCurrentStep = styled.h2`
  color: #FFF;
  text-align: right;
  font-family: SF Pro Display;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
  margin-bottom: 8px;

  @media screen and (max-width: 510px) {
    white-space: normal;
  }
`

const StyledModal = styled(Modal)`
  padding-bottom: 0px !important;
  border-radius: 16px !important;
  background: rgba(25, 26, 41, 1) !important;

  top: 10vh;

  .ant-modal-content{
    padding: 40px !important;
    border-radius: 16px !important;
    
  }
  .ant-modal-footer{
    margin-top: 0 !important;
  }
`
