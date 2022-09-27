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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.status(200).json({
        msg: 'getUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(202).json({
            msg: 'No existe el usuario',
        });
    }
    ;
    res.status(200).json({
        msg: 'getUsuarios',
        usuario
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const exixteEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            }
        });
        if (exixteEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email',
            });
        }
        const usuario = new usuario_1.default(body);
        yield usuario.save();
        res.status(200).json({
            msg: 'postUsuarios',
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Fallo del servidor',
            body
        });
    }
    ;
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuarioEx = yield usuario_1.default.findByPk(id);
        if (!usuarioEx) {
            return res.status(400).json({
                msg: 'No existe un usuario con ese id',
            });
        }
        ;
        const exixteEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            }
        });
        if (exixteEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email',
            });
        }
        yield usuarioEx.update(body);
        res.status(200).json({
            msg: 'postUsuarios',
            usuario: usuarioEx
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Fallo del servidor',
            body
        });
    }
    ;
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuarioEx = yield usuario_1.default.findByPk(id);
        if (!usuarioEx) {
            return res.status(400).json({
                msg: 'No existe un usuario con ese id',
            });
        }
        ;
        yield usuarioEx.update({ estado: false });
        res.status(200).json({
            msg: 'postUsuarios',
            usuario: usuarioEx
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Fallo del servidor',
        });
    }
    ;
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map