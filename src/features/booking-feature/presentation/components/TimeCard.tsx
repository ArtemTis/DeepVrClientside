import "../pages/BookingStyles.css";

import timeIcon from "../../../../Assets/time.svg";
import timeIconAlt from "../../../../Assets/time-dark.svg";

interface Props {
  time: string;
  isSelected?: boolean;
  onClick: (time: string) => void;
}

export const TimeCard: React.FC<Props> = ({ time, isSelected, onClick }) => {
  return (
    <div
      className={`selectable-card-wrapper time-card-wrapper`}
      onClick={() => onClick(time)}
    >
      <div
        className={`selectable-card-bg time-card-bg${
          isSelected ? " time-card-bg-selected" : ""
        }`}
      >
        <img
          src={isSelected ? timeIconAlt : timeIcon}
          alt="время"
          className="time-card-img"
        />
        <h2 className="room-card-title">
          {time}{" "}
        </h2>
      </div>
    </div>
  );
};
