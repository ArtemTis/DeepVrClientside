import { Button, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import "./AccountStyles.css";
import gearIcon from "../../../../assets/gearIcon.svg";
import styled from "styled-components";
import LeftSideProfile from "../components/LeftSideProfile";
import RightSideProfile from "../components/RightSideProfile";
import { PROFILE_SETTINGS_PATH } from "../../../../lib/utils/routeConstants";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { gamesTypes } from "../../../games-feature/store/gamesType/asyncActions";
import { selectGameTypes } from "../../../games-feature/store/gamesType/selectors";
import { useCookies } from "react-cookie";
import { selectUser } from "../../../auth-feature/store/selectors";

let tempPopups: Array<React.ReactElement> = [];

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const gameTypes = useAppSelector(selectGameTypes);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  
  const user = useAppSelector(selectUser) || cookies.user;

  if (gameTypes.length === 0) {
    dispatch(gamesTypes());
  }

  const goToSettings = () => {
    navigate(`../${PROFILE_SETTINGS_PATH}`)
  }

  useEffect(()=>{
    setCookie('user', user);
  },[user])

  return (
    <Row justify="center">

      <div className="profile-wrapper">
        <StyledHeader>
          <StyledBackBtn>
          </StyledBackBtn>
          <StyledTitle>
            Профиль
          </StyledTitle>
          <StyledSettingsBtn
            onClick={goToSettings}
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

        <ProfileBody>

          <LeftSideProfile />

          <RightSideProfile />

        </ProfileBody>

      </div>
    </Row>
  );
};

const Wrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
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

      @media screen and (max-width: 560px) {
        font-size: 30px;
  }
      `

const StyledHeader = styled.div`
      /* position: relative; */
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;

      width: 1220px;

      @media screen and (max-width: 1250px) {
        max-width: 80vw;
  }
      @media screen and (max-width: 900px) {
        max-width: 90vw;
  }
      `

const StyledBackBtn = styled.div`
      width: 102px;
      min-height: 10px;
      `

const ProfileBody = styled.div`
      display: grid;
      grid-template-columns: repeat(2, 600px);
      grid-auto-flow: column;
      gap: 20px;

      /* justify-content: center; */
      max-width: 1720px;

      @media screen and (max-width: 1250px) {
        /* max-width: 1000px; */
        grid-template-columns: repeat(2, 40vw);
  }

      @media screen and (max-width: 900px) {
        grid-template-columns: repeat(1, 90vw);
      grid-auto-flow: row;
  }
      `





