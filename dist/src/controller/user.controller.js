"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../model/user.model"));
const register = [
    (0, express_validator_1.body)('name').not().isEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            let user = yield user_model_1.default.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
            user = new user_model_1.default({
                name,
                email,
                password
            });
            const salt = yield bcryptjs_1.default.genSalt(10);
            user.password = yield bcryptjs_1.default.hash(password, salt);
            yield user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };
            const token = jsonwebtoken_1.default.sign(payload, 'bemsaIhany2226', { expiresIn: '1h' });
            res.status(201).json({ token });
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })
];
exports.register = register;
const login = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'),
    (0, express_validator_1.body)('password').exists().withMessage('Password is required'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            const token = jsonwebtoken_1.default.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })
];
exports.login = login;
