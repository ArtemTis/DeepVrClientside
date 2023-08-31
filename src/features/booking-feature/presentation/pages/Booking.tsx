import { selectBookingId, selectCredentials, selectCurrentStep, selectDate, selectGame, selectIsFinished, selectPlayersCount, selectSelectedTime } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import "./BookingStyles.css";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import TypeGameSelect from "../components/Stages/GamesTypeSelect";
import { Button, Modal } from "antd";
import { Config } from "../components/Stages/Config";
import { Link } from "react-router-dom";
import { LoaderGipno } from "../components/Stepper/loader-components";
import styled from "styled-components";
import { DefaultLayout } from "../../../../core/DefaultLayout";
import { Done } from "../components/Stages/Done";
import close from '../../../../Assets/close-cross.svg'
import { selectToken } from "../../../auth-feature/store/selectors";
import { clearState, setStep } from "../../store/slice";
import { NextButton } from "../../../../lib/ui/NextButton";
import { BOOKING_CONFIRM_PATH } from "../../../../lib/utils/routeConstants";

export const Booking: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const isFinished = useAppSelector(selectIsFinished);

  const token = useAppSelector(selectToken) ?? 'guest_token';
  const credentials = useAppSelector(selectCredentials);
  const summary = useAppSelector(state => state.summaryReducer.summary);
  const typeGame = useAppSelector(state => state.bookingReducer.typeGame);
  const game = useAppSelector(selectGame);
  const date = useAppSelector(selectDate)?.substring(0, 10);
  const time = useAppSelector(selectSelectedTime)?.substring(0, 5);
  const count = useAppSelector(selectPlayersCount);

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

  console.log(booking);


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


  const confirmBooking = () => {
    if (
      !!summary &&
      !!credentials &&
      !!game &&
      !!typeGame &&
      !!date &&
      !!time &&
      typeof count === "number"
    ) {
      // setIsPostingForm(true);

      // dispatch(createEmpty())
      // {
      //   name: credentials.name,
      //   date,
      //   phone: credentials.phone,
      //   booking: {
      //     game_id: game.id,
      //     typeGame_id: typeGame.id,
      //     guest_quantity: count,
      //     time: `${date} ${time}`,
      //   },
      //   comment: credentials.comment,
      //   bonus: summary.bonus_discount,
      //   certificates: [],
      //   promo_code: credentials.promo ?? "",
      //   token,
      // }
    }
  };

  const confirm = () => {
    confirmBooking()
    showModal()
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
                  <StyledNextButton isActive={isFinish()} onClick={() => navigate(BOOKING_CONFIRM_PATH)}>Далее</StyledNextButton>
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
`

const StyledCurrentStep = styled.h2`
  color: #FFF;
  text-align: right;
  font-family: SF Pro Display;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
  margin-bottom: 8px;
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
