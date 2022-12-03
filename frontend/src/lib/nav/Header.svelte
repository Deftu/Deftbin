<script lang="ts">
    import SettingsButton from "$lib/nav/SettingsButton.svelte";
    import Avatar from "$lib/profile/Avatar.svelte";
</script>

<header>
    <div class="header-left">
        <h1><span class="emphasized-text">Deft</span>bin</h1>
        <SettingsButton />
    </div>
    <div class="header-right">
        <Avatar />
    </div>
</header>

<style>
    header {
        position: fixed;
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

    .header-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 50px;
    }
</style>
