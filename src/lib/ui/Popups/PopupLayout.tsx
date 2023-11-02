import "../../../features/profile-feature/presentation/pages/AccountStyles.css"
import { IChildren } from "../../utils/types";
import { PopupHeader, PopupHeaderProps } from "../../../features/profile-feature/presentation/components/PopupHeader";

export interface PopupProps extends PopupHeaderProps {
  children?: IChildren;
}

export const PopupLayout: React.FC<PopupProps> = ({
  title,
  children,
}) => {
  return (
    <div className="popup-wrapper">
      <PopupHeader title={title} />
      {children}
    </div>
  );
};
