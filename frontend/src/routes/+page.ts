import type {
    PageLoad
} from "./$types";

export const load: PageLoad = async ({ url }) => {
    const content = url.searchParams.get("content");
    if (!content) return;

    return {
        props: {
            content: content
        }
    };
}
