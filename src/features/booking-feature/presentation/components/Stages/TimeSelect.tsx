import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../../app/store";
import "../../pages/BookingStyles.css";
import { useSelector } from "react-redux";
import { selectAvalibleDayAndTime } from "../../../store/avalibleTime/selectors";
import { selectDate, selectSelectedTime } from "../../../store/selectors";
import { setTime } from "../../../store/slice";
import { LoadWrapper } from "../../../../../lib/ui/LoadWrapper";
import { TimeCard } from "../TimeCard";
import { ReqStatus } from "../../../../../lib/utils/enums";


export const TimeSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedDateBooking = useAppSelector(selectDate);

  const date = useAppSelector(selectAvalibleDayAndTime);

  const preselectedTime = useAppSelector(selectSelectedTime);

  const [selected, setSelected] = useState<string | undefined>(
    selectedDateBooking && preselectedTime
      ? `${preselectedTime}` : undefined
  );

  let avalibleTime = date.find(date => date.date === selectedDateBooking?.slice(0, 10));

  const isLoading = useSelector((state: RootState) => state.timeReducer.reqStatus === ReqStatus.pending);

  useEffect(() => {
    dispatch(setTime(selected))
  }, [selected])

  const onTimeClick = (time: string) => {
    setSelected(time);
  };

  return (
    <LoadWrapper isLoading={isLoading}>
      <Row justify="start" gutter={[20, 20]}>
        {avalibleTime?.times &&
          avalibleTime.times.map((time: string) => (
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
                time={time.slice(0, 5)}
                isSelected={
                  time.slice(0, 5) === selected
                }
                onClick={onTimeClick}
              />
            </Col>
          ))}
      </Row>
    </LoadWrapper>
  );
};
