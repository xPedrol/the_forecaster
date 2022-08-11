import instance from "../config/HttpClient";
import {AxiosResponse} from "axios";

export const last15Days = (): Promise<AxiosResponse<any>> => {
    return instance.get<any>("/v1/forecast/locale/3477/days/15");
};