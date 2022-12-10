import type {
    LayoutLoad
} from "./$types";
import * as settings from "$lib/settings";

export const load: LayoutLoad = async () => {
    settings.loadSettings();
};
