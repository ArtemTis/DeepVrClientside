import { Col, Row } from "antd";
import { ColLg } from "../../Common/Markup/ColLg";
import { useEffect, useRef, useState } from "react";
import { IGame } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { selectSelectedCity } from "../../../Utils/redux/auth/selectors";
import { setSelectedCity } from "../../../Utils/redux/auth/slice";
import { GameCard } from "../../Common/Markup/GameCard";
import { GameModal } from "./GameModal";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../GamesStyles.css";

import searchIcon from "../../../Assets/magnifier.svg";
import crossWhite from "../../../Assets/crossWhite.svg";
import arrowRight from "../../../Assets/arrow-right.svg";
import { getAllGames } from "../../../Utils/redux/games/asyncActions";
import { selectGames } from "../../../Utils/redux/games/selectors";
import { ReqStatus } from "../../../Utils/enums";

import 'stories-react/dist/index.css';
import ThumbnailsContainer from "../../../feature/stories-feature/presentation/ThumbnailsContainer";
import ModalContainer from "../../../feature/games-details-feature/presentation/ModalContainer";
import { Link, useLocation } from "react-router-dom";
import { HOME_PATH } from "../../../Utils/routeConstants";
import GamesCard from "../../../feature/games-details-feature/presentation/GamesCard";

export const GamesList: React.FC = () => {
  // const [games, setGames] = useState<Array<IGameResponse>>();
  const [gamesFiltered, setGamesFiltered] = useState<Array<IGame>>();
  const city = useAppSelector(selectSelectedCity);
  const [modalState, setModalState] = useState<IGame | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchString, setSearchString] = useState<string>();

  // const [isLoading, setIsLoading] = useState(false);

  const isLoading = useAppSelector(state => state.allGames.requestStatus) === ReqStatus.pending;

  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    Api.setInstanceUrl(city?.code);

    dispatch(getAllGames());
  }, []);

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

  // const openModal = (game: IGame) => {
  //   setModalState(game);
  // };

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
    <>
      <div className="home-wrapper">
        {/* <GameModal game={modalState} isOpen={!!modalState} onClose={closeModal} /> */}
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

        <span className="title_games">Новости</span>
        <ThumbnailsContainer />

        <span className="title_games">Игры</span>
        <LoadWrapper isLoading={isLoading}>
          {/* <Row justify="start" gutter={[20, 20]}> */}
          <div className="gamesRow">
            <GamesCard />
            {/* {gamesFiltered &&
              gamesFiltered.map((game) => (
                <Link to={`${HOME_PATH}${game.id}`} key={game.id} state={{ previousLocation: location }}>
                  <GameCard
                    game={game}
                    isSelected={false}
                    // onClick={() => openModal(game)}
                  />
                </Link>

              ))} */}
          {/* </Row> */}</div>
        </LoadWrapper>
      </div>
    </>
  );
};
