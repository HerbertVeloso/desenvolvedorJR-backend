const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('./app/models/');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

    
    app.get('/', (req, res) => {
        res.send('Funcionando!');
    });
    
    
    app.get('/users', (req, res) => {
        User.findAll({}).then(users => {
            res.json({ data: users });
        }).catch(error => {
            res.json({ error });
        });
    });
    
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        User.findOne({ where: { id } }).then(user => {
            res.json({ data: user });
        }).catch(error => {
            res.json({ error });
        });
    });
    
    app.post('/register', async (req, res) => {
        const user = await User.create(req.body);
        res.json(user);
    });

    app.put('/edit/:id', (req, res) => {
        const id = req.params.id;
        const { name, email, password, dt_nasc } = req.body;
        const mensagem = 'Usuário de id ' + id + ' atualizado com sucesso!';

        console.log('---------------------')
        console.log(req.params)
        console.log(req.param)
        console.log(req.body)

        User.update({
            name,
            email,
            password,
            dt_nasc
        }, {
            where: { id }
        }).then(user => {
            res.json({ message: mensagem });
        }).catch(error => {
            res.json({ error });
        });
    });

    app.delete('/delete/:id', (req, res) => {
        const id = req.params.id;
        const mensagem = 'Usuário de id ' + id + ' excluido com sucesso!';
        User.destroy({ where: { id } }).then(user => {
            res.json({ message: mensagem });
        }).catch(error => {
            res.json({ error });
        });
    });
    

    app.listen(3000);