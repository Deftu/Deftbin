<script lang="ts">
    import {
        page
    } from "$app/stores";
    import {
        onMount
    } from "svelte";
    import {
        loading
    } from "$lib/base/loading";

    const status = $page.status;
    const message = $page.error?.message || null;
    const errMsg = $page.error?.errMsg || null;

    onMount(() => {
        loading.set(false);
    });
</script>

<div class="container">
    <div class="error">
        <h1 class="error-code">{status}</h1>
        {#if message}
            <h2 class="error-message">{message}</h2>
        {/if}
        {#if errMsg}
        <!-- Hides/shows the actual error's content -->
        <button class="error-toggle" on:click={() => document.querySelector(".error-content")?.classList?.toggle("hidden")}>
            <span class="error-toggle-text">Show error</span>
            <span class="error-toggle-icon">▼</span>
        </button>
        <!-- The actual error's content -->
        <div class="error-content hidden">
            <pre class="error-stack">{errMsg}</pre>
        </div>
        {/if}
        <a href="/" class="error-link">Go back home</a>
    </div>
</div>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: var(--background-2);
        border-radius: 25px;
        padding: 25px;
    }

    .error-code {
        font-size: 64px;
        font-weight: 700;
        margin: 0;
    }

    .error-message {
        font-size: 32px;
        font-weight: 500;
        margin: 0;
    }

    .error-toggle {
        background-color: transparent;
        border: none;
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        padding: 0;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .error-toggle-text {
        margin-right: 5px;
    }

    .error-content {
        width: 100%;
        height: 100%;
        padding: 0;
        overflow: auto;
        background-color: var(--background-3);
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 10px;
    }

    .error-stack {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        font-size: 15px;
        font-family: monospace;
    }

    .error-link {
        font-size: 20px;
        font-weight: 400;
        color: var(--primary-faded);
        text-decoration: none;
    }

    .hidden {
        display: none;
    }
</style>
