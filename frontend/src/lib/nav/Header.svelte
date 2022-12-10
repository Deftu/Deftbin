<script lang="ts">
    import {
        SettingsButton
    } from "$lib/settings";
    import GitHubIcon from "$lib/icons/GitHubIcon.svelte";
    import Avatar from "$lib/user/Avatar.svelte";
</script>

<header>
    <div class="header-left">
        <h1><span class="emphasized-text">Deft</span>bin</h1>
        <SettingsButton />
        <a class="github-button" href="https://github.com/Deftu/Deftbin">
            <GitHubIcon class="github-icon" />
        </a>
    </div>
    <div class="header-right">
        <Avatar />
    </div>
</header>

<style>
    header {
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 25px;
        border-radius: 25px;
        background-color: var(--background-1);
        max-height: 125px;
    }

    .header-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .header-left > h1 {
        font-size: 35px;
        font-weight: 300;
        margin: 25px 0px 25px 50px;
    }

    .github-button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
    }

    :global(.github-icon) {
        width: 100%;
        height: 100%;
        fill: var(--text);
        cursor: pointer;
    }

    .header-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 50px;
    }
</style>
