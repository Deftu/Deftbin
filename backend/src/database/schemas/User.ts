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

export interface UserWebsiteConnection {
    url: string;
}

export interface UserDiscordConnection {
    id: string;
    username: string;
    discriminator: string;
};

export interface UserGitHubConnection {
    id: string;
    username: string;
};

export interface UserConnections {
    website: UserWebsiteConnection;
    discord: UserDiscordConnection;
    github: UserGitHubConnection;
};

export interface UserMetadata {
    avatar: string;
    username: string;
    pronouns: string;
    description: string;
    connections: UserConnections;
};

export interface User {
    id: string;
    role: UserRole;
    email: string;
    password: string;
    metadata: UserMetadata;
};

const UserWebsiteConnectionSchema = new Schema<UserWebsiteConnection>({
    url: {
        type: SchemaTypes.String
    }
});

const UserDiscordConnectionSchema = new Schema<UserDiscordConnection>({
    id: {
        type: SchemaTypes.String
    },
    username: {
        type: SchemaTypes.String
    },
    discriminator: {
        type: SchemaTypes.String
    }
});

const UserGitHubConnectionSchema = new Schema<UserGitHubConnection>({
    id: {
        type: SchemaTypes.String
    },
    username: {
        type: SchemaTypes.String
    }
});

const UserConnectionsSchema = new Schema<UserConnections>({
    website: {
        type: UserWebsiteConnectionSchema
    },
    discord: {
        type: UserDiscordConnectionSchema
    },
    github: {
        type: UserGitHubConnectionSchema
    }
});

const UserMetadataSchema = new Schema<UserMetadata>({
    avatar: {
        type: SchemaTypes.String
    },
    username: {
        type: SchemaTypes.String,
        required: true
    },
    pronouns: {
        type: SchemaTypes.String
    },
    description: {
        type: SchemaTypes.String
    },
    connections: {
        type: UserConnectionsSchema
    }
});

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
    metadata: {
        type: UserMetadataSchema
    }
});

export default authConnection.model<User>("users", UserSchema, "auth");
