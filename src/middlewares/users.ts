import {Request, Response} from 'express';
import { Usuario } from '../db/mongoose';
import bcrypt from 'bcrypt';
import _ from 'underscore';
export const postUsuario = (req: Request, res: Response) => {
    let body = req.body;

    let objUsuario = new Usuario({
        name:   body.name,
        email:  body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    objUsuario.save((err, usuarioDB) => {
       if (err){
           res.status(500).json({
               ok: false,
               content: 'Error en la base de datos',
               err
           })
       }
       res.status(200).json({
        ok: true,
        content: usuarioDB
        })                          
    })             
}


export const updateUsuario = (req: Request, res: Response) => {
    let { id } = req.params;
    //                          LO QUE SI SE VA A PODER ACTUALIZAR
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state' ]);
    

    const options = {
        // nos entrega el objeto cambiado
        new: true,
        // valida los validadores del schema
        runValidators: true
    }
    Usuario.findByIdAndUpdate(id, body, options ,(err, usuarioDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                content: 'Error en la base de datos',
                err
            })
        }

        res.status(200).json({
            ok: true,
            content: usuarioDB
        })
    })
}

export const getUsuario = (req: Request, res: Response) => {
    // exec => ejecutar | limit = limite | skipt = saltar - paginacion
   
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite)

    // let validator = {
    //     state: true
    // }

    // {} es como un where , y el siguiente argumento que es un string es para decirle a mongo que es lo que queremos traer y lo que no definamos no se traera
    Usuario.find({state: true}, 'name email role state google' )
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        content: 'Error en la base de datos',
                        err
                    })
                }
                Usuario.count({state: true}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        content: usuarios,
                        cuantos: conteo
                    }); 
                })
            })
}

// export const deleteUsuario = (req: Request, res: Response) => {
//     let {id} = req.params;
//             // 3 parametros - id, options, callback
//     Usuario.findByIdAndRemove(id, (err, usuarioDelete : any ) => {
//         if (err) {
//             res.status(500).json({
//                 ok: false,
//                 content: 'Error en la base de datos',
//                 err
//             })
//         }   

//         if (!usuarioDelete) {
//             res.status(500).json({
//                 ok: false,
//                 content: 'Error en la base de datos',
//                 err: {
//                     message: 'Usuario no encontrado'
//                 }
//             })
//         }
//         res.status(200).json({
//             ok: true,
//             usuario: usuarioDelete
//         })
//     })
// }
export const deleteUsuario = (req: Request, res: Response) => {
    let {id} = req.params;
    let estadoCambiado = {
        state: false
    }
    // console.log(Usuario)
    Usuario.findByIdAndUpdate(id, estadoCambiado, {new: true} ,(err, usuarioDB: any) => {
        if (err) {
            res.status(500).json({
                ok: false,
                content: 'Error en la base de datos',
                err
            })
        }  
        if (!usuarioDB) {
            res.status(500).json({
                ok: false,
                content: 'Error en la base de datos',
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB    
        }) 
    })
}