import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { FooterMenu } from "./Footer/FooterMenu";
import {
  Root as ScrollRoot,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";

import "../../App.css";
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
            <StyledContent className="full-height-wrapper">{children}</StyledContent>
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
  border-radius: 40px;
  background: #313063 !important;
  box-shadow: 0px 20px 40px 0px #51508B;
  z-index: 10;

  color: #FFF;
  position: fixed;
  bottom: 30px;
  width: 50vw;
  left: 25vw;
  padding: 15px 0px !important;

  .footer-menu{
    display: flex;
    align-items: center;
    justify-content: space-between;

  }
`

const StyledContent = styled.div`
  /* max-width: 500px; */
`