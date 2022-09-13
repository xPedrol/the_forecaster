import instance from "../config/httpClient";
import {AxiosResponse} from "axios";

export const getCountries = (): Promise<AxiosResponse<any>> => {
    return instance.get<any>(`${process.env.NEXT_PUBLIC_API_GEO_LOCATION_URL}/countries`, {
        headers: {
            'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_API_GEO_LOCATION_TOKEN as string
        }
    });
};

export const getStatesByCountry = (countryCode:string): Promise<AxiosResponse<any>> => {
    return instance.get<any>(`${process.env.NEXT_PUBLIC_API_GEO_LOCATION_URL}/countries/${countryCode}/states`, {
        headers: {
            'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_API_GEO_LOCATION_TOKEN as string
        }
    });
};

export const getCitiesByCountryAndState = (countryCode:string, stateCode:string): Promise<AxiosResponse<any>> => {
    return instance.get<any>(`${process.env.NEXT_PUBLIC_API_GEO_LOCATION_URL}/countries/${countryCode}/states/${stateCode}/cities`, {
        headers: {
            'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_API_GEO_LOCATION_TOKEN as string
        }
    });
};