<script lang="ts">
    import {
        page
    } from "$app/stores";
    import {
        goto
    } from "$app/navigation";
    import LoginIcon from "$lib/icons/LoginIcon.svelte";

    const user = $page.data?.props?.user || null;
</script>

{#if user}
    <div class="dropdown">
        <button class="avatar-button">
            <img src={user.avatar} alt="Avatar" />
        </button>
        <div class="dropdown-content">
            <ol class="dropdown-items">
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <a href="/logout">Logout</a>
                </li>
            </ol>
        </div>
    </div>
{:else}
    <button class="login-button" on:click={() => goto("/login")}>
        <LoginIcon class="login-icon" />
    </button>
{/if}

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }

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

    .dropdown-content {
        display: none;
        position: absolute;
        right: 0;
        background-color: var(--background-3);
        border: 2.5px solid var(--background-4);
        border-radius: 10px;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        padding: 10px;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown-items {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 2.5px;
    }

    .dropdown-items li::after {
        content: "";
        display: block;
        width: 100%;
        margin-top: 1.5px;
        height: 2.5px;
        background-color: var(--background-4);
    }

    .dropdown-items li:last-child::after {
        display: none;
    }

    .dropdown-items a {
        text-decoration: none;
        color: var(--text);
        font-size: 17.5px;
        font-weight: 500;
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
