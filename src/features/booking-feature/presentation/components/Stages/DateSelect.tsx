import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import {
  decreaseStep,
  increaseStep,
  setDate,
} from "../../../Utils/redux/booking/slice";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import ru from "date-fns/locale/ru";

import "../BookingStyles.css";
import { selectDate } from "../../../Utils/redux/booking/selectors";
import { selectAvalibleDayAndTime } from "../../../store/avalibleTime/selectors";
import { getAvalibleDateAndTime } from "../../../store/avalibleTime/asyncActions";
import { IAvalibleTime } from "../../../Utils/types";
import styled from "styled-components";

export const DateSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  useEffect(() => {
    dispatch(getAvalibleDateAndTime());
  },[])

  const preselectedDate = useAppSelector(selectAvalibleDayAndTime);
  const selectedDate = useAppSelector(selectDate);
  
  const [selected, setSelected] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );
  

  useEffect(() => {
    if (!!selected) {
      selected.setMinutes(-selected.getTimezoneOffset());
      dispatch(setDate(selected.toISOString()));
    }
  }, [selected])
  

  const onChangeDate = (d: Date) => {
    setSelected(d);
  };
  registerLocale("ru", ru);

  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
          <ReactDatePicker
            minDate={minDate}
            maxDate={maxDate}
            onChange={onChangeDate}
            selected={selected}
            calendarClassName="datepicker-window"
            renderDayContents={(dayOfMonth, date) => (
              <CustomDay
                dayOfMonth={dayOfMonth}
                date={date as Date}
                maxDate={maxDate}
                minDate={minDate}
                selectedDate={selected}
                preselectedDate={preselectedDate}
              />
            )}
            inline
            calendarStartDay={1}
            locale={"ru"}
          />
        </Col>
      </Row>
    </>
  );
};

interface CustomDayProps {
  dayOfMonth: number;
  date: Date;
  minDate: Date;
  maxDate: Date;
  selectedDate: Date | undefined;
  preselectedDate:  IAvalibleTime[];
}
const CustomDay: React.FC<CustomDayProps> = ({
  dayOfMonth,
  date,
  minDate,
  maxDate,
  selectedDate,
  preselectedDate
}) => {

  let emptyDay : string = `${new Date(`${preselectedDate.find(day => day.times.length === 0)?.date}`)}`;
  let unselectDate : string = `${date}`;

  const isSelected =
    selectedDate &&
    date.getFullYear() === selectedDate.getFullYear() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getDate() === selectedDate.getDate();

  const isUnselectable = date < minDate || date > maxDate || (emptyDay.slice(0, 15) === unselectDate.slice(0, 15));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDate(`${selectedDate}`.slice(0, 15)));
  },[selectedDate])
  
  
  return (
    <StyledDay
      className={`datepicker-customDay${isUnselectable
          ? " datepicker-customDay-unselectable"
          : isSelected
            ? " datepicker-customDay-selected"
            : ""
        }`}
    >
      <div className="datepicker-customDay-day">{dayOfMonth}</div>
      {/* <div className="datepicker-customDay-places">36 мест</div> */}
    </StyledDay>
  );
};


const StyledDay = styled.div`
  
  &.datepicker-customDay-selected{

    .datepicker-customDay-day{
      font-weight: 600
    }
  }
`