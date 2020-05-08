"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../middlewares/users");
exports.user_router = express_1.Router();
exports.user_router.post('/user', users_1.postUsuario);
exports.user_router.put('/user/:id', users_1.updateUsuario);
exports.user_router.get('/users', users_1.getUsuario);
exports.user_router.delete('/user/:id', users_1.deleteUsuario);
