import instance from "../config/HttpClient";
import {AxiosResponse} from "axios";


export const getLast15Days = (lat: string | number | undefined, lon: string | number | undefined): Promise<AxiosResponse<any>> => {
    return instance.get<any>(`${process.env.API_WEATHER_URL}/forecast`, {
        params: {
            lat,
            lon,
            appid: process.env.API_WEATHER_TOKEN
        }
    });
};