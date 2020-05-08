import mongoose from 'mongoose';
import { usuarioSchema } from '../collections/users';
export const Usuario = mongoose.model('Usuario', usuarioSchema);