import {
    json
} from "@sveltejs/kit";
import * as fetch from "$lib/fetch";
import type {
    RequestHandler
} from "./$types";

export const POST: RequestHandler = async ({
    request
}) => {
    const body = await request.json();
    const res = await fetch.fetchBackend("documents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (res.status != 201) {
        return json({
            status: 500,
            body: {
                message: "Failed to create document"
            }
        });
    }

    const document = await res.json();
    return json(document);
}
