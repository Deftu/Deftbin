import {
    PUBLIC_BACKEND_HOST,
    PUBLIC_BACKEND_PORT
} from "$env/static/public";

export const fetchBackend = async (path: string, options: RequestInit = {}) => {
    const response = await fetch(`http://${PUBLIC_BACKEND_HOST}:${PUBLIC_BACKEND_PORT}/${path}`, options);
    return response;
}
