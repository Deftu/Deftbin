<script lang="ts">
    let clz = "";
    export { clz as class };

    export let value: number;
    export let min: number;
    export let max: number;
    export let step: number = 1;
</script>

<div class="number-input {clz}">
    <button class="increment-button" on:click={() => value -= step} disabled={value <= min}>-</button>
    <input type="number" bind:value={value} min={min} max={max} step={step} />
    <button class="decrement-button" on:click={() => value += step} disabled={value >= max}>+</button>
</div>

<style>
    .number-input {
        display: flex;
        align-items: center;
        justify-content: center;
        height: inherit;
        min-height: 30px;
        width: inherit;
        min-width: 100px;
    }

    .number-input input {
        appearance: textfield;
        width: 50px;
        height: inherit;
        min-height: inherit;
        text-align: center;
        border: none;
        outline: none;
        background: var(--background-1);
        color: var(--text);
        font-size: 20px;
    }

    .number-input input::-webkit-outer-spin-button,
    .number-input input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .increment-button,
    .decrement-button {
        width: 25px;
        height: inherit;
        min-height: inherit;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text);
        background: var(--background-3);
        font-size: 20px;
    }

    .increment-button:hover,
    .decrement-button:hover {
        background: var(--background-2);
    }

    .increment-button:disabled,
    .decrement-button:disabled {
        cursor: not-allowed;
        color: var(--text-disabled);
        background: var(--background-2);
    }

    .increment-button {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .decrement-button {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
</style>
