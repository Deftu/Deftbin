<script lang="ts">
    import SaveIcon from "$lib/icons/SaveIcon.svelte";
    import WriteIcon from "$lib/icons/WriteIcon.svelte";
    import CopyIcon from "$lib/icons/CopyIcon.svelte";
    import RawIcon from "$lib/icons/RawIcon.svelte";
    import DuplicateIcon from "$lib/icons/DuplicateIcon.svelte";
    import ShareIcon from "$lib/icons/ShareIcon.svelte";

    import EditIcon from "$lib/icons/EditIcon.svelte";
    import TrashIcon from "$lib/icons/TrashIcon.svelte";

    import {
        onMount
    } from "svelte";
    import {
        page
    } from "$app/stores";
    import {
        goto
    } from "$app/navigation";

    const user = $page.data?.props?.user || null;
    const binDocument = $page.data?.props?.document || null;

    onMount(() => {
        // Set up which actions are available in the current context and to the current user
        const actions = [
            "save",
            "new",
            "copy",
            "raw",
            "duplicate",
            "share",

            "edit",
            "delete"
        ];
        let availableActions = [];

        if (!binDocument) availableActions.push("save");
        availableActions.push("new");

        // If there is a document available, it means the user has access to different functions for it
        if (binDocument) {
            availableActions.push("copy");
            availableActions.push("raw");
            availableActions.push("duplicate");
            availableActions.push("share");
        }

        // Check if the user is the owner of the document, or if the user has a moderation role.
        if (user && (user.id === binDocument?.owner || (user.role === "moderator" || user.role === "admin"))) {
            availableActions.push("edit");
            availableActions.push("delete");
        }

        console.log("All actions: ", actions);
        console.log("Available actions: ", availableActions);

        // Set up classes for each action - used to define actions that are not available.
        // This is done by adding the "action-disabled" class to the action buttons which are not available.
        for (let action of actions) {
            if (!availableActions.includes(action)) {
                let element = document.querySelector(`[data-action=${action}]`);
                element?.classList?.add("action-disabled");
            }
        }
    });

    // TODO - Add action handlers
</script>

<footer>
    <div class="footer-left">
        <button class="action-button" data-action="save">
            <SaveIcon class="action-icon" />
        </button>
        <button class="action-button" data-action="write">
            <WriteIcon class="action-icon" />
        </button>
        <button class="action-button" data-action="copy">
            <CopyIcon class="action-icon" />
        </button>
        <button class="action-button" data-action="raw">
            <RawIcon class="action-icon" />
        </button>
        <button class="action-button" data-action="duplicate">
            <DuplicateIcon class="action-icon" />
        </button>
        <button class="action-button" data-action="share">
            <ShareIcon class="action-icon" />
        </button>
    </div>
    <div class="footer-right">
        <button class="action-button" data-action="edit">
            <EditIcon class="action-icon" />
        </button>
        <button class="action-button" data-action="delete">
            <TrashIcon class="action-icon" />
        </button>
    </div>
</footer>

<style>
    footer {
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 25px;
        padding: 0 25px;
        border-radius: 25px;
        background-color: var(--background-1);
        min-height: 65px;
    }

    .footer-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
    }

    .footer-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
    }

    .action-button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
    }

    :global(.action-icon path) {
        width: 100%;
        height: 100%;
        color: var(--text);
        cursor: pointer;
    }

    :global(
        .action-disabled,
        .action-disabled:hover,
        .action-disabled path
    ) {
        color: var(--text-disabled);
        cursor: not-allowed;
    }
</style>
