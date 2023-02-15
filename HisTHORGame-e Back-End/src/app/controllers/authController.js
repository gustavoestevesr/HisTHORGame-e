const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const uuidv4 = require('uuid').v4;
const sessions = {}

const authConfig = require('../../config/auth.json')

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        // verifica se já existe o usuario
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const user = await User.create(req.body);

        // não retornar a senha
        user.password = undefined;

        // deu tudo certo
        res.send({
            user,
            token: generateToken({ id: user.id }),
        });

    } catch (err) {
        res.status(400).send({ error: 'Registration failed' });
    }

});

router.post('/authenticate', async (req, res) => {

    // recebendo email e senha do usuario
    const { email, password } = req.body;

    // pegando o email e senha recebidos pelo o body do metodo post
    const user = await User.findOne({ email }).select('+password');

    // usuário nao encontrado
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    // senha incorreta
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    // não retornar a senha
    user.password = undefined;

    const sessionId = uuidv4();
    const _token = generateToken({ id: user.id });

    sessions[sessionId] = { userToken: _token, userId: user._id };
    res.set('Set-Cookie', `session=${sessionId}`)

    // gerar token a cada autenticacao
    const token =
        // deu tudo certo
        res.json({
            user,
            token: _token,
        });

});

router.post('/forgot_password', async (req, res) => {

    // recebendo email do usuario
    const { email } = req.body;

    try {

        // buscar se existe o email do usuario
        const user = await User.findOne({ email });

        // usuário nao encontrado
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        // gerar token de 20 digitos no formato hexadecimal
        const token = crypto.randomBytes(20).toString('hex');

        // determinar o tempo de expiração
        const now = new Date();
        now.setHours(now.getHours() + 1);

        // atualizar dados do banco
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        // disparar email com template html para o usuario com o token de troca de senha
        mailer.sendMail({
            to: email,
            from: 'histhorgame@gmail.com.br',
            template: 'auth/forgot_password',
            context: { token },
        }), (err) => {
            if (err) {
                res.status(400).send({ error: 'Canoot send forgot password email, try again' });
            }           
        }

        // emitir status code ok
        res.send();

    } catch (err) {
        res.status(400).send({ error: 'Error on forgot password, try again' });
    }
});

router.post('/reset_password', async (req, res) => {

    // recebendo email, token e senha do usuario
    const { email, token, password } = req.body;

    try {

        // buscar se existe o email do usuario
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

        // usuário nao encontrado
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        // verificar se o token está correto
        if (token !== user.passwordResetToken) {
            return res.status(400).send({ error: 'Token invalid' });
        }

        // pegar a hora atual
        const now = new Date();

        // verificar se o token foi expirado
        if (now > user.passwordResetExpires) {
            return res.status(400).send({ error: 'Token expired, generate a new one' });
        }

        // se deu tudo certo, salvar a nova senha
        user.password = password;

        // salvar no banco
        await user.save();

        // emitir status code ok
        res.send();

    } catch (err) {

        res.status(400).send({ error: 'Canoot reset password, try again' });

    }

});

router.post('/logout', async (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    delete sessions[sessionId];
    res.set('Set-Cookie', `session=; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    res.status(200).send('Logout');
});

module.exports = app => app.use('/auth', router);