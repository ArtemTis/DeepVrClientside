import { BookingState } from "../../../Utils/redux/booking/slice";
import { BOOKING_CONFIRM_PATH, BOOKING_CREDITIALS_PATH, BOOKING_DATE_PATH, BOOKING_GAME_PATH, BOOKING_PLAYERS_PATH, BOOKING_TIME_PATH, BOOKING_TYPEGAME_PATH } from "../../../Utils/routeConstants";
import { IBookingFields } from "../../../Utils/types";

// const CurrentPanel = () => {
//   switch (currentStep) {
//     case 0:
//       return <CitySelect />;
//     case 1:
//       return <TypeGameSelect />;
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
  path: string;
  isFinished: (booking: BookingState) => boolean;
}

export const Config: IStep[] = [
  {
    path: BOOKING_TYPEGAME_PATH,
    isFinished: (booking) => booking.typeGame !== null,
  },
  {
    path: BOOKING_GAME_PATH,
    isFinished: (booking) => booking.game !== null,
  },
  {
    path: BOOKING_PLAYERS_PATH,
    isFinished: (booking) => booking.playersCount !== null,
  },
  {
    path: BOOKING_DATE_PATH,
    isFinished: (booking) => booking.date !== null,
  },
  {
    path: BOOKING_TIME_PATH,
    isFinished: (booking) => booking.avalibleTime !== null,
  },
  {
    path: BOOKING_CREDITIALS_PATH,
    isFinished: (booking) => booking.credentials !== null,
  },
  {
    path: BOOKING_CONFIRM_PATH,
    isFinished: (booking) => booking.isFinished !== null,
  },
]