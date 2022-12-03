<script lang="ts">
    import {
        loading
    } from "$lib/loading";
</script>

{#if $loading}
    <div class="loading">
        <div class="loading-spinner">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="20" />
            </svg>
        </div>
    </div>
{/if}

<style>
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
        background-color: var(--background-2);
        z-index: 1000;
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
