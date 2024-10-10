import { Button, Col, Dropdown, MenuProps, Modal, Popover, Radio, RadioChangeEvent, Row, Space } from "antd";
import { ReactElement, useEffect, useRef, useState } from "react";
import { GameModal } from "./GameModal";

import "./GamesStyles.css";

import searchIcon from "../../../../assets/magnifier.svg";
import crossWhite from "../../../../assets/crossWhite.svg";
import arrowRight from "../../../../assets/arrow-right.svg";
import arrow from "../../../../assets/arrow-down.svg";
import avatar from "../../../../assets/Avatar.svg";
import notification from "../../../../assets/Notification.svg";

import 'stories-react/dist/index.css';
import { IGame } from "../../../../lib/utils/types";
import { selectIsAuthorised, selectSelectedCity, selectToken, selectUser } from "../../../auth-feature/store/selectors";
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
import { useLocation } from "react-router";
import GamesCard from "../../../games-details-feature/presentation/GamesCard";
import { setCity, setStep } from "../../../booking-feature/store/slice";
import { CitySelectHome } from "./CitySelectHome";
import styled from "styled-components";
import { selectBookingInstance, selectCity } from "../../../booking-feature/store/selectors";
import CitySelectList from "./CitySelectList";
import { Link } from "react-router-dom";
import { ACCOUNT_PATH, PROFILE_PATH } from "../../../../lib/utils/routeConstants";
import ErrorText from "../../../../lib/ui/ErrorText";
import { SelectInstanceList } from "../../../../lib/ui/SelectInstanceList";
import { selectAllInstances } from "../../../profile-feature/store/selectors";
import InstanceSelectList from "../../../games-details-feature/presentation/InstanceSelectList";
import { allInstances } from "../../../profile-feature/store/asyncActions";
import useGameType from "../../../../lib/utils/hooks/useGameTypes";
import { gamesTypes } from "../../store/gamesType/asyncActions";
import { selectGameTypes } from "../../store/gamesType/selectors";

