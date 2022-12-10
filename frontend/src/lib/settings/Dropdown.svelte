<!-- Custom dropdown component with a custom item picker -->

<script lang="ts">
    import {
        createEventDispatcher
    } from "svelte";
    const dispatch = createEventDispatcher();

    type Option = {
        value: string;
        label: string;
    };

    let clz = "";
    export { clz as class };
    export let value: string;
    export let options: string[] | Option[];
    export let disabled: boolean = false;

    import ChevronIcon from "$lib/icons/ChevronIcon.svelte";

    import {
        onMount
    } from "svelte";

    let open: boolean = false;
    let parsedOptions: Option[] = [];
    // filter the parsed options to get the label of the selected value
    let selectedOption: Option = {
        value: "",
        label: ""
    };

    function setSelected(theValue: string) {
        selectedOption = parsedOptions.find((option) => option.value === theValue) as Option;
        value = theValue;
        dispatch("change", value);
    }

    onMount(() => {
        for (const option in options) {
            if (typeof options[option] === "string") {
                parsedOptions.push({
                    value: options[option].toString(),
                    label: options[option].toString()
                });
            } else {
                parsedOptions.push(options[option] as Option);
            }
        }

        setSelected(value);

        document.addEventListener("click", (event) => {
            // @ts-ignore
            if (!event.target.closest(".dropdown")) {
                open = false;
            }
        });
    });
</script>

<div class="dropdown {clz}">
    <button class="dropdown-button" on:click={() => open = !open} disabled={disabled}>
        <span class="dropdown-button-text">{selectedOption?.label}</span>
        {#if open}
        <ChevronIcon class="dropdown-button-icon" />
        {:else}
        <ChevronIcon class="dropdown-button-icon" down />
        {/if}
    </button>

    {#if open}
        <div class="dropdown-items">
            {#each parsedOptions as option}
                <button class="dropdown-item" on:click={() => {
                    setSelected(option.value);
                    open = false;
                }}>
                    <span class="dropdown-item-text">{option.label}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .dropdown {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 30px;
        min-width: 100px;
    }

    .dropdown-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: inherit;
        min-height: inherit;
        width: inherit;
        min-width: inherit;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        color: var(--text);
        background: var(--background-1);
        font-size: 20px;
        border-radius: 10px;
        gap: 5px;
        padding: 5px 15px;
    }

    .dropdown-button-text {
        font-size: 20px;
    }

    :global(.dropdown-button-icon) {
        width: 25px;
        height: inherit;
        min-height: inherit;
        color: var(--text);
        background: var(--background-1);
        cursor: pointer;
        pointer-events: none;
    }

    .dropdown-items {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--background-1);
        border: 2.5px solid var(--background-3);
        z-index: 1;
        border-radius: 10px;
    }

    .dropdown-item {
        height: inherit;
        min-height: inherit;
        width: 100%;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        color: var(--text);
        background: var(--background-1);
        font-size: 20px;
    }

    .dropdown-item:hover {
        background: var(--background-3);
    }

    .dropdown-item::after {
        content: "";
        display: block;
        width: 100%;
        margin-top: 1.5px;
        height: 2.5px;
        background-color: var(--background-3);
    }

    .dropdown-item:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .dropdown-item:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .dropdown-item:last-child::after {
        display: none;
    }
</style>
