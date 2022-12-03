import {
    env
} from "$env/dynamic/public";
import axios, {
    type AxiosRequestConfig
} from "axios";

export function getBackendUrl(): string {
    let url = "";

    const BACKEND_HOST = env.PUBLIC_BACKEND_HOST;
    if (!BACKEND_HOST) throw new Error("BACKEND_HOST is not defined");
    const BACKEND_PORT = env.PUBLIC_BACKEND_PORT || "";

    if (BACKEND_HOST) {
        // check scheme
        if (!BACKEND_HOST.startsWith("http://") && !BACKEND_HOST.startsWith("https://")) url += "http://";
        // remove trailing slash
        if (BACKEND_HOST.endsWith("/")) url += BACKEND_HOST.slice(0, -1);
        else url += BACKEND_HOST;
    }

    if (BACKEND_PORT) url += `:${BACKEND_PORT}`;
    return url;
}

export async function fetchBackend(path: string, options?: AxiosRequestConfig | undefined) {
    const url = getBackendUrl();
    const res = await axios.get(`${url}/${path}`, {
        ...options,
        withCredentials: true
    });
    return res;
}
