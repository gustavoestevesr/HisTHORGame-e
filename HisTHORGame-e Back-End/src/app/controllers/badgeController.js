const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Badge = require('../models/badge');

const router = express.Router();

// necessario enviar o token no header para validar e indentificar o usuario
router.use(authMiddleware);

// atualizar badge especifico
router.put('/:badgeId', async (req, res) => {
    try {        
        // recebendo title e description do corpo da requisicao
        const { title, quiz, image } = req.body;
        // encontrar e atualizar badge
        const badge = await Badge.findByIdAndUpdate(req.params.badgeId, {
            title,
            quiz,
            image
        }, { new: true }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo      
        // retornar badge atualizado
        return res.send({ badge });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating Badge' });
    }
});

// remover badge especifico
router.delete('/:badgeId', async (req, res) => {
    try {        
        // encontrar e remover badge especifico do banco
        await Badge.findByIdAndRemove(req.params.badgeId);
        // retornar status ok
        return res.send();
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error removing Badge' });
    }
});

// criar badge 
router.post('/register', async (req, res) => {
    try {        
        // pegar badge
        const badge = await Badge.create(req.body);        
        // retornar badge criado
        return res.send({ badge });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new Badge' });
    }
});

// mostrar todos os badges
router.get('/', async (req, res) => {
    try {        
        // pegar todos os badges do banco
        const badges = await Badge.find();
        // retornar badges do banco
        return res.send({ badges });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading Badges' });
    }
});

// mostrar badge especifico
router.get('/:badgeId', async (req, res) => {
    try {        
        // pegar badges especifico banco
        const badge = await Badge.findById(req.params.badgeId);
        // retornar badge do banco
        return res.send({ badge });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading Badge' });
    }
});

module.exports = app => app.use('/badges', router);