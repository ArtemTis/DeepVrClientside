import "../pages/BookingStyles.css";
import mark from "../../../../assets/selectedMark.svg";

interface Props {
  isSelected: boolean;
}

export const SelectedMark: React.FC<Props> = ({ isSelected }) => {
  return (
    <>
      {isSelected && (
        <div className="selected-mark">
          <img src={mark} alt="selected" />
        </div>
      )}
    </>
  );
};
