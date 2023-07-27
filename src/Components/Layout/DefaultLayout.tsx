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
    <StyledLayout className="app-bg">
      <Content className="app-main">
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
  padding-bottom: 72px;
`

const StyledFooter = styled(Footer)`
  background: rgba(89, 83, 165, 1) !important;
  color: #FFF;
  position: fixed;
  bottom: 0;
  height: var(--footer-height);
  width: 100%;
  padding: 0;
  border-top: #444656 solid 1px;
`