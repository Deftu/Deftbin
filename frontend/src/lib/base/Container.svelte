<script lang="ts">
    let clz = "";
    export { clz as class };
    export let internalPadding = false;
    export let sidePadding = false;
</script>

<div class="background-container {internalPadding ? "internal-padding" : ""} {sidePadding ? "side-padding" : ""}">
    <div class="container {clz}">
        <slot />
    </div>
</div>

<style>
    .background-container {
        width: 100%;
        height: 100%;
        overflow: scroll;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .background-container.internal-padding {
        padding: 25px;
    }

    .background-container.side-padding {
        padding: 0 25px;
    }

    .container {
        width: 100%;
        height: 100%;
        background: var(--background-1);
        border-radius: 25px;
    }
</style>
