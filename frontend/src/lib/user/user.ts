import {
    fetchBackend
} from "$lib/backend";

export type User = {
    id: string;
    username: string;
    email: string;
    avatar: string;
    connections: {
        website: {
            url: string;
        },
        discord: {
            id: string;
            username: string;
            discriminator: string;
        };
        github: {
            id: string;
            username: string;
        };
    };
};

export enum DocumentRemoveType {
    DELETE = "delete",
    FLAGGED = "flagged",
    SPAM = "spam"
};

export type DocumentRemoval = {
    type: DocumentRemoveType;
    reason: string;
    timestamp: Date;
};

export type DocumentEdit = {
    name: string;
    language: string;
    content: string;
    user: string;
    timestamp: Date;
};

export type Document = {
    key: string;
    name: string;
    language: string;
    content: string;
    owner?: string | null;
    createdAt: Date;
    removal?: DocumentRemoval | null;
    edits?: (DocumentEdit | null)[];
};

export async function loadUser(sessionId: string) {
    try {
        const response = await fetchBackend("auth", {
            headers: {
                Cookie: `connect.sid=${sessionId}`
            },
            withCredentials: true
        });
        const data = await response.data;
        if (data.authenticated) {
            return data.user as User;
        } else return null;
    } catch (err) {
        console.error("Failed to load user... This should never happen.", err);
        return null;
    }
}

export async function loadUserDocuments(user: User) {
    try {
        const response = await fetchBackend(`documents/user/${user.id}`);
        const data = await response.data;
        return data.map((doc: Document) => {
            doc.createdAt = new Date(doc.createdAt);
            if (doc.edits) {
                doc.edits = doc.edits.map((edit) => {
                    if (edit) edit.timestamp = new Date(edit.timestamp);

                    return edit;
                });
            }

            return doc;
        });
    } catch (err) {
        console.error("Failed to load documents... This should never happen.", err);
        return [];
    }
}
