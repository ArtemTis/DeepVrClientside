import axios, { AxiosResponse } from "axios"
import { IBookingFields, IChangePassForm, ICity, IEditProfileReq, IGame, IGetBonusesInfoResponse, IGetGamesResponse, IGetSummaryRequestData, IGetUserCityResponse, IGetWorktimeResponse, ILoginByCodeResponse, ILoginForm, ILoginResponse, IOrderHistoryItem, IRegisterForm, IRegisterResponse, IRoom, ISummaryResponse, ITokenDTO, IGameType, IUser, IValidatePromo, IValidatePromoRequestData, IDate, IAvalibleTime } from "./types"

export interface ErrorResponse {
    error: number,
    error_text: string
}

let instanceUrl: string | undefined = '';
let instanceStorageUrl: string | undefined = '';
const globalUrl = process.env.REACT_APP_API_GLOBAL_URL;

export const Api = {
    // utils
    get globalUrl() {
        return globalUrl;
    },
    get instanceUrl() {
        return instanceUrl;
    },
    async getAllCities() {
        return axios.get<Array<ICity>>(
            `${globalUrl}/instances/list`, {
            timeout: 8000
        }
        );
    },

    setInstanceUrl(prefix: string | undefined) {
        const url = `https://${prefix}.${Api.globalUrl?.replace("https://", "")}`
        instanceUrl = url;
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
    async getAllGames() {
        return axios.get<Array<IGame>>(
            `${instanceUrl}/v3/games/all`, {
            timeout: 8000
        }
        );
    },

    async getGamesTypes() {
        return axios.get<Array<IGameType>>(
            `${instanceUrl}/v3/game-types/all`, {   
            timeout: 8000
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

    async getDate(gameId: number, guestCount: number, token: string) {
        return new Promise<IDate[]>((resolve) =>
            setTimeout(() => {
                resolve([{ date: '04.06.23', freePlace: 44 },
                { date: '05.06.23', freePlace: 3 },
                { date: '06.06.23', freePlace: 50 },
                { date: '07.06.23', freePlace: 14 },
                { date: '08.06.23', freePlace: 23 }])
            }, 500)
        )
    },

    // async getAvalibleTime(gameId: number, playersCount: number, token: string, date: string) {
    //     return new Promise<string[]>((resolve) =>
    //         setTimeout(() => {
    //             resolve(['10:00', '11:00', '12:00', '13:00', '22:00'])
    //         }, 500)
    //     )
    // },

    async getAvalibleTime(gameId: number, playersCount: number, token: string, date: string) {
        return axios.get<IAvalibleTime[]>(
            `${instanceUrl}/v3/booking/available?game_id=${gameId}`, {
            timeout: 8000
        }
        );
    },
    
    async getSummary(data: IGetSummaryRequestData) {
        return axios.post<ISummaryResponse>(
            `${instanceUrl}/v3/orders/precalculate`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },

    async validatePromo(data: IValidatePromoRequestData) {
        return axios.post<IValidatePromo>(
            `${instanceUrl}/v3/promo/accept-discount`,
            data, {
            headers: {
                timeout: 8000
            }
        }
        );
    },

    async createBooking(data: IBookingFields) {
        return axios.post(
            `${instanceUrl}/v3/booking/user`,
            data, {
            headers: {
                timeout: 8000
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

    async getHistory(userId: number) {
        return axios.get<Array<IOrderHistoryItem>>(
            `${globalUrl}/orders/history/${userId}`
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

    async setUserCity(data: { token: string, city: string }) {
        return axios.post<any>(
            `${globalUrl}/profile/set-city`,
            data, {
            headers: {
                timeout: 8000
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
    }
}