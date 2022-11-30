<script lang="ts">
    import {
        loading
    } from "$lib/loading";

	import * as settings from "$lib/settings/settings";
  	import HighlightJS from '$lib/code/HighlightJS.svelte';
	import ActionBar from '$lib/action/ActionBar.svelte';
	import {
		onMount
	} from 'svelte';
  	import type {
		PageData
	} from "./$types";
  	import {
		error
	} from "@sveltejs/kit";

    export let data: PageData;

	let content = data?.props?.content || "";

	onMount(() => {
		const content = document.querySelector(".content");
		if (!content) throw error(500, "Could not find content element!");
		settings.positionContent(content as HTMLElement);
		settings.setupTabSize(content as HTMLElement);

		const container = document.querySelector(".container");
		if (!container) throw error(500, "Could not find container element!");
		settings.setupFancyLights(container as HTMLElement);

		// @ts-ignore
		document.querySelector("textarea").addEventListener("keydown", (e) => {
            if (e.key === "Tab" && !e.shiftKey) {
				if (!e.ctrlKey) {
					const appendage = settings.getSettings().tabType === "spaces" ? " ".repeat(settings.getSettings().tabSize) : "\t".repeat(settings.getSettings().tabSize / 4);

					const start = e.target.selectionStart;
					const end = e.target.selectionEnd;

					e.target.value = e.target.value.substring(0, start) + appendage + e.target.value.substring(end);

					e.target.selectionStart = e.target.selectionEnd = start + appendage.length;
					e.preventDefault();
				} else {
					const elements = document.querySelectorAll("input, select, textarea, button, a");
					const index = Array.prototype.indexOf.call(elements, e.target);
					if (index > -1 && index < elements.length - 1) {
						elements[index + 1].focus();
                        e.preventDefault();
					}
				}
            }
        });

        loading.set(false);
	});
</script>

<svelte:head>
	<title>Deftbin</title>
	<meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="title" content="Deftbin">
	<meta name="description" content="Deftbin is a free, open-source code sharing application.">
</svelte:head>

<HighlightJS />
<ActionBar />

<div class="content">
	<div class="container">
		<div class="caret-container">></div>
		<textarea spellcheck="false">{content}</textarea>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: row;
		height: 100vh;
		padding: 20px;
	}

	.container {
		background-color: var(--background-2);
		border-radius: 25px;
		display: flex;
		flex-direction: row;
		flex: 1;
	}

	.caret-container {
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
		line-height: 20px;
		color: var(--text-faded);
		text-align: center;
		overflow: hidden
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
