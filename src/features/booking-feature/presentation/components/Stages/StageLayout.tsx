import { Col } from "antd";
import { useAppSelector } from "../../../../../app/store";
import { BackButton } from "../BackButton";

import "../BookingStyles.css";
import { selectCurrentStep } from "../../../store/selectors";
import { StepDisplay } from "../StepDisplay";
import { Title } from "../Title";
import { FixedPanel } from "../FixedPanel";
import { NextButton } from "../../../../../lib/ui/NextButton";

interface Props {
  children: React.ReactElement;
  title: string;
  onNextClick: () => void;
  onBackClick: () => void;
  isNextBtnActive: boolean;
}

export const StageLayout: React.FC<Props> = ({
  children,
  title,
  onNextClick,
  onBackClick,
  isNextBtnActive,
}) => {
  const currentStep = useAppSelector(selectCurrentStep);
  return (
    <>
      <StepDisplay selected={currentStep} />
      <div className="booking-viewport-alt">
        <Title fontSize={46}>{title}</Title>
        {children}
      </div>
      <FixedPanel>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <BackButton onClick={onBackClick}>Назад</BackButton>
        </Col>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <NextButton onClick={onNextClick} isActive={isNextBtnActive}>
            Далее
          </NextButton>
        </Col>
      </FixedPanel>
    </>
  );
};
