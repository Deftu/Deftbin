<script lang="ts">
    import {
        loading
    } from "$lib/base/loading";

    import Header from "$lib/nav/Header.svelte";
    import Container from "$lib/base/Container.svelte";
    import Footer from "$lib/nav/Footer.svelte";
    import CodeBlock from "$lib/code/CodeBlock.svelte";
  	import {
        onMount
    } from "svelte";
    import {
        page
    } from "$app/stores";

    let title = "Deftbin";
    const docTitle = $page.data?.props?.document?.title || $page.data.props?.key || "";
    if (docTitle) title = `${title} - ${docTitle}`;

    onMount(() => {
        loading.set(false);
    });
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="title" content={title}>
	<meta name="description" content="Deftbin is a free, open-source pastebin alternative used to share code.">

    <meta property="og:type" content="website">
    <meta property="og:title" content={title}>
    <meta property="og:description" content="Deftbin is a free, open-source pastebin alternative used to share code.">
</svelte:head>

<Header />
<Container internalPadding sidePadding>
    <CodeBlock language={$page.data?.props?.ext?.replace(".", "") || $page.data?.props?.document?.language} code={$page.data.props?.document?.content || ""} />
</Container>
<Footer />

<style>
</style>
