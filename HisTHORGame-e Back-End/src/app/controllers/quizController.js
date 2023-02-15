const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Quiz = require('../models/quiz');

const router = express.Router();

// necessario enviar o token no header para validar e indentificar o usuario
router.use(authMiddleware);

// atualizar quiz especifico
router.put('/:quizId', async (req, res) => {
    try {       
        // recebendo title e description do corpo da requisicao
        const { title, image, synopsis, description, questions, choices, answers, badges } = req.body; 
        // encontrar e atualizar quiz
        const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, {
            title,
            image,
            synopsis,
            description,
            questions,
            choices,
            answers,
            badges,
        }, { new: true }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo      
        return res.send({ quiz }); // retornar quiz atualizado
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating quiz' });
    }
});

// remover quiz especifico
router.delete('/:quizId', async (req, res) => {
    try {        
        // encontrar e remover quiz especifico do banco
        await Quiz.findByIdAndRemove(req.params.quizId);
        // retornar status ok
        return res.send();
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error removing quiz' });
    }
});

// criar quiz 
router.post('/register', async (req, res) => {
    try {        
        // pegar quiz
        const quiz = await Quiz.create(req.body);   

        // retornar quiz criado
        return res.send({ quiz });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new quiz' });
    }
});

// mostrar todos os quizzes
router.get('/', async (req, res) => {
    try {        
        // pegar todos os quizzes do banco
        const quizzes = await Quiz.find();
        // retornar quizzes do banco
        return res.send({ quizzes });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading quizzes' });
    }
});

// mostrar quiz especifico
router.get('/:quizId', async (req, res) => {
    try {        
        // pegar quizzes especifico banco
        const quiz = await Quiz.findById(req.params.quizId);
        // retornar quiz do banco
        return res.send({ quiz });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading quiz' });
    }
});

module.exports = app => app.use('/quizzes', router);