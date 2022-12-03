<script lang="ts">
    import {
        page
    } from "$app/stores";
    import {
        goto
    } from "$app/navigation";
    import LoginIcon from "$lib/icons/LoginIcon.svelte";

    const profile = $page.data.props.profile;
</script>

{#if profile}
    <button class="avatar-button" on:click={() => goto("/profile")}>
        <img src={profile.avatar} alt="Avatar" />
    </button>
{:else}
    <button class="login-button" on:click={() => goto("/login")}>
        <LoginIcon class="login-icon" />
    </button>
{/if}

<style>
    .avatar-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        outline: 2.5px solid var(--background-4);
        background-color: transparent;
        cursor: pointer;
    }

    .avatar-button img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .login-button {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    :global(.login-icon) {
        width: 38px;
        height: 38px;
        fill: var(--text);
    }
</style>
