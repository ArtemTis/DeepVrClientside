import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import {
  decreaseStep,
  increaseStep,
  setTime,
} from "../../../Utils/redux/booking/slice";
import { RootState, useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";
import { Api } from "../../../Utils/api";
import { TimeCard } from "../Components/TimeCard";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../BookingStyles.css";
import { useSelector } from "react-redux";
import { ReqStatus } from "../../../Utils/enums";
import { selectDate } from "../../../Utils/redux/date/selectors";
import { selectAvalibleTime } from "../../../Utils/redux/avalibleTime/selectors";
import { selectSelectedTime } from "../../../Utils/redux/booking/selectors";


export const TimeSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const preselectedDate = useAppSelector(selectDate);
  const preselectedTime = useAppSelector(selectSelectedTime);
  const [selected, setSelected] = useState<string | undefined>(
    preselectedDate && preselectedTime
      ? `${preselectedDate.slice(0, 10)} ${preselectedTime}`
      : undefined
  );


  const times = useAppSelector(selectAvalibleTime)

  const isLoading = useSelector((state: RootState) => state.authReducer.reqStatus === ReqStatus.pending); 

  useEffect(()=>{
    dispatch(setTime)
  },[preselectedDate, preselectedTime])

  const onNextClick = () => {
    if (!!selected) {
      dispatch(setTime(selected));
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  const onTimeClick = (time: string) => {
    setSelected(time);
  };

  return (
    <StageLayout
      title="Выберите подходящее время"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!!selected}
    >
      <LoadWrapper isLoading={isLoading}>
        <Row justify="start" gutter={[20, 20]}>
          {times &&
            times.map((time) => (
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={6}
                xl={4}
                xxl={4}
                key={time}
              >
                <TimeCard
                  time={time}
                  isSelected={
                    time === selected
                  }
                  onClick={onTimeClick}
                />
              </Col>
            ))}
        </Row>
      </LoadWrapper>
    </StageLayout>
  );
};
