import { BookingState } from "../../../store/slice";
import { ConfirmBooking } from "./ConfirmBooking";
import { CredentialsForm } from "./CredentialsForm";
import { DateSelect } from "./DateSelect";
import FilialSelect from "./FilialSelect";
import { GameSelect } from "./GameSelect";
import GamesTypeSelect from "./GamesTypeSelect";
import { PlayersCountSelect } from "./PlayersCountSelect";
import { TimeSelect } from "./TimeSelect";


interface IStep {
  component: JSX.Element;
  isFinished: (booking: BookingState) => boolean;
  title: string;
}

export const Config: IStep[] = [
  {
    component: <FilialSelect/>,
    isFinished: (booking) => booking.instance !== undefined,
    title: 'Адреса'
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
    isFinished: (booking) => booking.date !== 'undefined',
    title: 'Выберите удобный день'
  },
  {
    component: <TimeSelect />,
    isFinished: (booking) => booking.selectedTime?.length === 5,
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