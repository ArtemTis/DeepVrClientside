import { Col, Row } from "antd";
import { useRef, useState } from "react";
import {
  decreaseStep,
  increaseStep,
  setPlayersCount,
} from "../../../Utils/redux/booking/slice";
import { selectGame, selectPlayersCount } from "../../../Utils/redux/booking/selectors";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";
import { IGame, IGameType, IRoom } from "../../../Utils/types";

import "../BookingStyles.css";

import vrGlasses from "../../../Assets/Очки 3.png";
import { selectGameTypes } from "../../../Utils/redux/gamesType/selectors";

export const PlayersCountSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame) as IGame;
  const typeGame = useAppSelector(selectGameTypes)[0] as IGameType;


  const min = game.guest_min ?? 1;
  const max = game.guest_max
    ? game.guest_max < typeGame.guest_max
      ? game.guest_max
      : typeGame.guest_max
    : typeGame.guest_max;

  const [count, setCount] = useState<string | number | undefined>(
    useAppSelector(selectPlayersCount) ?? game?.guest_min ?? 1
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const onNextClick = () => {
    if (!!count) {
      dispatch(setPlayersCount(count as number));
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

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
    <StageLayout
      title="Выберите количество игроков"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={isActive}
    >
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
    </StageLayout>
  );
};
