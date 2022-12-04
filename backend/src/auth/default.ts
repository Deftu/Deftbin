import bcrypt from "bcrypt";
import {
    Router
} from "express";
import {
    User
} from "$db/schemas";
import * as id from "$utils/id";

enum ErrorType {
    MissingFields = "MissingFields",
    InvalidFields = "InvalidFields",
    UserExists = "UserExists"
}

const defaultRouter = Router();

defaultRouter.post("/create", async (req, res) => {
    const {
        email,
        username,
        password,
    } = req.body;

    if (!email || !username || !password) return res.status(400).json({
        "success": false,
        "error": "Email, username and password are required",
        "type": ErrorType.MissingFields
    });

    if (username.length < 3) return res.status(400).json({
        "success": false,
        "error": "Username must be at least 3 characters",
        "type": ErrorType.InvalidFields
    });

    if (password.length < 8) return res.status(400).json({
        "success": false,
        "error": "Password must be at least 8 characters",
        "type": ErrorType.InvalidFields
    });

    const existingUser = await User.findOne({
        email: email
    });

    if (existingUser) return res.status(400).json({
        "success": false,
        "error": "User already exists",
        "type": ErrorType.UserExists
    });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        id: id.generateId(),
        email: email,
        username: username,
        password: hashedPassword
    });
    await user.save();
    res.status(201).json({
        "success": true,
        "error": null,
    });
});

defaultRouter.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) return res.status(400).json({
        "success": false,
        "error": "Email and password are required",
        "type": ErrorType.MissingFields
    });

    const user = await User.findOne({
        email: email
    });

    if (!user) return res.status(400).json({
        "success": false,
        "error": "User does not exist",
        "type": ErrorType.InvalidFields
    });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).json({
        "success": false,
        "error": "Invalid password",
        "type": ErrorType.InvalidFields
    });

    req.login(user, err => {
        if (err) {
            res.status(500).json({
                "success": false,
                "error": err
            });
        } else {
            res.json({
                "success": true,
                "error": null
            });
        }
    });
});

export default defaultRouter;
