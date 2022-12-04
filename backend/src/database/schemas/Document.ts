import {
    Schema,
    SchemaTypes
} from "mongoose";
import documentConnection from "$db/document";

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
    content: string;
    timestamp: Date;
};

export interface Document {
    key: string;
    name: string;
    language: string;
    content: string;
    owner?: string | null;
    createdAt: Date;
    removal?: DocumentRemoval | null;
    edits?: (DocumentEdit | null)[];
};

const DocumentRemovalSchema = new Schema({
    type: {
        type: SchemaTypes.String,
        enum: Object.values(DocumentRemoveType),
        required: true
    },
    reason: {
        type: SchemaTypes.String,
        required: true
    },
    timestamp: {
        type: SchemaTypes.Date,
        required: true
    }
});

const DocumentEditSchema = new Schema({
    content: {
        type: SchemaTypes.String,
        required: true
    },
    timestamp: {
        type: SchemaTypes.Date,
        required: true
    }
});

const DocumentSchema = new Schema<Document>({
    key: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: SchemaTypes.String
    },
    language: {
        type: SchemaTypes.String
    },
    content: {
        type: SchemaTypes.String,
        required: true
    },
    owner: {
        type: SchemaTypes.String
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true
    },
    removal: {
        type: DocumentRemovalSchema
    },
    edits: {
        type: [DocumentEditSchema]
    }
});

export default documentConnection.model<Document>("Document", DocumentSchema, "documents");
