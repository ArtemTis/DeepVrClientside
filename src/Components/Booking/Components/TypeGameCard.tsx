import React, { useEffect } from 'react'
import { SelectedMark } from './SelectedMark';
import { IGameType } from '../../../Utils/types';

import playersIcon from "../../../Assets/console 1.svg";
import timeIcon from "../../../Assets/clock 1.svg";
import ageIcon from "../../../Assets/vr-glasses 2.svg";

interface Props {
  gameType: IGameType;
  isSelected?: boolean;
  onClick: (room: IGameType) => void;
}

const TypeGameCard: React.FC<Props> = ({ gameType, isSelected, onClick }) => {
  return (
    <div
      className={`room-card-wrapper selectable-card-wrapper${isSelected ? " selectable-card-wrapper-selected" : ""
        }`}
      onClick={() => onClick(gameType)}
    >
      <div className="selectable-card-bg room-card-bg">
        <h2 className="room-card-title"> {gameType.title} </h2>
        <div className="room-card-description">
          <div className="room-card-description-item">
            <img src={playersIcon} alt="Число игроков" />
            1-{gameType.guest_max}
          </div>

          <div className="room-card-description-item">
            <img src={timeIcon} alt="Число игроков" />
            40 мин.
          </div>

          <div className="room-card-description-item">
            <img src={ageIcon} alt="Число игроков" />
            12+
          </div>
        </div>
        <SelectedMark isSelected={!!isSelected} />
      </div>
    </div>
  )
}

export default TypeGameCard