import {
    Express,
    Router
} from "express";

export default interface AuthHandler {
    setup(express: Express, router: Router): void;
}
