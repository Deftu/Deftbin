import {
    writable
} from "svelte/store";
import LoadingOverlay from "./LoadingOverlay.svelte";

export const loading = writable(true);
export {
    LoadingOverlay
};
