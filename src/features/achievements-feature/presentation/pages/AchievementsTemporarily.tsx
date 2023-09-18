import { Row } from "antd";
import "./AchievementsStyles.css";

import img from "../../../../assets/mirage-astronaut.png";
import { DefaultLayout } from "../../../../core/DefaultLayout";
import { ColLg } from "../../../../lib/ui/ColLg";

export const AchievementsTemporarily: React.FC = () => {
  return (
    <DefaultLayout>
      <Row justify="center" className="achievments-wrapper">
        <ColLg>
          <div className="achievments-header">
            Раздел находится в разработке
          </div>
          <img src={img} alt="" className="achievments-image" />
          <div className="achievments-text">
            Данный раздел еще не готов и находится в разработке, возвращатесь
            позже
          </div>
        </ColLg>
      </Row>
    </DefaultLayout>
  );
};