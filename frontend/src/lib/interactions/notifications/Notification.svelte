<script lang="ts">
    import type {
        NotificationType
    } from "$lib/notifications/notifications";

    export let title: string;
    export let message: string;
    export let type: NotificationType;
    export let performRemove: () => void;
    export let onTimeout: (() => void) | null = null;
    export let onInteraction: (() => void) | null = null;
    export let onDismiss: (() => void) | null = null;

    function dismiss() {
        if (onDismiss) onDismiss();
        performRemove();
    }

    function timeout() {
        if (onTimeout) onTimeout();
        performRemove();
    }

    function interaction() {
        if (onInteraction) onInteraction();
        performRemove();
    }

    setTimeout(() => {
        timeout();
    }, 5 * 1000); // 5 seconds
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="notification notification-{type}" on:click={interaction}>
    <div class="notification-header">
        <div class="notification-title">
            <div class="notification-type">
                {#if type === "info"}
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                    </svg>
                {:else if type === "success"}
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
                    </svg>
                {:else if type === "warning"}
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
                    </svg>
                {:else if type === "error"}
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                    </svg>
                {/if}
            </div>
            <h2 class="notification-title-text">{title}</h2>
        </div>
        <div class="notification-dismiss" on:click={dismiss}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13.414 12l5.293 5.293-1.414 1.414L12 13.414l-5.293 5.293-1.414-1.414L10.586 12 5.293 6.707l1.414-1.414L12 10.586l5.293-5.293 1.414 1.414L13.414 12z" />
            </svg>
        </div>
    </div>
    <span class="notification-message">
        {message}
    </span>
    <div class="notification-timeout" />
</div>

<style>
    .notification {
        width: 250px;
        padding: 15px;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 0 12.5px rgba(0, 0, 0, 0.85);
        background-color: var(--background-3);
        color: var(--text);
        transition: opacity 0.25s ease-in-out;
        pointer-events: none;
    }

    .notification:hover {
        transition: opacity 0.25s ease-in-out;
        opacity: 0.85;
    }

    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        user-select: none;
    }

    .notification-title {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .notification-title svg {
        margin-right: 2.5px;
        color: var(--text);
    }

    .notification-title-text {
        margin: 0;
        margin-left: 2.5px;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .notification-message {
        font-size: 1rem;
        margin-bottom: 5px;
        /* make the text wrap instead of increase the width */
        white-space: pre-wrap;
    }

    .notification-dismiss {
        width: 20px;
        height: 20px;
        border-radius: 2.5px;
        background-color: var(--background-3);
        pointer-events: all;
        cursor: pointer;
    }

    .notification-dismiss:hover {
        background-color: var(--background-4);
    }

    .notification-dismiss svg {
        width: 100%;
        height: 100%;
        fill: var(--text);
    }
</style>
