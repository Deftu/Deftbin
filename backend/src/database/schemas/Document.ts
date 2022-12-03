import {
    Schema,
    SchemaTypes
} from "mongoose";
import documentConnection from "../document";

export enum DocumentRemoveType {
    DELETE = "delete",
    FLAGGED = "flagged",
    SPAM = "spam"
};

export interface Document {
    id: string;
    name: string;
    language: string;
    content: string;
    owner: string;
    createdAt: Date;
    remove: {
        type: DocumentRemoveType;
        reason: string;
    };
    edits: {
        id: string;
        content: string;
        timestamp: Date;
    }[];
};

const DocumentSchema = new Schema<Document>({
    id: {
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
    remove: {
        type: {
            type: SchemaTypes.String,
            required: true
        },
        reason: {
            type: SchemaTypes.String,
            required: true
        }
    },
    edits: {
        id: {
            type: SchemaTypes.String,
            required: true,
            unique: true
        },
        content: {
            type: SchemaTypes.String,
            required: true
        },
        timestamp: {
            type: SchemaTypes.Date,
            required: true
        }
    }
});

export default documentConnection.model<Document>("Document", DocumentSchema, "documents");
