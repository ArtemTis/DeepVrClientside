import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Api } from "../../../Utils/api";
import {
  selectGame
} from "../../../Utils/redux/booking/selectors";
import {
  decreaseStep,
  increaseStep,
  setGame
} from "../../../Utils/redux/booking/slice";
import { RootState, useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { IGame } from "../../../Utils/types";
import { GameCard } from "../../Common/Markup/GameCard";
import { StageLayout } from "./StageLayout";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../BookingStyles.css";
import { gamesTypes } from "../../../Utils/redux/gamesType/asyncActions";
import { selectGamesByType } from "../../../Utils/redux/games/selectors";
import { useDispatch } from "react-redux";
import { Title } from "../Components/Title";

enum ReqStatus {
  pending,
  fulfield,
  rejected
}

export const GameSelect: React.FC = () => {

  const dispatch = useDispatch();

  const selectedTypeId = useAppSelector((state: RootState) => state.bookingReducer.typeGame)?.id;
  let selectedGame = useAppSelector((state: RootState) => selectGamesByType(state, selectedTypeId));


  console.log(selectedTypeId);
  

  const isLoading = useAppSelector((state: RootState) => state.allGames.requestStatus === ReqStatus.pending);

  const [selected, setSelected] = useState<IGame | undefined>(
    useAppSelector(selectGame) as IGame
  );

  const onCardClick = (game: IGame) => {
    setSelected(game);
  };

  useEffect(() => {
    dispatch(setGame(selected));
  },[selected])



  return (
    <>
      <LoadWrapper isLoading={isLoading}>
        <Row justify="start" gutter={[20, 20]}>
          {selectedGame &&
            selectedGame.map((game) => (
              <GameCard
                game={game}
                isSelected={selected?.id === game.id}
                onClick={onCardClick}
                key={game.id}
              />
            ))}
        </Row>
      </LoadWrapper>
    </>
  );
};
