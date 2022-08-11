import instance from "../config/HttpClient";
import {AxiosResponse} from "axios";

export const last15Days = (lat: string, lon: string): Promise<AxiosResponse<any>> => {
    return instance.get<any>("/forecast", {
        params: {
            lat,
            lon
        }
    });
};