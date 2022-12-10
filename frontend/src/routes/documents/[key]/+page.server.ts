import {
    error,
    redirect
} from "@sveltejs/kit";
import * as fetch from "$lib/backend";
import type {
    PageServerLoad
} from "./$types";

export const load: PageServerLoad = async ({
    parent,
    params
}) => {
    // get the key, and remove the file extension if it exists
    const key = params.key.replace(/\.[a-zA-Z0-9]+/gm, "");
    const fileExtension = params.key.match(/\.[a-zA-Z0-9]+/gm)?.[0] || "";
    let res;

    try {
        res = await fetch.fetchBackend(`documents/key/${key}`);
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
        const document = await res.data;
        const {
            props
        } = await parent();
        return {
            props: {
                document: document,
                key: key,
                ext: fileExtension?.includes(".") ? fileExtension : null,
                ...props
            }
        };
    }
}
