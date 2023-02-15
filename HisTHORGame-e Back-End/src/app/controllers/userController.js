const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');

const router = express.Router();

// necessario enviar o token no header para validar e indentificar o usuario
router.use(authMiddleware);

// mostrar todos os usuarios
router.get('/', async (req, res) => {

        /*const sessionId = req.headers.cookie?.split('=')[1];
        const userSession = sessions[sessionId];
        if(!userSession) return res.status(401).send('Invalid session')
        const userId = userSession.userId;
        console.log(userId)*/
        // pegar todos os usuarios do banco
        const users = await User.find();
        // retornar usuarios do banco
        return res.send({ users });

    try {        
        // pegar todos os usuarios do banco
        const users = await User.find().populate('badges');        
        // retornar usuarios do banco
        return res.send({ users });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading Users' });
    }
});

// mostrar todas as top universidades por score e solved
router.get('/universities', async (req, res) => {
try {        
    // pegar todos os usuarios do banco
    const users = await User.find().sort({solved:-1,score:-1});
    // retornar usuarios do banco
    return res.send({ users });
} catch (err) {
    // se houver um erro
    return res.status(400).send({ error: 'Error loading Users' });
}
});

// mostrar todas os top 5 universidades por score e solved
router.get('/top5university', async (req, res) => {
    try {        
        // pegar todos os usuarios do banco        
        const users = await User.find().sort({solved:-1,score:-1}).limit(5).distinct("university");        
        // retornar usuarios do banco
        return res.send({ users });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading Users' });
    }
});

// mostrar todas os top 5 usuários por score
router.get('/top5warriors', async (req, res) => {
    try {        
        // pegar todos os usuarios do banco        
        const users = await User.find().sort({score:-1}).limit(5);        
        // retornar usuarios do banco
        return res.send({ users });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading Users' });
    }
});

// mostrar todas os top 5 geral por score e solved
router.get('/top5general', async (req, res) => {
    try {        
        // pegar todos os usuarios do banco        
        const users = await User.find().sort({score:-1,solved:-1}).limit(5);        
        // retornar usuarios do banco
        return res.send({ users });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading Users' });
    }
});

// mostrar usuario especifico
router.get('/:userId', async (req, res) => {
    try {        
        // pegar usuario especifico banco
        const user = await User.findById(req.params.userId).populate('badges');
        // retornar usuario do banco
        return res.send({ user });
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error loading User' });
    }
});

// atualizar usuario especifico
router.patch('/profile/:userId', async (req, res) => {
    try {    
        // recebendo email, nome e senha do usuario
        const { name, university, email } = req.body;           
        // encontrar e atualizar usuario
        const user = await User.findByIdAndUpdate(req.params.userId, {
            name,
            university,            
            email,                        
        }, { new: true }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo
      
        // retornar usuario atualizado
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating User' });
    }
});

// atualizar o badge do usuario especifico
router.patch('/badge/:userId', async (req, res) => {
    try {    
        // recebendo badge do usuario
        const { badge } = req.body;           
        // encontrar e atualizar usuario
        const user = await User.findByIdAndUpdate(req.params.userId, {            
            $push: {
                badges: badge,
            }
        }, { 
            new: true
         }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo
      
        // retornar usuario atualizado
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating User' });
    }
});

// atualizar o score do usuario especifico
router.patch('/quiz/:userId', async (req, res) => {
    try {    
        // recebendo badge do usuario
        const { score, timePlayed, speedResponseAverage, correctResponseAverage } = req.body;           
        // encontrar e atualizar usuario
        const user = await User.findByIdAndUpdate(req.params.userId, {            
            speedResponseAverage,
            correctResponseAverage,
            $inc : {
                'quizzesPlayed': 1,
                'timePlayed' : timePlayed,
                'score': score,
            },        
        }, { 
            new: true
         }); // true diz pro mongoose retornar o objeto atualizado e nao o antigo
      
        // retornar usuario atualizado
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating User' });
    }
});

// deletar usuario
router.delete('/:userId', async (req, res) => {
    try {        
        // encontrar e remover usuario especifico do banco
        await User.findByIdAndRemove(req.params.userId);
        // retornar status ok
        return res.send();
    } catch (err) {
        // se houver um erro
        return res.status(400).send({ error: 'Error removing User' });
    }
});

module.exports = app => app.use('/users', router);