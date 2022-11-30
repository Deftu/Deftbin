<script>
    import {
        loading
    } from "$lib/loading";
    loading.set(true);

	import "../app.css";
	import "$lib/fancy-lights.css";
	import * as settings from "$lib/settings/settings";

	import {
		onMount
	} from "svelte";
	import {
		browser
	} from "$app/environment"

	onMount(() => {
		if (browser) {
			settings.loadSettings();
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="https:/github.com/Deftu.png">
</svelte:head>

<div class="notifications" />

{#if $loading}
    <div class="loading">
        <h1 class="loading-text">Loading...</h1>
        <div class="loading-spinner">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="20" />
            </svg>
        </div>
    </div>
{/if}

<slot />

<style>
    .notifications {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: fit-content;
        height: fit-content;
    }

    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background);
        z-index: 1000;
    }

    .loading-text {
        font-size: 36px;
        font-weight: 700;
        margin: 0;
        color: var(--text);
    }

    .loading-spinner {
        width: 200px;
        height: 200px;
    }

    .loading-spinner svg {
        animation: rotate 2s linear infinite;
        width: 100%;
        height: 100%;
    }

    .loading-spinner circle {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite;
        stroke-linecap: round;
        fill: none;
        stroke: var(--primary);
        stroke-width: 3;
    }
    @keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1,200;
            stroke-dashoffset: 0;
        }

        50% {
            stroke-dasharray: 89,200;
            stroke-dashoffset: -35;
        }

        100% {
            stroke-dasharray: 89,200;
            stroke-dashoffset: -124;
        }
    }
</style>
