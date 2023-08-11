import "../AccountStyles.css";
import styled from "styled-components";
import back from "../../../Assets/back.svg"
import gearIcon from "../../../Assets/gearIcon.svg";
import { SettingsPopup } from "../Popups/SettingsPopup";

export interface PopupHeaderProps {
  title: string;
  onBackClick: () => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = ({
  onBackClick,
  title,
}) => {
  return (
    <StyledHeader className="profile-header popup-header">
      <StyledBackBtn onClick={onBackClick}>
        <img src={back} alt="Назад" />
        <h3>Назад</h3>
      </StyledBackBtn>
      <StyledTitle>
        {title}
      </StyledTitle>
      <StyledSettingsBtn
        // onClick={() =>
        //   addPopup(
        //     <SettingsPopup
        //       addPopup={addPopup}
        //       onBackClick={removeLastPopup}
        //     />
        //   )
        // }
        >
        Настройки
        <img
          src={gearIcon}
          alt="Открыть настройки профиля"
        />
      </StyledSettingsBtn>
    </StyledHeader>
  );
};


const StyledHeader = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0 20px;

  width: 1220px;
`

const StyledBackBtn = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  margin-left: 8px;
  border-radius: 24px;
  background: #FFF;

  padding: 10px 18px 10px 10px;

  h3{
    margin: 0;
    color: #24313F;
    font-family: SF Pro Display;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 19.2px */
    letter-spacing: 1px;
  }
`

const StyledSettingsBtn = styled.div`
  cursor: pointer;
  border-radius: 24px;
  background: #FFF;
  padding: 10px 18px;
  color: #24313F;
  font-family: 'SF Pro Display';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;


  display: inline-flex;
  align-items: center;
  box-sizing: inherit;


  /* position: absolute; */
	top: 24px;
	left: 300px;

  img{
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
`

const StyledTitle = styled.h1`
  margin: 0;
  color: var(--white, #FFF);
  text-align: center;
  font-family: 'SF Pro Display';
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: 180%; /* 82.8px */
  letter-spacing: 1px;

  grid-area: A;
`
