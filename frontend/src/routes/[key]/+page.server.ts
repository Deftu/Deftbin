import {
    error,
    redirect
} from "@sveltejs/kit";
import * as fetch from "$lib/fetch";
import type {
    PageServerLoad
} from "./$types";

export const load: PageServerLoad = async ({
    params
}) => {
    // get the key, and remove the file extension if it exists
    const key = params.key.replace(/\.[a-zA-Z0-9]+/gm, "");
    const fileExtension = params.key.match(/\.[a-zA-Z0-9]+/gm)?.[0] || "";
    var res;

    try {
        res = await fetch.fetchBackend(`documents/${key}`);
    } catch (err) {
        throw error(500, {
            message: "An error occurred while fetching the document",
            errMsg: `${err}`
        });
    }

    if (res.status != 200) {
        // redirect to base route
        throw redirect(302, "/");
    } else {
        const document = await res.json();
        return {
            props: {
                document: document,
                key: key,
                ext: fileExtension?.includes(".") ? fileExtension : null
            }
        };
    }
}
