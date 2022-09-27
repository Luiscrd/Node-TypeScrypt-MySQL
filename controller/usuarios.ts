import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll()

    res.status(200).json({
        msg: 'getUsuarios',
        usuarios
    })

};

export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if( !usuario ) {

        return res.status(202).json({
            msg: 'No existe el usuario',
        });

    };

    res.status(200).json({
        msg: 'getUsuarios',
        usuario
    });

};

export const postUsuario = async(req: Request, res: Response) => {

    
    const { body } = req;

    try {

        const exixteEmail = await Usuario.findOne({
            where: {
                email: body.email,
            }
        });

        if ( exixteEmail ) {

            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email',
            })
        }

        const usuario = new Usuario(body);
        await usuario.save();

        res.status(200).json({
            msg: 'postUsuarios',
            usuario
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Fallo del servidor',
            body
        });
        
    };

};

export const putUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuarioEx = await Usuario.findByPk(id)

        if( !usuarioEx ) {

            return res.status(400).json({
                msg: 'No existe un usuario con ese id',
            })

        };

        const exixteEmail = await Usuario.findOne({
            where: {
                email: body.email,
            }
        });

        if ( exixteEmail ) {

            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email',
            })
        }

        await usuarioEx.update(body);

        res.status(200).json({
            msg: 'postUsuarios',
            usuario: usuarioEx
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Fallo del servidor',
            body
        });
        
    };

};

export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const usuarioEx = await Usuario.findByPk(id)

        if( !usuarioEx ) {

            return res.status(400).json({
                msg: 'No existe un usuario con ese id',
            })

        };

        await usuarioEx.update({estado:false});

        res.status(200).json({
            msg: 'postUsuarios',
            usuario: usuarioEx
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Fallo del servidor',
        });
        
    };

};