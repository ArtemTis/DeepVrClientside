import axios, { AxiosResponse } from "axios"
import { IBookingFields, IChangePassForm, ICity, IEditProfileReq, IGame, IGetBonusesInfoResponse, IGetGamesResponse, IGetSummaryRequestData, IGetUserCityResponse, IGetWorktimeResponse, ILoginByCodeResponse, ILoginForm, ILoginResponse, IOrderHistoryItem, IRegisterForm, IRegisterResponse, IRoom, ISummaryResponse, ITokenDTO, IGameType, IUser, IValidatePromo, IValidatePromoRequestData, IDate, IAvalibleTime, IInstance } from "./types"
import { IStoriesRequest, IThumbnailDto } from "../../features/stories-feature/data/storiesDto";


export interface ErrorResponse {
    error: number,
    error_text: string
}

let instanceUrl: string | undefined = '';
let instanceStorageUrl: string | undefined = '';
const globalUrl = process.env.REACT_APP_API_GLOBAL_URL;
const gamesUrl = process.env.REACT_APP_API_GAMES_URL;

export const Api = {
    // utils
    get globalUrl() {
        return globalUrl;
    },
    get instanceUrl() {
        return instanceUrl;
    },
    async getAllCities(token: string = 'guest_token') {
        return axios.get<Array<ICity>>(
            `${globalUrl}/cities/all`, {
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },
    async getAllInstances(token: string = 'guest_token', cityId: number) {
        return axios.get<Array<IInstance>>(
            `${globalUrl}/instances/${cityId}`, {
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },

    setInstanceUrl(prefix: string | undefined = 'srt2' ) {
        const pref = 'srt2'
        const url = `https://${pref}.${Api.globalUrl?.replace("https://", "")}`
        instanceUrl = url;

        // instanceUrl = 'http://192.168.1.118:5274/api';
        if (url) instanceStorageUrl = url.replace('/api', '/storage');
        else instanceStorageUrl = undefined;
    },

    getImageUrl(url: string) {
        return url ? `${instanceStorageUrl}/${url}` : null;
    },

    checkStatus(response: AxiosResponse<any>) {
        return response.status >= 200 && response.status < 300;
    },

    async getUserByToken(data: ITokenDTO) {
        return axios.post<IUser>(
            `${globalUrl}/auth/loginByRememberedToken`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },

    async getGameInfo(instancePrefix: string, id: number) {
        const url = globalUrl?.replace('https://', '');
        return axios.get<IGame>(
            `https://${instancePrefix}${instancePrefix ? '.' : ''}${url}/game/${id}`, {
            timeout: 8000
        }
        );
    },

    // home
    // async getAllGames(token: string = 'guest_token') {
    //     return axios.get<Array<IGame>>(
    //         `${instanceUrl}/v3/games/all`, {
    //         timeout: 8000,
    //         headers: {
    //             token: token
    //         }
    //     }
    //     );
    // },

    async getAllGames(token: string = 'guest_token') {
        return axios.get<Array<IGame>>(
            `${gamesUrl}/games/gipno`, {//antientropiia
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },

    // async getGamesTypes(token: string = 'guest_token') {
    //     return axios.get<Array<IGameType>>(
    //         `${instanceUrl}/v3/game-types/all`, {
    //         timeout: 8000,
    //         headers: {
    //             token: token
    //         }
    //     }
    //     );
    // },

    async getGamesTypes(token: string = 'guest_token') {
        return axios.get<Array<IGameType>>(
            `${gamesUrl}/game-types`, {
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },

    async getGameByType(id: number | undefined, token: string = 'guest_token') {
        return axios.get<IGetGamesResponse>(
            `${instanceUrl}/v3/game-types/${id}/games`, {
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },

    // booking
    async getAllRooms() {
        return axios.get<Array<IRoom>>(
            `${instanceUrl}/rooms`, {
            timeout: 8000
        }
        );
    },

    async getGamesOfRoom(roomId: number) {
        return axios.get<IGetGamesResponse>(
            `${instanceUrl}/room/${roomId}`, {
            timeout: 8000
        }
        );
    },

    async getTimesOfDay(date: Date) {
        return axios.get<IGetWorktimeResponse>(
            `${instanceUrl}/v3/worktime?date=${date.toISOString().substring(0, 10)}`, {
            timeout: 8000
        }
        );
    },

    async getAvalibleTime(gameId: number, playersCount: number, token: string, date: string) {
        return axios.get<IAvalibleTime[]>(
            `${instanceUrl}/v3/booking/available?game_id=${gameId}`, {
            timeout: 8000
        }
        )
    },

    async getAvalibleDateAndTime(gameId: number, playersCount: number, token: string = 'guest_token') {
        return axios.get<IAvalibleTime[]>(
            `${instanceUrl}/v3/booking/available?gameId=${gameId}&guestCount=${playersCount}`, {
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },

    async getSummary(data: IGetSummaryRequestData, token: string = 'guest_token') {
        return axios.post<ISummaryResponse>(
            // `${instanceUrl}/v3/orders/precalculate`,
            `http://192.168.1.118:5274/api/v3/orders/precalculate`,
            data, {
            headers: {
                timeout: 8000,
                token: token
            }
        }
        );
    },

    async validatePromo(data: IValidatePromoRequestData, token: string = 'guest_token') {
        return axios.post<IValidatePromo>(
            `${instanceUrl}/v3/promo/accept-discount`,
            data, {
            headers: {
                timeout: 8000,
                token: token
            }
        }
        );
    },
    ///////////////////////////////////////////
    async createBooking(data: IGetSummaryRequestData, token: string = 'guest_token') {
        return axios.post(
            `${instanceUrl}/v3/order/create`,
            data, {
            headers: {
                timeout: 8000,
                token: token
            }
        }
        );
    },

    async createBookingById(id: string, data: {
        gameId: number,
        time: string,
        guestCount: number,
    },
        token: string = 'guest_token'
    ) {
        return axios.put(
            `${instanceUrl}/v3/orders/${id}/bookings`,
            data, {
            headers: {
                timeout: 8000,
                token: token
            }
        }
        );
    },

    // async precalculate(token: string ='guest_token') {
    //     return axios.post(
    //         `${instanceUrl}/v3/orders/precalculate`,
    //         {},
    //         {
    //             headers: {
    //                 token: token
    //             }
    //         }
    //     )
    // },

    async createEmpty(token: string ='guest_token') {
        return axios.post(
            `${instanceUrl}/v3/orders/create-empty`,
            {},
            {
                headers: {
                    token: token
                }
            }
        );
    },

    // end booking

    // account
    async login(data: ILoginForm) {
        return axios.post<ILoginResponse>(
            `${globalUrl}/auth/login`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },

    async loginSendCode(data: { phone: string }) {
        return axios.post<ILoginByCodeResponse>(
            `${globalUrl}/auth/send-auth-code`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },

    async register(data: IRegisterForm) {
        console.log('globalUrl: ' + globalUrl);

        return axios.post<IRegisterResponse>(
            `${globalUrl}/auth/registration`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },

    async getBonusesInfo(data: ITokenDTO) {
        return axios.get<IGetBonusesInfoResponse>(
            `${globalUrl}/bonus/get`,
            {
                headers: {
                    ...data
                }
            }

        );
    },

    async getHistory(userId: number, token: string) {
        return axios.get<Array<IOrderHistoryItem>>(
            `${globalUrl}/orders/history/${userId}`,
            {
                headers: {
                    token
                }
            }
        );
    },

    async logout(data: ITokenDTO) {
        return axios.post<any>(
            `${globalUrl}/auth/logout`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },

    async getUserCity(token: string) {
        return axios.get<IGetUserCityResponse>(
            `${globalUrl}/profile/get-city`,
            {
                headers: {
                    token
                }
            }
        )
    },

    async setUserCity(token: string, city: ICity ) {
        return axios.post<any>(
            `${globalUrl}/profile/set-city`,
            city, {
            headers: {
                timeout: 8000,
                token: token
            }
        }
        )
    },

    async editProfile(data: IEditProfileReq) {
        return axios.post<IUser>(
            `${globalUrl}/profile/edit-info`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        )
    },

    async changePass(data: IChangePassForm) {
        return axios.post<any>(
            `${globalUrl}/profile/edit-password`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },


    async getAllThumbnails(token: string ='guest_token') {
        return axios.get<Array<IThumbnailDto>>(
            `${instanceUrl}/v3/stories/groups/active`, {
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },

    async getGroupStoriesById(id: number, token: string ='guest_token') {
        return axios.get<Array<IStoriesRequest>>(
            `${instanceUrl}/v3/stories/groups/${id}/active`, {
            timeout: 8000,
            headers: {
                token: token
            }
        }
        );
    },


}
