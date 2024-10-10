export type IChildren =
  | React.ReactElement
  | Array<React.ReactElement>
  | React.ReactFragment
  | Array<React.ReactFragment>
  | string
  | boolean
  | null
  | undefined;

export interface IUser {
  avatar: string;
  category_loyalty_id: number | null;
  created_at: string;
  email: string;
  city: ICity;
  email_verified_at: string | null;
  id: number;
  name: string;
  phone: string;
  role_id: number;
  settings: any;
  temp_password: string | null;
  updated_at: string;
  error?: number;
  error_text?: string;
}

export interface ICity {
  id: number,
  name: string,
  instances?: [
    {
      id: number,
      name: string,
      city: null,
      cityId: number,
      code: string,
      ownerId: number,
      createdAt: string,
      updatedAt: string,
      users: []
    }
  ]
}

export interface IInstance {
  id: number,
  name: string,
  city?: {
    id: number,
    name: string,
    instances: [
      string
    ]
  },
  cityId?: number,
  code?: string,
  ownerId?: number,
}

// export interface ICity {
//   id: number,
//   name: string,
//   city: string,
//   owner_id: number,
//   created_at: string,
//   updated_at: string,
//   code: string,
//   pivot: {
//     user_id: number,
//     instance_id: number
//   }
// }

export interface IRoom {
  id: number,
  title: string,
  guest_max: number,
  pivot?: {
    game_id: number,
    room_id: number,
  }
}
export interface IGameType {
  id: number,
  title: string,
  guest_max: number,
  guest_min: number,
  time_duration: number,
  need_all_room: number,
}

export interface IAvalibleTime {
  date: string,
  times: []
}

// export interface IGame {
//   id: number,
//   title: string,
//   games: [
//     {
//       id: number,
//       externalId: string,
//       titleOverride: string,
//       priceOverride: number,
//       logoOverride: string,
//       timeDuration: number,
//       descriptionOverride: string,
//       gameTypeId: number
//     }
//   ],
//   fullGames: [
//     {
//       id: string,
//       owner_id: number,
//       name: string,
//       use_key: number,
//       created_at: string,
//       updated_at: string,
//       title: string,
//       slug: string,
//       time_duration: string,
//       price: number,
//       is_active: number,
//       logo: string,
//       guest_min: string,
//       guest_max: string,
//       description: string,
//       age_limit: string,
//       images: [
//         string
//       ],
//       video: string,
//       genre: string,
//       actual_build: string,
//       gameTypeId: number
//     }
//   ]
// }

export interface IGame {
  id: string,
  title: string,
  slug: string,
  time_duration: number,
  price: number,
  externalId: string,
  game_type_id?: number,
  game_type_title?: string,
  is_active: number,
  deleted_at: string,
  created_at: string,
  updated_at: string
  logo: string,
  guest_min: number,
  guest_max: number,
  description: string,
  age_limit: number,
  images: any,
  video: any,
  descriptio: any,
  genre: string,
  pivot: {
    room_id: number,
    game_id: number
  }
  rooms?: Array<IRoom>,
}

export interface IGetGamesResponse {
  id: number,
  title: string,
  games: Array<IGameOnType>,
  fullGames: Array<IGame>
}

export interface IGameOnType {
  id: 0,
  externalId: string,
  titleOverride: string,
  priceOverride: 0,
  logoOverride: string,
  timeDuration: 0,
  descriptionOverride: string,
  gameTypeId: 0,
  gameType: string
}

export interface IBookingCredentials {
  name: string,
  phone: string,
  token?: string,
  licenseAgree: boolean,
  date?: string,
  time?: string,
  comment?: string,
  promo?: string;
  useDiscount?: boolean;
}

export interface IGetWorktimeResponse {
  start_at: string,
  end_at: string,
  interval: string,
  glasses: string
}

export interface ISummaryResponse {
  paymentInfo: {
    bonus: number,
    promocode: string,
    certificates: [
      string
    ]
  },
  price: number,
  promo: number,
  bonus: number,
  certificates: number,
  total: number,
  discount: number
}
// export interface ISummaryResponse {
//   price: number,
//   bonus_discount?: number,
//   promo_discount?: number,
//   total: number,
// }

export interface IGetSummaryRequestData {
  client: {
    phone: string,
    name: string,
    id: number | null
  },
  bookings: [
    {
      gameId: string,
      time: string,
      guestCount: number,
      id: number | null
    }
  ],
  paymentInfo: {
    bonus: number | null,
    promoCode: string | null,
    certificates: [
      string
    ] | null
  }
}
// export interface IGetSummaryRequestData {
//   game_id: number,
//   guest_count: number,
//   user_id?: number,
//   use_bonus?: boolean,
//   promocode?: string
// }

export interface IValidatePromo {
  promo_type: string,
  promo_info: {
    type: string,
    amount: number,
    amount_from: number,
    game: boolean,
    game_type: boolean
  },
  price: number,
  discount: number,
  discount_price: number,
  error?: number;
  error_text?: string;
}

export interface ILoginForm {
  phone?: string;
  email?: string;
  password?: string;
  code?: string
}

export interface ILoginResponse {
  error: number | string;
  error_text: string;
  token: string;
  client: IUser;
}

export interface IValidatePromoRequestData {
  token: string,
  promo_code: string,
  price: number,
  game: number
}



export interface IBookingFields {
  certificates?: Array<string>,
  date: string,
  phone: string,
  token?: string,
  promo_code: string,
  comment?: string,
  bonus?: number,
  name: string,
  booking: {
    time: string,
    guest_quantity: number,
    typeGame_id: number,
    game_id: number
  }
}

export interface IRegisterForm {
  phone: string,
  password: string,
  'password-repeat': string,
  email: string,
}

export interface IRegisterResponse {
  error: number,
  error_text: string,
  token: string,
  client: IUser
};

export interface ILoginByCodeResponse {
  error: number,
  error_text: string,
  token: string;
}

export interface ITokenDTO {
  token: string;
}

export interface IGetBonusesInfoResponse {
  quantity_all: number,
  quantity_real: number,
  quantity_expired: number,
  next_expired_date: string,
  loyalty_category: {
    amount_discount_max: number,
    amount_min: number,
    cashback: number,
    entry_condition: number,
    id: number,
    title: string
  }
}

export interface IEditProfileForm {
  name: string,
  phone: string,
  email: string,
}

export interface IChangePassForm {
  token: string,
  password: string,
  'password-repeat': string,
  newPassword: string,
}

export interface IBookingHistory {
  id: number,
  bookingDate: string,
  gameId: string,
  roomId: number,
  guestCount: number,
  orderId: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  gameTypeId: number,
  game: {
    id: number,
    externalId: string,
    titleOverride: string,
    priceOverride: number,
    logoOverride: string,
    timeDuration: number,
    descriptionOverride: string,
    gameTypeId: number
  }
}

export interface IOrderHistoryItem {
  id: string,
  client: {
    id: number,
    name: string,
    phone: string
  },
  bookings: [
    IBookingHistory
  ],
  priceInfo: {
    paymentInfo: {
      bonus: number,
      promocode: string,
      certificates: string[],
    },
    price: number,
    promo: number,
    bonus: number,
    certificates: number,
    total: number,
    discount: number
  }
}

export interface IGetUserCityResponse {
  city: string;
}

export interface IEditProfileReq {
  token: string,
  name?: string,
  email?: string,
  phone?: string,
}

export interface IDate {
  date: string,
  freePlace: number
}

export interface IAvalibleTime {
  date: string,
  hours: []
}
