<script>
	import "../app.css";

	import Footer from "$lib/Footer.svelte";
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="https:/github.com/Deftu.png">
</svelte:head>

<main>
	<slot />
</main>
<Footer />
