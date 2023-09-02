import { Col, Row } from "antd";
import "../../App.css";
import { FooterMenuButton } from "./FooterMenuButton";

import gamesIcon from "../../assets/games.svg";
import bookingIcon from "../../assets/booking.svg";
import achivementsIcon from "../../assets/achivements.svg";
import accountIcon from "../../assets/account.svg";
import styled from "styled-components";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_PATH,
  HOME_PATH,
} from "../../lib/utils/routeConstants";

export const FooterMenu: React.FC = () => {
  return (
    <StyledWrrapper>

      <FooterMenuButton
        icon={gamesIcon}
        text="Игры"
        linkTo={HOME_PATH}
      />

      <FooterMenuButton
        icon={bookingIcon}
        text="Бронирование"
        linkTo={BOOKING_PATH}
      />
      <FooterMenuButton
        icon={achivementsIcon}
        text="Достижения"
        linkTo={ACHIVEMENTS_PATH}
      />
      <FooterMenuButton
        icon={accountIcon}
        text="Аккаунт"
        linkTo={`${ACCOUNT_PATH}`}
      />

    </StyledWrrapper>
  );
};


const StyledWrrapper = styled.div`
  display: flex;
  justify-content: space-around;
`