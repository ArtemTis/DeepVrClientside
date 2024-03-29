import { Modal } from "antd";
import {
  Root as ScrollRoot,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import playersIcon from "../../../../assets/console 1.svg";
import timeIcon from "../../../../assets/clock 1.svg";
import ageIcon from "../../../../assets/vr-glasses 2.svg";

import "./GamesStyles.css";
import { IGame } from "../../../../lib/utils/types";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { selectSelectedCity } from "../../../auth-feature/store/selectors";
import { clearState, setCity, setGame, setStep, setTypeGame } from "../../../booking-feature/store/slice";
import { BOOKING_PATH } from "../../../../lib/utils/routeConstants";
import { NextButton } from "../../../../lib/ui/NextButton";

interface Props {
  game?: IGame;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal: React.FC<Props> = ({ game, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(selectSelectedCity);
  const [useRedirect, setUseRedirect] = useState(false);

  const bookGame = () => {
    if (game && game.rooms && game.rooms.length > 0) {
      const room = game.rooms?.[0];
      dispatch(clearState());
      dispatch(setCity(city));
      dispatch(setTypeGame(room));
      dispatch(setGame(game));
      dispatch(setStep(3)); // players count select
      setUseRedirect(true);
    }
  };

  useEffect(() => {
    setUseRedirect(false);
  }, [game, isOpen]);

  const Footer = () => {
    return (
      <>
        {useRedirect ? (
          <Navigate to={BOOKING_PATH} />
        ) : (
          <div className="game-modal-footer">
            <NextButton
              onClick={bookGame}
              isActive={(game?.rooms?.length ?? 0) > 0}
            >
              Забронировать
            </NextButton>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      {!!game && (
        <Modal
          open={isOpen}
          onCancel={onClose}
          footer={<Footer />}
          title={null}
          closable={false}
        >
          <ScrollRoot type="auto" className="ScrollAreaRoot">
            <Viewport className="ScrollAreaViewport">
              <div className="game-modal-viewport game-modal-container">
                <div className="game-modal-header">{game.title}</div>
                <div className="game-modal-params-row">
                  <div className="game-modal-param">
                    <img
                      className="game-modal-param-img"
                      src={playersIcon}
                      alt="Количество игроков"
                    />
                    {game.guest_min || game.guest_max
                      ? game.guest_max && game.guest_min
                        ? game.guest_min === game.guest_max
                          ? game.guest_min
                          : `${game.guest_min}-${game.guest_max}`
                        : game.guest_min
                        ? `${game.guest_min}+`
                        : `до ${game.guest_max}`
                      : "?"}
                  </div>
                  <div className="game-modal-param">
                    <img
                      className="game-modal-param-img"
                      src={timeIcon}
                      alt="Примерное время"
                    />
                    {game.time_duration}
                  </div>
                  <div className="game-modal-param">
                    <img
                      className="game-modal-param-img"
                      src={ageIcon}
                      alt="Возраст игроков"
                    />
                    {game.age_limit ? `${game.age_limit}+` : "0+"}
                  </div>
                </div>
                <div className="game-modal-image-wrapper">
                  {game.logo && (
                    <img
                      src={game.logo}
                      alt={game.title}
                      className="game-modal-image"
                    />
                  )}
                </div>
                <div className="game-modal-stat-row">
                  <span>Жанр:</span>
                  <span className="game-modal-stat-row-value">
                    {game.genre ?? "Не указан"}
                  </span>
                </div>
                <div className="game-modal-stat-row">
                  <span>
                    {(game.rooms?.length ?? 0) > 1 ? "Залы:" : "Зал: "}
                  </span>
                  <div className="game-modal-stat-row-several-values">
                    {game.rooms?.map((r) => (
                      <span className="game-modal-stat-row-value" key={r.id}>
                        {r.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="game-modal-description">{game.description}</div>
              </div>
            </Viewport>
            <Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
              <Thumb className="ScrollAreaThumb" />
            </Scrollbar>
          </ScrollRoot>
        </Modal>
      )}
    </>
  );
};
