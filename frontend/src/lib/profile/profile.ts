import {
    writable
} from "svelte/store";
import {
    fetchBackend
} from "$lib/backend";

export type UserProfile = {
    id: string;
    username: string;
    email: string;
    avatar: string;
    connections: {
        website: {
            url: string;
        },
        discord: {
            id: string;
            username: string;
            discriminator: string;
        };
        github: {
            id: string;
            username: string;
        };
    };
};

let attempted = false;
export async function loadProfile(sessionId: string) {
    try {
        // axios
        const response = await fetchBackend("auth", {
            headers: {
                Cookie: `connect.sid=${sessionId}`
            }
        });
        const data = await response.data;
        if (data.authenticated) {
            return data.user as UserProfile;
        } else return null;
    } catch (err) {
        console.error("Failed to load profile... This should never happen.", err);
        return null;
    } finally {
        attempted = true;
    }
}
