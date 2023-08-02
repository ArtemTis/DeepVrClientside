import { NavLink, useLocation, useMatch } from "react-router-dom";
import "../../../App.css";
import styled from "styled-components";
import Icon from '@ant-design/icons';

interface FooterMenuButtonProps {
  icon: string;
  text: string;
  linkTo: string;
}

export const FooterMenuButton: React.FC<FooterMenuButtonProps> = ({
  icon,
  text,
  linkTo,
}) => {

  return (
    <StyledNavLink to={linkTo} >
      {({ isActive }) => (
        <>
          <img src={icon} alt={text} className={isActive ? 'active-icon' : 'icon'} />
          <div className={`${isActive ? 'active-footer-menu-text' : 'footer-menu-text'}`}>{text}</div>
        </>
      )}
    </StyledNavLink>
  );
};


const StyledNavLink = styled(NavLink)`

  color: #FFF;

  .active-icon{
    filter: brightness(0) saturate(100%) invert(82%) sepia(53%) saturate(2906%) hue-rotate(158deg) brightness(101%) contrast(102%);
  }

  font-family: 'SF Pro Display';
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: -0.41px;
  font-style: normal;
  font-size: 14px;
  
  .footer-menu-text{ 
    color: #FFF;
  }

  .active-footer-menu-text{
    color: rgba(61, 221, 255, 1);
  }

`