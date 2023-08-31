import { Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { GameModal } from "./GameModal";

import "./GamesStyles.css";

import searchIcon from "../../../../Assets/magnifier.svg";
import crossWhite from "../../../../Assets/crossWhite.svg";
import arrowRight from "../../../../Assets/arrow-right.svg";

import 'stories-react/dist/index.css';
import { IGame } from "../../../../lib/utils/types";
import { selectSelectedCity } from "../../../auth-feature/store/selectors";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { ReqStatus } from "../../../../lib/utils/enums";
import { Api } from "../../../../lib/utils/api";
import { getAllGames } from "../../store/games/asyncActions";
import { selectGames } from "../../store/games/selectors";
import { setSelectedCity } from "../../../auth-feature/store/slice";
import { ColLg } from "../../../../lib/ui/ColLg";
import ThumbnailsContainer from "../../../stories-feature/presentation/ThumbnailsContainer";
import { LoadWrapper } from "../../../../lib/ui/LoadWrapper";
import { GameCard } from "../../../../lib/ui/GameCard";

export const GamesList: React.FC = () => {
  // const [games, setGames] = useState<Array<IGameResponse>>();
  const [gamesFiltered, setGamesFiltered] = useState<Array<IGame>>();
  const city = useAppSelector(selectSelectedCity);
  const [modalState, setModalState] = useState<IGame | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchString, setSearchString] = useState<string>();


  const isLoading = useAppSelector(state => state.allGames.requestStatus) === ReqStatus.pending;

  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (city) {
      Api.setInstanceUrl(city?.code);

      dispatch(getAllGames());
    }

  }, [city]);

  const games = useAppSelector(selectGames);

  useEffect(() => {
    const substrings = searchString?.toLocaleLowerCase().split(" ");
    if (substrings)
      setGamesFiltered(
        games?.filter((game) =>
          substrings.every((substring) =>
            game.title.toLocaleLowerCase().includes(substring)
          )
        )
      );
    else setGamesFiltered(games);
  }, [searchString, games]);

  const openModal = (game: IGame) => {
    setModalState(game);
  };

  const closeModal = () => {
    setModalState(undefined);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchRef.current?.focus();
    }, 4);
  };

  const onSearch: React.FormEventHandler<HTMLInputElement> = (e) => {
    setSearchString(e.currentTarget.value);
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.currentTarget.value) {
      setIsSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchString(undefined);
    searchRef.current!.value = "";
    setTimeout(() => {
      searchRef.current?.focus();
    }, 4);
  };

  const onSearchBgClick = () => {
    searchRef.current?.focus();
  };

  const resetCity = () => {
    dispatch(setSelectedCity(undefined));
  };


  return (
    <div className="home-wrapper">
      <GameModal game={modalState} isOpen={!!modalState} onClose={closeModal} />
      <Row justify="center" className="header-sticky">
        <ColLg className="home-header-wrapper">
          <div className="home-header">
            <div className="home-subtitle">Игры</div>
            {isSearchOpen ? (
              <div className="home-search-bg" onClick={onSearchBgClick}>
                <input
                  className="home-search-input"
                  placeholder="Поиск"
                  onInput={onSearch}
                  onBlur={onBlur}
                  ref={searchRef}
                />
                {searchString && (
                  <img
                    className="home-search-cross"
                    src={crossWhite}
                    alt="Очистить поиск"
                    onClick={clearSearch}
                  />
                )}
              </div>
            ) : (
              <div className="home-search-placeholder" onClick={openSearch} />
            )}
            <img
              src={searchIcon}
              alt="Поиск"
              className="home-title-img home-title-img-search"
              onClick={openSearch}
            />
          </div>
          <div className="home-subheader">
            <div>
              Выбрано: <span className="home-subheader-city">{city?.name}</span>
            </div>
            <div className="home-subheader-change-city" onClick={resetCity}>
              Выбрать другой город
              <img src={arrowRight} className="" alt="" />
            </div>
          </div>
        </ColLg>
      </Row>

      <ThumbnailsContainer />

      <LoadWrapper isLoading={isLoading}>
        <Row justify="start" gutter={[20, 20]}>
          {gamesFiltered &&
            gamesFiltered.map((game) => (
              <GameCard
                game={game}
                isSelected={false}
                key={game.id}
                onClick={() => openModal(game)}
              />
            ))}
        </Row>
      </LoadWrapper>
    </div>
  );
};
