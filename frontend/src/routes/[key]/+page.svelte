<script>
	import Footer from '$lib/Footer.svelte';
    import CodeBlock from '$lib/code/CodeBlock.svelte';

    import {
		initialize as initializeFooter
	} from "$lib/footer";
  import { onMount } from "svelte";
    onMount(() => {
        initializeFooter("copy-link", "copy", "new", "save", "duplicate", "raw");
    });

    /** @type {import('./$types').PageData} */
    export let data;

    var title = "Deftbin";
    const docTitle = data?.props?.document?.title || data.props?.key?.toUpperCase() || "";
    if (docTitle) title = `${title} - ${docTitle}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="title" content={title}>
	<meta name="description" content="Deftbin is a free, open-source pastebin alternative used to share code.">
</svelte:head>

<div class="content">
	<div class="container">
        <CodeBlock language={data?.props?.ext?.replace(".", "") || data?.props?.document?.language} code={data.props?.document?.content || ""} />
	</div>
</div>
<Footer />

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
</style>
