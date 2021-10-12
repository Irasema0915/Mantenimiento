'use strict'

const { query } = require("../../Models/Role");

const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Rol = use('App/Models/Role');
const Permiso = use('App/Models/Permiso');
const Hash = use('Hash');

class UserController {

    // register user
    async register({ request, response }) {
        const data = await request.all();
        let user = new User();

        user.nombre = data.nombre;
        user.email = data.email;
        user.password = data.password;
        user.apellido_paterno = data.apellido_paterno;
        user.apellido_materno = data.apellido_materno;
        user.id_rol = data.id_rol;

        if (await user.save()) {
            return response.status(200).json({
                status: 'OK',
                message: 'El usuario ha sido registrado exitosamente.'
            })
        } else {
            return response.status(500).json({
                status: 'FAILED',
                message: 'Hubo un error al tratar de registrar al usuario. Verifique sus datos.'
            })
        }
    }

    async login({ request, auth, response }) {
        try {
            //const { email, password } = await request.all();
            const data = request.all();

            let email = await data.email;
            let password = await data.password;

            // Checking if user already has a token
            const user = await User.findBy('email', data.email);

            const sesionVerification = await Token.query().select('*').where('user_id', user.id).fetch();

            if (sesionVerification.size() > 0) {

                // find a token with the user id
                const token = await Token.findBy('user_id', user.id);
                await token.delete();

                return await auth.withRefreshToken().attempt(email, password);

            } else {
                return await auth.withRefreshToken().attempt(email, password);
            }
        } catch (error) {
            return response.status(400).json({ message: "Usuario o contraseña incorrectos, favor de verificar los datos" })
        }

    }

    async userInfo({ response, auth }) {
        try {
            const user = await auth.getUser();
            return response.status(200).json([user]);
        } catch (error) {
            return response.status(401).json({ message: "Usuario no existente" });
        }
    }

    async deleteAuth({ response, auth }) {
        try {
            // get user information 
            const user = await auth.getUser();
            const token = await Token.findBy('user_id', user.id);
            await token.delete();
            return response.status(200).json({ message: "Sesión finalizada correctamente" });
        } catch (error) {
            return response.status(500).json({ message: "No se realizo la petición exitosamente" });
        }
    }

    async newRol({ request, response }) {
        try {
            const data = await request.all();
            const rol = await new Rol();

            rol.descripcion = data.descripcion;
            rol.id_departamento = data.id_departamento;
            rol.id_permiso = data.id_permiso;

            if (await rol.save()) {
                return response.status(200).json(rol);
            }
        } catch (error) {
            return response.status(500).json({ message: "Error" });
        }
    }
    async getRol({ response }) {
        try {
            const rol = await Rol.query().select('*').fetch();

            return response.status(200).json(rol);
        } catch (error) {
            return response.status(500).json({ message: "Error" });
        }
    }

}

module.exports = UserController