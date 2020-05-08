"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role válido'
};
exports.usuarioSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'the name is necesary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'the email is necesary']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
exports.usuarioSchema.plugin(mongoose_unique_validator_1.default, {
    message: '{PATH} debe de ser único'
});
// toJSON lo llamamos cuando siempre tratamos de imprimir
exports.usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
