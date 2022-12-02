import mongoose, {
    Schema,
    SchemaTypes
} from "mongoose";

// ID is auto-generated
export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    connections: {
        discord: {
            id: string;
            username: string;
            discriminator: string;
            refreshToken: string;
        };
        github: {
            id: string;
            username: string;
            refreshToken: string;
        };
    };
};

const UserSchema = new Schema<User>({
    id: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    username: {
        type: SchemaTypes.String,
        required: true
    },
    password: {
        type: SchemaTypes.String
    },
    email: {
        type: SchemaTypes.String,
        required: true
    },
    connections: {
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
            },
            refreshToken: {
                type: SchemaTypes.String
            }
        }
    }
});

export default mongoose.model<User>("users", UserSchema, "auth");
