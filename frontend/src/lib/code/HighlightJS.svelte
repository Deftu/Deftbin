<script lang="ts">
    import "./hljs.css";

    import {
        createEventDispatcher,
        onMount
    } from "svelte";

    const dispatch = createEventDispatcher();

    onMount(() => {
        // load highlight.js
        let script = document.createElement("script");
        script.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js";
        script.async = true;
        document.head.append(script);

        script.onload = (event) => {
            dispatch("load");
        }
    });
</script>
