import instance from "../config/httpClient";
import {AxiosResponse} from "axios";


export const getLast15Days = (lat: string | number | undefined, lon: string | number | undefined): Promise<AxiosResponse<any>> => {
    return instance.get<any>(`${process.env.NEXT_PUBLIC_API_WEATHER_URL}/forecast`, {
        params: {
            lat,
            lon,
            units: 'metric',
            appid: process.env.NEXT_PUBLIC_API_WEATHER_TOKEN
        }
    });
};
export const getLast15DaysByCityName = (cityName:string): Promise<AxiosResponse<any>> => {
    return instance.get<any>(`${process.env.NEXT_PUBLIC_API_WEATHER_URL}/forecast`, {
        params: {
            q: cityName,
            units: 'metric',
            appid: process.env.NEXT_PUBLIC_API_WEATHER_TOKEN
        }
    });
};