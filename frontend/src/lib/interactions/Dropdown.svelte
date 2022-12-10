<!-- Overall dropdown for click interaction
 -->

<script lang="ts">
    import {
        onMount
    } from "svelte";
    import {
        browser
    } from "$app/environment";

    export let options: {
        label: string;
        // value should be a string OR a component
        value: string | typeof import("svelte");
    }[] = [];
</script>

<div class="dropdown-container">
    <div class="dropdown">
        <div class="dropdown-header">
            <div class="dropdown-header-title">
                {#if options[0].value instanceof import("svelte")}
                    <svelte:component this={options[0].value} />
                {:else}
                    {options[0].label}
                {/if}
            </div>
            <div class="dropdown-header-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
        <div class="dropdown-content">
            {#each options as option}
                <div class="dropdown-content-item">
                    {#if option.value instanceof import("svelte")}
                        <svelte:component this={option.value} />
                    {:else}
                        {option.label}
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>


