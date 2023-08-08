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
import { IGame, IGameOnType } from "../../../Utils/types";
import { GameCard } from "../../Common/Markup/GameCard";
import { StageLayout } from "./StageLayout";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../BookingStyles.css";
import { gamesTypes } from "../../../Utils/redux/gamesType/asyncActions";
import { selectGamesByType, selectGamesByTypeId } from "../../../Utils/redux/games/selectors";
import { useDispatch } from "react-redux";
import { Title } from "../Components/Title";
import { getGameByType } from "../../../Utils/redux/games/asyncActions";
import { ReqStatus } from "../../../Utils/enums";


export const GameSelect: React.FC = () => {

  const dispatch = useAppDispatch();

  const selectedTypeId = useAppSelector((state: RootState) => state.bookingReducer.typeGame)?.id;
  let selectedGames = useAppSelector((state: RootState) => state.allGames.gameByType);
  let selectedGame = useAppSelector((state: RootState) => selectGamesByType(state, selectedTypeId));

  console.log(selectedGame);
  console.log(selectedGames);


  useEffect(() => {
    dispatch(getGameByType(selectedTypeId))
  }, [])

  const isLoading = useAppSelector((state: RootState) => state.allGames.requestStatus === ReqStatus.pending);

  const beforeSelectedGame = useAppSelector(selectGame);

  const [selected, setSelected] = useState<IGameOnType | undefined>(
    
  );

  const onCardClick = (game: IGameOnType) => {
    setSelected(game);
  };

  useEffect(() => {
    dispatch(setGame(selected));
  }, [selected])



  return (
    <>
      <LoadWrapper isLoading={isLoading}>
        <Row justify="start" gutter={[20, 20]}>
          {selectedGames &&
            selectedGames.games.map((game) => (
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
