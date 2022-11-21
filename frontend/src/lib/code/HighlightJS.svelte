<script lang="ts">
    import "./hljs.css";
    import {
        onMount
    } from "svelte";

    export let hljsLoadedCallback: ((this: HTMLScriptElement, ev: Event) => any) | null = null;

    onMount(() => {
        // load highlight.js
        let script = document.createElement("script");
        script.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js";
        script.async = true;
        document.head.append(script);

        script.onload = (event) => {
            if (hljsLoadedCallback) {
                hljsLoadedCallback.call(script, event);
            }
        }
    });
</script>
