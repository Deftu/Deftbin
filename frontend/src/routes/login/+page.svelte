<script lang="ts">
    import {
        onMount
    } from "svelte";
    import {
        loading
    } from "$lib/base/loading";

    import DiscordIcon from "$lib/icons/DiscordIcon.svelte";
    import GitHubIcon from "$lib/icons/GitHubIcon.svelte";

    import {
        getBackendUrl
    } from "$lib/backend";
    import {
        page
    } from "$app/stores";
    import {
        goto
    } from "$app/navigation";
    import {
        browser
    } from "$app/environment";

    const backendUrl = getBackendUrl();
    const profile = $page.data.props.profile;
    if (browser && profile) goto("/");

    onMount(() => {
        loading.set(false);
    });
</script>

<svelte:head>
    <title>Deftbin - Login</title>
</svelte:head>

<div class="content">
    <div class="container">
        <button class="discord-button" on:click={() => window.location.href = `${backendUrl}/auth/discord/redirect`}>
            <DiscordIcon class="discord-icon" />
            <span>Login with Discord</span>
        </button>
        <button class="github-button" on:click={() => window.location.href = `${backendUrl}/auth/github/redirect`}>
            <GitHubIcon class="github-icon" />
            <span>Login with GitHub</span>
        </button>
    </div>
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
        background-color: var(--background-1);
        border-radius: 10px;
        padding: 50px;
    }

    .content > .container > button {
        min-width: 250px;
    }

    .discord-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background-color: #7289DA;
        color: var(--text);
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 1.2rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .discord-button:hover {
        background-color: #5F73C1;
    }

    :global(.discord-icon) {
        width: 30px;
        height: 30px;
        fill: var(--text);
    }

    .github-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background-color: #333;
        color: var(--text);
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 1.2rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .github-button:hover {
        background-color: #222;
    }

    :global(.github-icon) {
        width: 30px;
        height: 30px;
        fill: var(--text);
    }
</style>
