import { PopupLayout } from "./PopupLayout";

import "../../../features/profile-feature/presentation/pages/AccountStyles.css"

interface Props {
  onBackClick: () => void;
}

export const AboutPopup: React.FC<Props> = ({ onBackClick }) => {
  return (
    <PopupLayout title="О приложении" >
      я работою за еду помогите
    </PopupLayout>
  );
};
