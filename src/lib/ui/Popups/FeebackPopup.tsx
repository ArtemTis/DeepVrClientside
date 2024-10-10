import { PopupLayout } from "./PopupLayout";
import "../../../features/profile-feature/presentation/pages/AccountStyles.css"

interface Props {
  onBackClick: () => void;
}

export const FeebackPopup: React.FC<Props> = ({ onBackClick }) => {
  return (
    <PopupLayout title="Форма обратной связи">
      не звоните сюда
    </PopupLayout>
  );
};
