<script lang="ts">
    import {
        loading
    } from "$lib/loading";

	import * as settings from "$lib/settings/settings";
	import HighlightJS from '$lib/code/HighlightJS.svelte';
	import ActionBar from '$lib/action/ActionBar.svelte';
    import CodeBlock from '$lib/code/CodeBlock.svelte';

    import {
		initializeActionBar
	} from "$lib/action/actions";
  	import { onMount } from "svelte";
  	import { error } from "@sveltejs/kit";
  	import type {
		PageData
	} from "./$types";

    export let data: PageData;

    var title = "Deftbin";
    const docTitle = data?.props?.document?.title || data.props?.key?.toUpperCase() || "";
    if (docTitle) title = `${title} - ${docTitle}`;

    onMount(() => {
        initializeActionBar("copy-link", "copy", "duplicate", "raw");

		const content = document.querySelector(".content");
		if (!content) throw error(500, "Could not find content element!");
		settings.positionContent(content as HTMLElement);
		settings.setupTabSize(content as HTMLElement);

		const container = document.querySelector(".container");
		if (!container) throw error(500, "Could not find container element!");
		settings.setupFancyLights(container as HTMLElement);

        loading.set(false);
    });
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="title" content={title}>
	<meta name="description" content="Deftbin is a free, open-source pastebin alternative used to share code.">
</svelte:head>

<HighlightJS />
<ActionBar />

<div class="content">
	<div class="container">
        <CodeBlock language={data?.props?.ext?.replace(".", "") || data?.props?.document?.language} code={data.props?.document?.content || ""} />
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
        max-width: 100%;
	}
</style>
