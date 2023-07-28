import { BookingState } from "../../../Utils/redux/booking/slice";
import { BOOKING_CONFIRM_PATH, BOOKING_CREDITIALS_PATH, BOOKING_DATE_PATH, BOOKING_GAME_PATH, BOOKING_PLAYERS_PATH, BOOKING_TIME_PATH, BOOKING_TYPEGAME_PATH } from "../../../Utils/routeConstants";
import { IBookingFields } from "../../../Utils/types";
import { ConfirmBooking } from "./ConfirmBooking";
import { CredentialsForm } from "./CredentialsForm";
import { DateSelect } from "./DateSelect";
import { GameSelect } from "./GameSelect";
import GamesTypeSelect from "./GamesTypeSelect";
import { PlayersCountSelect } from "./PlayersCountSelect";
import { TimeSelect } from "./TimeSelect";

// const CurrentPanel = () => {
//   switch (currentStep) {
//     case 0:
//       return <CitySelect />;
//     case 1:
      // return <TypeGameSelect />;
//     case 2:
//       return <GameSelect />;
//     case 3:
//       return <PlayersCountSelect />;
//     case 4:
//       return <DateSelect />;
//     case 5:
//       return <TimeSelect />;
//     case 6:
//       return <CredentialsForm />;
//     case 7:
//       return <ConfirmBooking />;
//     case 8:
//       return <Done />;
//     default:
//       return null;
//   }
// };

interface IStep {
  component: JSX.Element;
  isFinished: (booking: BookingState) => boolean;
  title: string;
}

export const Config: IStep[] = [
  {
    component: <></>,
    isFinished: (booking) => false,
    title: ''
  },
  {
    component: <GamesTypeSelect />,
    isFinished: (booking) => booking.typeGame !== undefined,
    title: 'Выберите Тип Игры'
  },
  {
    component: <GameSelect />,
    isFinished: (booking) => booking.game !== undefined,
    title: 'Выберите VR игру'
  },
  {
    component: <PlayersCountSelect />,
    isFinished: (booking) => booking.playersCount !== undefined &&  booking.playersCount !== 0,
    title: 'Выберите количество игроков'
  },
  {
    component: <DateSelect />,
    isFinished: (booking) => booking.date !== undefined,
    title: 'Выберите удобный день'
  },
  {
    component: <TimeSelect />,
    isFinished: (booking) => booking.avalibleTime !== undefined,
    title: 'Выберите подходящее время'
  },
  {
    component: <CredentialsForm />,
    isFinished: (booking) => booking.credentials !== undefined,
    title: 'Напишите ваши контакты'
  },
  // {
  //   component: <ConfirmBooking />,
  //   isFinished: (booking) => booking.isFinished !== null,
  //   title: 'Бронирование'
  // },
]