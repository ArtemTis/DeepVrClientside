import styled from "styled-components";
import "./CommonStyles.css";
import { useAppSelector } from "../../app/store";
import { selectCurrentStep } from "../../features/booking-feature/store/selectors";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NextButton: React.FC<Props> = ({
  onClick,
  children,
  isActive,
}) => {

  const currentStep = useAppSelector(selectCurrentStep);

  return (
    <StyledButton
      className={`${isActive ? "" : " next-btn-inactive"} ${currentStep === 1 ? "first-step" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        isActive && onClick?.(e);
      }}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 20vw;
    min-width: 240px;
    min-height: 60px;
    height: 60px;
    padding: 16px 32px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;

    box-shadow: 0px 15px 60px rgba(66, 130, 233, 0.45);
    cursor: pointer;
    border: none;

    border-radius: 30px;
    background: var(--linear, linear-gradient(163deg, #952EF1 0%, #17C5E7 100%));

    

      @media screen and (max-width: 500px) {
        &.first-step{
          width: 100%;
      }
    }
`