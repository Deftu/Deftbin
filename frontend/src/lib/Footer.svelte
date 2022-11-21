<script>
    import {
        performCopyLink,
        performCopy,
        performNew,
        performSave,
        performDuplicate,
        performRaw,
    } from "./footer";
</script>

<footer>
    <div class="branding">
        <h1 class="brand-name">Deftbin</h1>
    </div>
    <div class="actions">
        <button data-action="copy-link" on:click={() => performCopyLink("copy-link")}>Copy Link</button>
        <button data-action="copy" on:click={() => performCopy("copy")}>Copy</button>
        <button data-action="new" on:click={() => performNew("new")} class="enabled">New</button>
        <button data-action="save" on:click={() => performSave("save")} class="enabled">Save</button>
        <button data-action="duplicate" on:click={() => performDuplicate("duplicate")}>Duplicate</button>
        <button data-action="raw" on:click={() => performRaw("raw")}>Raw</button>
    </div>
</footer>

<style>
    footer {
        position: fixed;
        bottom: 0;
        left: 0;

        width: calc(100% - var(--footer-spacing) * 2);
        max-height: var(--footer-height);

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        user-select: none;

        padding: var(--footer-spacing) calc(var(--footer-spacing) * 2) var(--footer-spacing) calc(var(--footer-spacing) * 2);
        margin: var(--footer-spacing);
        border-radius: 25px;
        background-color: var(--background-2);
    }

    .branding {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .brand-name {
        margin: 0;
        margin-left: 10px;
        font-size: 25px;
        font-weight: 700;
    }

    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    @media (max-width: 850px) {
        :global(html) {
            --footer-height: 100px;
        }

        footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .branding {
            margin-bottom: 10px;
        }

        .actions {
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    @media (max-width: 695px) {
        :global(html) {
            --footer-height: 150px;
        }

        .actions button {
            margin-top: 10px;
        }
    }

    @media (max-width: 410px) {
        :global(html) {
            --footer-height: 200px;
        }
    }

    .actions button {
        min-width: 80px;
        margin-left: 10px;
        padding: 5px 15px 5px 15px;
        border-radius: 10px;
        font-size: 15px;
        text-align: center;
        background-color: var(--background-3);
        outline: none;
        border: none;
    }

    .actions button.enabled {
        background-color: var(--background);
    }

    .actions button.enabled:hover {
        background-color: var(--background-3);
        cursor: pointer;
    }
</style>
