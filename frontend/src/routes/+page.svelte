<script>
  import { onMount } from 'svelte';


    /** @type {import('./$types').PageData} */
    export let data;

	let content = data?.props?.content || "";

	onMount(() => {
		// @ts-ignore
		document.querySelector("textarea").addEventListener("keydown", (e) => {
            if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey) {
                e.preventDefault();
				// @ts-ignore
                let start = e.target["selectionStart"];
				// @ts-ignore
                let end = e.target["selectionEnd"];

                // set textarea value to: text before caret + tab + text after caret
				// @ts-ignore
                e.target["value"] = e.target["value"].substring(0, start) + "\t" + e.target["value"].substring(end);

                // put caret at right position again
				// @ts-ignore
                e.target["selectionStart"] = e.target["selectionEnd"] = start + 1;
            }
        });
	});
</script>

<svelte:head>
	<title>Deftbin</title>
	<meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="title" content="Deftbin">
	<meta name="description" content="Deftbin is a free, open-source pastebin alternative used to share code.">
</svelte:head>

<div class="content">
	<div class="container">
		<div class="line-nums">></div>
		<textarea spellcheck="false">{content}</textarea>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: row;
		height: 100vh;
		padding: 20px 20px calc(var(--footer-height) + var(--footer-spacing) * 2) 20px;
	}

	.container {
		background-color: var(--background-2);
		border-radius: 25px;
		display: flex;
		flex-direction: row;
		flex: 1;
	}

	textarea {
		width: 100%;
		height: 100%;
		padding: 20px;

		border: none;
		color: var(--text);
		background: none;

		font-family: monospace;
		font-size: 15px;

		resize: none;
		outline: none;
	}
</style>