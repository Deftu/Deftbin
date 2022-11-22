<script lang="ts">
    import {
        page
    } from '$app/stores';

    const status = $page.status;
    const errorMessage = $page.error?.message || null;
</script>

<div class="container">
    <div class="error">
        <h1 class="error-code">{status}</h1>
        {#if errorMessage}
            <h2 class="error-message">{errorMessage}</h2>
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

    .error-link {
        font-size: 20px;
        font-weight: 400;
        color: var(--primary-faded);
        text-decoration: none;
    }
</style>
