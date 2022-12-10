import type {
    PageLoad
} from "./$types";
import {
    browser
} from "$app/environment";
import {
    goto
} from "$app/navigation";
import {
    loadUserDocuments
} from "$lib/user/user";

export const load: PageLoad = async ({
    parent
}) => {
    if (!browser) return;

    const {
        props
    } = await parent();
    const {
        user
    } = props;
    if (!user) goto("/login");

    const documents = await loadUserDocuments(user as User);
    return {
        props: {
            documents,
            ...props
        }
    }
};
