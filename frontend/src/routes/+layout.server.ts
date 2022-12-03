import type {
    LayoutServerLoad
} from "./$types";
import {
    loadProfile
} from "$lib/profile/profile";

export const load: LayoutServerLoad = async ({
    cookies
}) => {
    const sessionId = cookies.get("connect.sid");
    if (sessionId) {
        const profile = await loadProfile(sessionId);
        return {
            props: {
                profile: profile
            }
        }
    } else return {
        props: {
            profile: null
        }
    }
}
