import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../../app/store";
import "../../pages/BookingStyles.css";
import { selectGamesByType, selectGamesByTypeId } from "../../../../games-feature/store/games/selectors";
import { getGameByType } from "../../../../games-feature/store/games/asyncActions";
import { ReqStatus } from "../../../../../lib/utils/enums";
import { selectGame } from "../../../store/selectors";
import { IGame } from "../../../../../lib/utils/types";
import { setCredentials, setDate, setGame, setPlayersCount, setTime } from "../../../store/slice";
import { LoadWrapper } from "../../../../../lib/ui/LoadWrapper";
import { GameCard } from "../../../../../lib/ui/GameCard";
import ErrorText from "../../../../../lib/ui/ErrorText";


export const GameSelect: React.FC = () => {

  const dispatch = useAppDispatch();

  const selectedTypeId = useAppSelector((state: RootState) => state.bookingReducer.typeGame)?.id;
  const selectedGames = useAppSelector((state: RootState) => state.allGames.gameByType);
  const selectedGame = useAppSelector((state: RootState) => selectGamesByType(state, selectedTypeId));

  useEffect(() => {
    dispatch(getGameByType(selectedTypeId))
  }, [])

  const reqStatus = useAppSelector((state: RootState) => state.allGames.requestStatus);
  const isLoading = reqStatus === ReqStatus.pending;
  const isError = reqStatus === ReqStatus.rejected;

  const beforeSelectedGame = useAppSelector(selectGame);
  
  const [selected, setSelected] = useState<IGame | undefined>(beforeSelectedGame);
  console.log(selectedGames);
  
  console.log(selected);

  const onCardClick = (game: IGame) => {
    setSelected(game);
  };

  useEffect(() => {
    dispatch(setGame(selected));

    if (selected?.id !== beforeSelectedGame?.id) {
      dispatch(setDate(undefined));
      dispatch(setTime(undefined));
    }
  }, [selected])


  return (
    <>
      {
        isError
          ?
          <ErrorText>Упс, что-то пошло не так</ErrorText>
          :
          <LoadWrapper isLoading={isLoading}>
            <Row justify="center" gutter={[20, 20]}>
              {selectedGames &&
                selectedGames.fullGames.map((game) => (
                  <GameCard
                    game={game}
                    isSelected={selected?.id === game.id}
                    onClick={onCardClick}
                    key={game.id}
                  />
                ))}
            </Row>
          </LoadWrapper>
      }
    </>
  );
};
