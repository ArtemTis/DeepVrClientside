import { PopupLayout } from "./PopupLayout";

import "../../../features/profile-feature/presentation/pages/AccountStyles.css"

interface Props {
  onBackClick: () => void;
}

export const AboutPopup: React.FC<Props> = ({ onBackClick }) => {
  return (
    <PopupLayout title="О приложении" onBackClick={onBackClick}>
      я работою за еду помогите
    </PopupLayout>
  );
};
