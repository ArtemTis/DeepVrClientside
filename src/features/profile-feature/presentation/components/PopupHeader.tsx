import "../pages/AccountStyles.css";
import styled from "styled-components";
import back from "../../../../assets/back.svg"
import gearIcon from "../../../../assets/gearIcon.svg";

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
        <span>
          Настройки
        </span>
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

  @media screen and (max-width: 1250px) {
    width: 90vw;
  }
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

  @media screen and (max-width: 400px) {
    background: none;
    h3{
      display: none;
    }
    img{
      margin: 0;
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(104deg) brightness(110%) contrast(101%);
      width: 24px;
      height: 24px;
    }
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

  @media screen and (max-width: 560px) {
    background: none;
    span{
      display: none;
    }
    img{
      margin: 0;
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(104deg) brightness(110%) contrast(101%);
      width: 24px;
      height: 24px;
    }
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

  @media screen and (max-width: 660px) {
    font-size: 30px;
  }
`
