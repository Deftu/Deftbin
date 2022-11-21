<script lang="ts">
    import "./hljs.css";
    import { onMount } from "svelte";

    export let language: string;
    export let code: string;

    const aliases = {
        rb: "ruby",
        py: "python",
        pl: "perl",
        html: "xml",
        htm: "xml",
        js: "javascript",
        ts: "typescript",
        vbs: "vbscript",
        pas: "delphi",
        m: "objectivec",
        sm: "smalltalk",
        sh: "bash",
        erl: "erlang",
        hs: "haskell",
        md: "markdown",
        kt: "kotlin",
    };

    // @ts-ignore
    const languageAlias = aliases[language] || language;

    onMount(() => {
        console.log("language", language);

        // load highlight.js
        let script = document.createElement("script");
        script.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js";
        script.async = true;
        document.head.append(script);

        script.addEventListener("load", () => {
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
        });
    });
</script>

<pre>
    {#if languageAlias}
        <code class="language-{languageAlias}">{code}</code>
    {:else}
        <code>{code}</code>
    {/if}
</pre>

<style>
    pre {
        --pre-margin: 20px;

		width: calc(100% - var(--pre-margin) * 2);
		height: calc(100% - var(--pre-margin) * 2);
		margin: var(--pre-margin);
        padding: 0;
        font-family: monospace;
		font-size: 15px;
        line-height: 22px;
        overflow: scroll;
        white-space: normal;

		border: none;
        color: var(--text);
		background: none;
	}

    code {
        background: none;
        color: var(--text);
        font-size: 15px;
        line-height: 22px;
    }

    code, code :global(*) {
        padding: 0;
        margin: 0;
        font-family: monospace;
        overflow: scroll;
        white-space: normal;

        white-space: pre-wrap;
    }
</style>
