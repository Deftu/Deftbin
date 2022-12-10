<script lang="ts">
    import {
        loading
    } from "$lib/base/loading";

    import {
        Header,
        Footer
    } from "$lib/nav";
    import Container from "$lib/base/Container.svelte";
    import CodeInput from "$lib/code/CodeInput.svelte";

	import {
		onMount
	} from "svelte";

	onMount(() => {
        loading.set(false);
	});
</script>

<svelte:head>
	<title>Deftbin</title>

	<meta name="title" content="Deftbin">
	<meta name="description" content="Deftbin is a free, open-source code sharing application.">

    <meta property="og:type" content="website">
    <meta property="og:title" content="Deftbin">
    <meta property="og:description" content="Deftbin is a free, open-source code sharing application.">
</svelte:head>

<Header />
<Container class="text-container" sidePadding>
    <CodeInput />
</Container>
<Footer />

<style>
    :global(.text-container) {
        display: flex;
        flex-direction: row;
        flex: 1;
        gap: 25px;
    }
</style>
