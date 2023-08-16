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
import { selectAvalibleTime } from "../../../Utils/redux/avalibleTime/selectors";
import { selectDate, selectSelectedTime } from "../../../Utils/redux/booking/selectors";
import { Title } from "../Components/Title";


export const TimeSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector(selectDate);

  const date = useAppSelector(selectAvalibleTime);
  const preselectedTime = useAppSelector(selectSelectedTime);
  const [selected, setSelected] = useState<string | undefined>(
    date && preselectedTime
      ? `${date.slice(0, 10)} ${preselectedTime}`
      : undefined
  );

  console.log(date);
  
  let avalibleTime 

  // const date = useAppSelector(selectDate);
  // const times = useAppSelector(selectAvalibleTime);
  // const timeIndex = times.findIndex(field => field.date === date);
  // const avalibleTime = times[timeIndex].date;
  // console.log(avalibleTime);
  

  const isLoading = useSelector((state: RootState) => state.timeReducer.reqStatus === ReqStatus.pending);

  useEffect(() => {
    dispatch(setTime)
  }, [date, preselectedTime])

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
      <>

        <LoadWrapper isLoading={isLoading}>
          <Row justify="start" gutter={[20, 20]}>
            {/* {date.times &&
              date.times.map((time) => (
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
              ))} */}
          </Row>
        </LoadWrapper>
      </>
      );
};
