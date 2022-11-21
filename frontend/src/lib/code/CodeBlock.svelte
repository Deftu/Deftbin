<script lang="ts">
    import "./hljs.css";
    import { onMount } from "svelte";
    import * as utils from "$lib/utils";
    import HighlightJs from "./HighlightJS.svelte";

    export let language: string;
    export let code: string;

    // @ts-ignore
    const languageAlias = utils.getLanguageFromExtension(language) || language;

    function loadLanguage() {
        // load language
        if (language) {
            console.log("loading language", language);
            let script = document.createElement("script");
            // @ts-ignore
            script.src = `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/languages/${languageAlias}.min.js`;
            console.log("script.src", script.src);
            script.async = true;
            document.head.append(script);

            script.addEventListener("load", () => {
                console.log("loaded language, highlighting that (" + language + ")");
                // @ts-ignore
                hljs.highlightElement(document.querySelector("code"));
            });
        } else {
            console.log("no language - highlighting all");
            // @ts-ignore
            hljs.highlightAll();
        }
    }

    onMount(() => {
        // TODO: Add and position line numbers
        const lineNums = document.querySelector(".line-nums");

        // Fix the scroll position
        // @ts-ignore
        lineNums.style.scrollBehavior = "normal";
        document.querySelector("pre")?.addEventListener("scroll", (e) => {
            // @ts-ignore
            lineNums.scrollTop = (e.target as HTMLElement).scrollTop;
        });
    });
</script>

<HighlightJs hljsLoadedCallback={loadLanguage} />

<div class="line-nums"></div>
<pre>
    {#if languageAlias}
        <code class="language-{languageAlias}">{code}</code>
    {:else}
        <code>{code}</code>
    {/if}
</pre>

<style>
    .line-nums {
        --line-num-margin: 20px;
        min-width: 20px;
        height: fit-content;
        max-height: calc(100% - var(--line-num-margin) * 2);
        font-size: 15px;
        font-family: monospace;
        margin: var(--line-num-margin);
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        line-height: 22px;
        color: var(--text-faded);
        text-align: center;
	    overflow: hidden
    }

    .line-nums > :global(span) {
	    position: relative;
	    color: var(--text-faded);
	    text-align: center;
    }

    pre {
        --pre-margin: 20px;
        --code-line-height: 22px;

		width: calc(100% - var(--pre-margin) * 2);
		height: calc(100% - var(--pre-margin) * 2);
		margin: var(--pre-margin);
        padding: 0;
        font-family: monospace;
		font-size: 15px;
        line-height: var(--code-line-height);
        overflow: scroll;
        white-space: normal;
        word-wrap: break-word;
        tab-size: 4;

		border: none;
        color: var(--text);
		background: none;
	}

    code {
        background: none;
        color: var(--text);
        font-size: 15px;
        line-height: var(--code-line-height);
        word-wrap: break-word;
    }

    code, code :global(*) {
        padding: 0;
        margin: 0;
        font-family: monospace;
        overflow: scroll;
        white-space: normal;
        word-wrap: break-word;

        white-space: pre-wrap;
    }
</style>
