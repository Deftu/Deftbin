<script lang="ts">
    import {
        onMount
    } from "svelte";
    import {
        loading
    } from "$lib/base/loading";
    import type {
        User,
        Document
    } from "$lib/user/user";
    import {
        browser
    } from "$app/environment";
    import {
        page
    } from "$app/stores";
    import {
        goto
    } from "$app/navigation";

    import LinkIcon from "$lib/icons/LinkIcon.svelte";
    import DiscordIcon from "$lib/icons/DiscordIcon.svelte";
    import GitHubIcon from "$lib/icons/GitHubIcon.svelte";

    const user: User = $page.data.props.user;
    const documents: Document[] = $page.data.props.documents;
    const sortedDocuments = browser ? documents.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) : [];

    onMount(() => {
        loading.set(false);
    });
</script>

<svelte:head>
    <title>Deftbin - {user?.username}'s profile</title>
</svelte:head>

<div class="content">
    <div class="container">
        <div class="profile-view">
            <div class="identification-container">
                <div class="avatar-container">
                    <img src={user?.avatar} alt="Avatar" />
                    <div class="avatar-background" />
                </div>
                <h1>{user?.username}</h1>
            </div>
            <div class="stats-container">
                <div class="stat">
                    <h2>{documents?.length || 0}</h2>
                    <p>Documents</p>
                </div>
            </div>
            <div class="connections-container">
                {#if user?.connections?.website}
                <div class="connection">
                    <LinkIcon class="connection-icon" />
                    <a href={user?.connections?.website?.url}>{user?.connections?.website?.url}</a>
                </div>
                {/if}
                {#if user?.connections?.discord}
                <div class="connection">
                    <DiscordIcon class="connection-icon" />
                    <p>{user?.connections?.discord?.username}#{user?.connections?.discord?.discriminator}</p>
                </div>
                {/if}
                {#if user?.connections?.github}
                <div class="connection">
                    <GitHubIcon class="connection-icon" />
                    <a href="https://github.com/{user?.connections?.github?.username}">@{user?.connections?.github?.username}</a>
                </div>
                {/if}
            </div>
        </div>
        <div class="document-view">
            <h1>Documents</h1>
            {#if documents?.length > 0}
            <div class="documents-container">
                {#each sortedDocuments as document}
                <button class="document" on:click={() => goto(`/documents/${document.key}`)}>
                    <h2>{document.name || document.key}</h2>
                    <div class="document-language">
                        {#if document.language}
                        <p>{document.language}</p>
                        {/if}
                    </div>
                </button>
                {/each}
            </div>
            {:else}
            <div class="no-documents">
                <span>This user has no documents.</span>
            </div>
            {/if}
        </div>
    </div>
</div>

<style>
    :root {
        --profile-view-border-radius: 25px;
    }

    .content {
        height: 100%;
        padding: 25px;
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
        flex-direction: column;
        background-color: var(--background-3);
        border-radius: 25px;
        margin-left: 50px;
        overflow: hidden;
    }

    .document-view h1 {
        /* top 35px, left 35px, bottom 25px, right 0px; */
        margin: 35px 0 25px 35px;
    }

    .document-view h1::after {
        content: "";
        display: block;
        width: calc(100% - 35px);
        padding-bottom: 10px;
        border-bottom: 5px solid var(--background-4);
    }

    .documents-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0 35px 25px 35px;
        gap: 25px;
        overflow-y: scroll;
    }

    .document {
        width: 100%;
        min-height: 68px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: var(--background-2);
        border: none;
        border-radius: 25px;
    }

    .document h2 {
        margin-left: 25px;
    }

    .document .document-language {

    }

    .no-documents {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .no-documents span {
        font-size: 20px;
        font-weight: 500;
    }
</style>
