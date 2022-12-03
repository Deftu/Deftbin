<script>
    import {
        loading
    } from '$lib/loading';
    loading.set(true);

	import "../app.css";
	import * as settings from "$lib/settings/settings";

	import {
		onMount
	} from "svelte";
	import {
		browser
	} from "$app/environment"

    import Notifications from "$lib/notifications/Notifications.svelte";
    import Loading from "$lib/base/Loading.svelte";

	onMount(() => {
		if (browser) {
			settings.loadSettings();
		}
	});
</script>

<svelte:head>
    <meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<Notifications />
<Loading />
<slot />
