import {
    error,
    redirect
} from "@sveltejs/kit";
import type {
    PageServerLoad
} from "./$types";

export const load: PageServerLoad = async ({
    params,
    fetch
}) => {
    // get the key, and remove the file extension if it exists
    const key = params.key.replace(/\.[a-zA-Z0-9]+/gm, "");
    const fileExtension = params.key.match(/\.[a-zA-Z0-9]+/gm)?.[0] || "";
    var res;

    try {
        res = await fetch(`http://localhost:3001/documents/${key}`);
    } catch (err) {
        throw error(500, {
            message: "Could not connect to the server (" + err + ")"
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
