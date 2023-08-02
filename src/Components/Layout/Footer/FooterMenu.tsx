import { Col, Row } from "antd";
import "../../../App.css";
import { FooterMenuButton } from "./FooterMenuButton";

import gamesIcon from "../../../Assets/games.svg";
import bookingIcon from "../../../Assets/booking.svg";
import achivementsIcon from "../../../Assets/achivements.svg";
import accountIcon from "../../../Assets/account.svg";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_PATH,
  HOME_PATH,
  LOGIN_PATH,
  SINGIN_TEL_PATH,
} from "../../../Utils/routeConstants";
import styled from "styled-components";

export const FooterMenu: React.FC = () => {
  return (
    <StyledWrrapper>

      <FooterMenuButton
        icon={gamesIcon}
        text="Games"
        linkTo={HOME_PATH}
      />

      <FooterMenuButton
        icon={bookingIcon}
        text="Booking"
        linkTo={BOOKING_PATH}
      />
      <FooterMenuButton
        icon={achivementsIcon}
        text="Progress"
        linkTo={ACHIVEMENTS_PATH}
      />
      <FooterMenuButton
        icon={accountIcon}
        text="Account"
        linkTo={`${ACCOUNT_PATH}`}
      />

    </StyledWrrapper>
  );
};


const StyledWrrapper = styled.div`
  display: flex;
  justify-content: space-around;
`