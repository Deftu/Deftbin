import Notification from "$lib/interactions/notifications/Notification.svelte"
import NotificationContainer from "$lib/interactions/notifications/NotificationContainer.svelte"

export enum NotificationType {
    Error = 'error',
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
}

export type NotificationOptions = {
    title: string
    message: string
    type: NotificationType
    onTimeout?: () => void | null
    onInteraction?: () => void | null
    onDismiss?: () => void | null
}

export function post(options: NotificationOptions) {
    const container = getNotificationContainer();
    const notification = new Notification({
        target: container,
        props: {
            ...options,
            performRemove: () => {
                notification.$destroy();
            }
        }
    });

    return notification;
}

function getNotificationContainer(): HTMLElement {
    const container = document.querySelector(".notifications");
    if (!container) {
        throw new Error("Notification container not found");
    }

    return container as HTMLElement;
}

export {
    NotificationContainer
};
