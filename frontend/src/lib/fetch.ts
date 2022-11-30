import {
    PUBLIC_BACKEND_HOST,
    PUBLIC_BACKEND_PORT
} from "$env/static/public";

export const fetchBackend = async (path: string, options: RequestInit | undefined = undefined) => {
    let url = "";
    
    if (PUBLIC_BACKEND_HOST) {
        // check scheme
        if (!PUBLIC_BACKEND_HOST.startsWith("http://") && !PUBLIC_BACKEND_HOST.startsWith("https://")) url += "http://";
        // remove trailing slash
        if (PUBLIC_BACKEND_HOST.endsWith("/")) url += PUBLIC_BACKEND_HOST.slice(0, -1);
        else url += PUBLIC_BACKEND_HOST;
    }

    if (PUBLIC_BACKEND_PORT) url += `:${PUBLIC_BACKEND_PORT}`;

    const response = await fetch(`${url}/${path}`, options);
    return response;
}
