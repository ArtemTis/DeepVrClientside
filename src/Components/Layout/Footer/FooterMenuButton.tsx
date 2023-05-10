import { NavLink, useLocation, useMatch } from "react-router-dom";
import "../../../App.css";

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

  const match = useMatch({
    path: linkTo,
    end: linkTo.length === 1
  })

  let location = useLocation();
  let flagActive: boolean = false;
  // const checkPath = () => {
  //   if (location.pathname.includes('account')) !flagActive
  //   return flagActive;
  // }

  return (
    <NavLink to={linkTo}>
      {({ isActive }) => (
        <>
          <img src={icon} alt={text} />
          <div className="footer-menu-text">{text}</div>
          {(isActive || flagActive) && <div className="footer-menu-selected-link" />}
        </>
      )}
    </NavLink>
  );
};
