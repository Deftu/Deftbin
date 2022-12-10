<script>
    import {
        LoadingOverlay,
        loading
    } from "$lib/base/loading";
    loading.set(true);

	import "../app.css";
    import {
        NotificationContainer
    } from "$lib/interactions/notifications";
    import {
        SettingsOverlay
    } from "$lib/settings";
</script>

<svelte:head>
    <meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<NotificationContainer />
<LoadingOverlay />
<SettingsOverlay />
<slot />
