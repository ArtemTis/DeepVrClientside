import { Col } from "antd";
import "./CommonStyles.css";
import { SelectedMark } from "../../features/booking-feature/presentation/components/SelectedMark";
import { IInstance } from "../utils/types";

interface Props {
  instance: IInstance;
  isSelected?: boolean;
  onClick?: (instance: IInstance) => void;
}

export const InstanceCard: React.FC<Props> = ({ instance, isSelected, onClick}) => {
  const imgUrl = instance.code;
  
  return (
    <Col xs={12} sm={8} md={6} lg={6} xl={4} xxl={4}>
      <div
        className={`game-card-wrapper selectable-card-wrapper${
          isSelected ? " selectable-card-wrapper-selected" : ""
        }`}
        onClick={onClick ? () => onClick(instance) : undefined}
      >
        <div
          className="selectable-card-bg game-card-bg"
          style={imgUrl ? { backgroundImage: `url(${imgUrl})` } : undefined}
        >
          <h2 className="game-card-title"> {instance.name} </h2>
          <SelectedMark isSelected={!!isSelected} />
        </div>
      </div>
    </Col>
  );
};
