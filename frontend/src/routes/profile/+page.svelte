<script lang="ts">
    import {
        onMount
    } from "svelte";
    import {
        loading
    } from "$lib/loading";
    import type {
        UserProfile
    } from "$lib/profile/profile";
    import {
        page
    } from "$app/stores";
    import {
        goto
    } from "$app/navigation";
    import {
        browser
    } from "$app/environment";

    import LinkIcon from "$lib/icons/LinkIcon.svelte";
    import DiscordIcon from "$lib/icons/DiscordIcon.svelte";
    import GitHubIcon from "$lib/icons/GitHubIcon.svelte";

    const profile: UserProfile | null = $page.data.props.profile;
    if (browser && !profile) goto("/");

    onMount(() => {
        loading.set(false);
    });
</script>

<svelte:head>
    <title>Deftbin - {profile?.username}'s profile</title>
</svelte:head>

<div class="content">
    <div class="container">
        <div class="profile-view">
            <div class="identification-container">
                <div class="avatar-container">
                    <img src={profile?.avatar} alt="Avatar" />
                    <div class="avatar-background" />
                </div>
                <h1>{profile?.username}</h1>
            </div>
            <div class="stats-container">
                <div class="stat">
                    <h2>{profile?.stats?.pastes || 0}</h2>
                    <p>Documents</p>
                </div>
                <div class="stat">
                    <h2>{profile?.stats?.views || 0}</h2>
                    <p>Views</p>
                </div>
            </div>
            <div class="connections-container">
                {#if profile?.connections?.website}
                <div class="connection">
                    <LinkIcon class="connection-icon" />
                    <a href={profile?.connections?.website?.url}>{profile?.connections?.website?.url}</a>
                </div>
                {/if}
                {#if profile?.connections?.discord}
                <div class="connection">
                    <DiscordIcon class="connection-icon" />
                    <p>{profile?.connections?.discord?.username}#{profile?.connections?.discord?.discriminator}</p>
                </div>
                {/if}
                {#if profile?.connections?.github}
                <div class="connection">
                    <GitHubIcon class="connection-icon" />
                    <a href="https://github.com/{profile?.connections?.github?.username}">@{profile?.connections?.github?.username}</a>
                </div>
                {/if}
            </div>
        </div>
        <div class="document-view"></div>
    </div>
</div>

<style>
    :root {
        --profile-view-border-radius: 25px;
    }

    .content {
        height: 100%;
        padding: 35px;
    }

    .container {
        height: 100%;
        padding: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        background-color: var(--background-1);
    }

    .profile-view {
        width: 350px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--background-3);
        border-radius: var(--profile-view-border-radius);
    }

    .identification-container {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .identification-container::after {
        content: "";
        width: 90%;
        padding-bottom: 10px;
        border-bottom: 5px solid var(--background-4);
    }

    .avatar-container {
        width: 100%;
        height: 150px;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    .avatar-container img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
        outline: 5px solid var(--background-2);
        z-index: 1;
    }

    .avatar-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary);
        border-top-left-radius: var(--profile-view-border-radius);
        border-top-right-radius: var(--profile-view-border-radius);
    }

    .stats-container {
        width: 90%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-left: 5%;
        padding-bottom: 10px;
        border-bottom: 5px solid var(--background-4);
    }

    .stat {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .connections-container {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 10%;
        justify-content: center;
        margin-top: 10px;
        gap: 10px;
    }

    .connection {
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    :global(.connection-icon) {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    .document-view {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
