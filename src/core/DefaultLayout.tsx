import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { FooterMenu } from "./Footer/FooterMenu";
import {
  Root as ScrollRoot,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";

import "../App.css";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <StyledLayout >
      <Content>
        <ScrollRoot type="auto" className="ScrollAreaRoot">
          <Viewport className="ScrollAreaViewport">
            <div className="full-height-wrapper">{children}</div>
          </Viewport>
          <Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
            <Thumb className="ScrollAreaThumb" />
          </Scrollbar>
        </ScrollRoot>
      </Content>
      <StyledFooter>
        <FooterMenu />
      </StyledFooter>
    </StyledLayout>
  );
};


const StyledLayout = styled(Layout)`
  background: var(--gradient, radial-gradient(373.43% 111.74% at 50.13% -0.00%, #6455C0 0%, #322A76 22.64%, #0F1934 44.84%, #080C22 80.48%));

  color: #FFF;
  min-height: 100vh;
  height: calc(100vh - 72px);
  position: relative;
  /* padding-bottom: 72px; */

  .header-sticky{
    position: static;
  }
`

const StyledFooter = styled(Footer)`
  border-radius: 20px;
  background: #454385 !important;
  box-shadow: 0px 8px 24px 0px rgba(70, 68, 136, 0.30);
  z-index: 12;

  color: #FFF;
  position: fixed;
  bottom: 30px;
  width: 30vw;
  left: 50vw;
  min-width: 350px;
  transform: translate(-50%, 0%);
  padding: 15px 10px !important;

  @media screen and (max-width: 1200px) {
    width: 50vw;
  }

  @media screen and (max-width: 500px) {
    bottom: -1px;
    width: 100%;
    left: 0px;
    transform: translate(0%, 0%);
    border-radius: 20px 20px 0 0;
  }

  .footer-menu{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`