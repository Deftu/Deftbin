import {
    json
} from "@sveltejs/kit";
import * as fetch from "$lib/backend";
import type {
    RequestHandler
} from "./$types";

export const GET: RequestHandler = async ({
    params
}) => {
    const key = params.key;
    const res = await fetch.fetchBackend(`documents/${key}`);
    if (res.status != 200) {
        return json({
            status: 404,
            body: {
                message: "Document not found"
            }
        });
    }

    const document = await res.json();
    return json(document);
}
