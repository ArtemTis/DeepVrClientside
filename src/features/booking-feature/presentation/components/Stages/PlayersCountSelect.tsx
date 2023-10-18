import { Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import "../../pages/BookingStyles.css";
import vrGlasses from "../../../../../assets/Очки 3.png";
import { selectBookingInstance, selectGame, selectPlayersCount, selectTypeGame } from "../../../store/selectors";
import { setCredentials, setDate, setPlayersCount, setTime, setTypeGame } from "../../../store/slice";
import { selectGameTypes } from "../../../../games-feature/store/gamesType/selectors";
import { gamesTypes } from "../../../../games-feature/store/gamesType/asyncActions";

export const PlayersCountSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const selectedCount = useAppSelector(selectPlayersCount);

  const min = game?.guest_min ?? 1;
  const max = game?.guest_max ?? 1;

  const [count, setCount] = useState<string | number | undefined>(
    useAppSelector(selectPlayersCount) ?? min ?? 1
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setPlayersCount(count as number));

    if (count !== selectedCount) {
      dispatch(setDate(undefined));
      dispatch(setTime(undefined));
    }
  }, [count])

  const onChange = () => {
    setCount(inputRef.current?.value);
  };
  const onBlur = () => {
    if (!inputRef.current?.value.trim()) setCount(game?.guest_min as number);
    const c = Number.parseInt(count as string);
    if (!c) return;
    if (c < min) setCount(min);
    if (c > max) setCount(max);
  };

  const incr = () => {
    const c = Number.parseInt(count as string);
    if (c < max) {
      setCount(c + 1);
    }
  };

  const decr = () => {
    const c = Number.parseInt(count as string);
    if (c > min) {
      setCount(c - 1);
    }
  };

  const isActive =
    !!count && (count as number) >= min && (count as number) <= max;


  return (
    <>
      <Row justify="center" gutter={[20, 20]}>
        <Col
          xs={24}
          sm={24}
          md={20}
          lg={16}
          xl={14}
          xxl={12}
          className="count-select-bg"
        >
          <img src={vrGlasses} alt="VR очки" className="count-select-img" />
          <div className="count-select-input-row">
            <button className="count-select-input-row-btn" onClick={decr}>
              -
            </button>
            <div className="count-select-input-wrapper">
              <input
                type="number"
                min={min}
                max={max}
                value={count}
                onChange={onChange}
                className="count-select-input"
                onBlur={onBlur}
                ref={inputRef}
              />
            </div>
            <button className="count-select-input-row-btn" onClick={incr}>
              +
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
};
