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
    const body = await request.text();
    const res = await fetch.fetchBackend("new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
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
    return json({
        status: 200,
        body: document
    });
}
