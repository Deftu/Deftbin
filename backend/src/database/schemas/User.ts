import {
    Schema,
    SchemaTypes
} from "mongoose";
import authConnection from "$db/auth";

export enum UserRole {
    Admin = "admin",
    Moderator = "moderator",
    User = "user"
}

export interface User {
    id: string;
    role: UserRole;
    email: string;
    password: string;
    username: string;
    avatar: string;
    connections: {
        website: {
            url: string;
        };
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

const UserSchema = new Schema<User>({
    id: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    role: {
        type: SchemaTypes.String,
        required: true,
        default: UserRole.User,
        enum: Object.values(UserRole)
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String
    },
    username: {
        type: SchemaTypes.String,
        required: true
    },
    avatar: {
        type: SchemaTypes.String,
    },
    connections: {
        website: {
            url: {
                type: SchemaTypes.String
            }
        },
        discord: {
            id: {
                type: SchemaTypes.String
            },
            username: {
                type: SchemaTypes.String
            },
            discriminator: {
                type: SchemaTypes.String
            },
            refreshToken: {
                type: SchemaTypes.String
            }
        },
        github: {
            id: {
                type: SchemaTypes.String
            },
            username: {
                type: SchemaTypes.String
            }
        }
    }
});

export default authConnection.model<User>("users", UserSchema, "auth");
