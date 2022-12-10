import type {
    LayoutServerLoad
} from "./$types";
import {
    loadUser
} from "$lib/user/user";

export const load: LayoutServerLoad = async ({
    cookies
}) => {
    const sessionId = cookies.get("connect.sid");
    if (sessionId) {
        const user = await loadUser(sessionId);
        return {
            props: {
                user
            }
        }
    } else return {
        props: {
            user: null
        }
    }
}
