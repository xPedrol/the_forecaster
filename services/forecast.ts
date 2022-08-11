import instance from "../config/HttpClient";
import {AxiosResponse} from "axios";

export const last15Days = (lat: string | number | undefined, lon: string | number | undefined): Promise<AxiosResponse<any>> => {
    return instance.get<any>("/forecast", {
        params: {
            lat,
            lon
        }
    });
};