import {Router} from 'express';
import { postUsuario, updateUsuario, getUsuario, deleteUsuario } from '../middlewares/users';
export const user_router = Router();
user_router.post('/user', postUsuario);
user_router.put('/user/:id', updateUsuario );
user_router.get('/users', getUsuario );
user_router.delete('/user/:id', deleteUsuario )