export const GamesList: React.FC = () => {
  // const [games, setGames] = useState<Array<IGameResponse>>();
  const [gamesFiltered, setGamesFiltered] = useState<Array<IGame>>();
  const city = useAppSelector(selectCity);
  const [modalState, setModalState] = useState<IGame | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const instances = useAppSelector(selectAllInstances);

  const isAuthorised = useAppSelector(selectIsAuthorised);
  const nametUser = useAppSelector(selectUser);
  const [searchString, setSearchString] = useState<string>();


  const requestStatus = useAppSelector(state => state.allGames.requestStatus);
  const isLoading = requestStatus === ReqStatus.pending;
  const isError = requestStatus === ReqStatus.rejected;

  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // const {gameTypes, isLoading : gameTypesIsLoading} = useGameType();

  const gameTypes = useAppSelector(selectGameTypes);

  useEffect(() => {
    if (city) {

      // Api.setInstanceUrl(city?.instances[0].code);
      Api.setInstanceUrl();

      dispatch(getAllGames());
      dispatch(allInstances());
      dispatch(gamesTypes());

      if (instances.length === 1) {
        dispatch(setStep(1))
      }
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

  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // const resetCity = () => {
  //   dispatch(setSelectedCity(undefined));
  //   dispatch(setCity(undefined));
  //   setIsOpen(true);
  // };

  const selectedCity = useAppSelector(selectCity);
  // const selectedInstance = useAppSelector(selectBookingInstance);

  const [open, setOpen] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const contentItems: {
    element: JSX.Element;
    type: string;
  }[] = [
      {
        element: <CitySelectList setIslOpen={setOpen} selectedCity={selectedCity} setIsOpenModal={setIsModalOpen}/>,
        type: 'city'
      },
      {
        element: <InstanceSelectList setIslOpen={setOpen} setIsOpenModal={setIsModalOpen}/>,
        type: 'instance'
      }
    ]

  const [content, setContent] = useState<JSX.Element>(contentItems[0].element);

  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === 'city') {
      setContent(contentItems.find(item => item.type === 'city')?.element!!)
    } else {
      setContent(contentItems.find(item => item.type === 'instance')?.element!!)
    }
  };

  const radioSelect =
    <StyledGroup defaultValue="city" buttonStyle="solid" onChange={onChange}>
      <StyledRadio value="city">
        Город
      </StyledRadio>
      <StyledRadio value="instance">
        Филиал
      </StyledRadio>
    </StyledGroup>;



  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="home-wrapper">
      <StyledHeader>

        <h1 className="title_games">Новости</h1>

        {
          isAuthorised &&
          <StyledProfile>
            <Link to={ACCOUNT_PATH}>
              <img src={avatar} alt="иконка профиля" />
              <h2>{nametUser?.name}</h2>
            </Link>
            <img src={notification} alt="уведомления" />
          </StyledProfile>
        }
      </StyledHeader>
      <ThumbnailsContainer />

      <h1 className="title_games">Игры</h1>
      <GamesWrappwe>
        <Filters>
          <Filter>
            Всё
          </Filter>
          <Filter>
            Квест
          </Filter>
          <Filter>
            Шутер
          </Filter>
          <Filter>
            Бродилки
          </Filter>
        </Filters>

        <SearchWrapper>
          <div>
            {/* {isSearchOpen ? ( */}
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
              <img
                src={searchIcon}
                alt="Поиск"
                className="home-title-img home-title-img-search"
                onClick={openSearch}
              />
            </div>
          </div>

          {/* <StyledPopover placement="bottomRight"
            title={text}
            content={content}
            arrow={false}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}>
            <Filter>Город/Филиал
              <img src={arrow} alt="Стрелка" />
            </Filter>

          </StyledPopover> */}

          <Filter onClick={showModal}>Город/Филиал
            {/* <img src={arrow} alt="Стрелка" /> */}
          </Filter>



        </SearchWrapper>
      </GamesWrappwe>
      {
        isError
          ?
          <ErrorText>Упс, что-то пошло не так</ErrorText>
          :
          <LoadWrapper isLoading={isLoading}>
            <div className="gamesRow">
              {gamesFiltered &&
                gamesFiltered.map((game) => (
                  <GamesCard game={game} key={game.id} gameTypes={gameTypes} />
                ))}
            </div>
          </LoadWrapper>
      }


      <StyledModal open={isModalOpen} footer={[]} closeIcon={<></>} onCancel={handleCancel}>
        {
          radioSelect
        }
        {
          content
        }
      </StyledModal>
    </div>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  >img{
    width: 28px;
    height: 28px;
  }

  a{
    display: flex;
    align-items: center;
    gap: 12px;
    h2{
      color: var(--White, #FFF);
      font-family: SF Pro Display;
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
    }

    >img{
    width: 40px;
    height: 40px;
  }
  }
`

// const ModalWrapper = styled.div`
//   &.ant-modal{
//     width: 364px !important;
//   }

//   .ant-modal-wrap{
//     .ant-modal{
//     width: 364px !important;
//   }
//   }
// `

const StyledModal = styled(Modal) <{ open: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  /* background: ${({ open }) => (open ? '#55C1E7' : '')} !important; */
  color: ${({ open }) => (open ? 'white' : '')} !important;

  &.ant-modal{
    width: 400px !important;
  }
  
  img{
    width: 20px;
    transform: ${({ open }) => (open ? '' : 'rotateX(180deg) rotateY(180deg)')};
  }

  @media screen and (max-width: 530px) {
    justify-content: space-between;
    width: 90vw;
  }
`

const StyledPopover = styled(Popover) <{ open: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ open }) => (open ? '#55C1E7' : '')} !important;
  color: ${({ open }) => (open ? 'white' : '')} !important;
  
  img{
    width: 20px;
    transform: ${({ open }) => (open ? '' : 'rotateX(180deg) rotateY(180deg)')};
  }

  @media screen and (max-width: 530px) {
    justify-content: space-between;
    width: 90vw;
  }
  
`

const GamesWrappwe = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    gap: 20px;
  }
`
const Filters = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`
const Filter = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 16px;
  white-space: nowrap;

  border-radius: 24px;
  background: #3A3A6B;
  cursor: pointer;

  color: rgba(255, 255, 255, 0.70);
  font-family: SF Pro Display;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 24px */
  margin: 0;

  a{
    color: rgba(255, 255, 255, 0.70);
  }
`
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  >div{
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 530px) {
    align-items: start;
    flex-direction: column;
  }
`
const StyledGroup = styled(Radio.Group)`
  padding: 8px;

  border-radius: 30px;
  background: rgba(255, 255, 255, 0.11);

  margin-bottom: 20px;

  display: block;
`


const StyledRadio = styled(Radio.Button)`
  color: var(--abafe-5, #ABAFE5);
  text-align: center;
  font-family: Gilroy;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: 0.04px;
  width: 150px;

  &.ant-radio-button-wrapper{
    background: none !important;
    border: none !important;
    padding: 13px 22px;
    height: 54px;

    :hover{
      color: #ABAFE5;
    }

    &::before{
      content: none;
    }
  }

  &.ant-radio-button-wrapper-checked{
    border-radius: 25px;
    background: #30A5D1 !important;

    color: #FFF;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
`