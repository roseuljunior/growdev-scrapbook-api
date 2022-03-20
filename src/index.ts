import express, { Request, Response } from 'express';
import cors from 'cors';

import Users from './classes/User';
import Errands from './classes/Errands';

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));             
app.use(cors());

const users: Users [] = [];
const errands: Errands[] = [];

app.get('/', (request: Request, response: Response) => {
    return response.send('OK!');
});

app.post('/user/create', (request: Request, response: Response) => {
    const { login, password } = request.body;

    const userIndex = users.findIndex(user => user.login === login);

    if (userIndex >= 0) {
        return response.json({
            mensagem: "Esse usuário já existe."
        });
    } else {
        const newUser = new Users(login, password);
        users.push(newUser);

        return response.status(201).json(newUser);  
    };
        
    });

app.post('/user/login', (request: Request, response: Response) => {
    const { login, password } = request.body;
    const userIndex = users.findIndex(user => user.login === login && user.password === password);

    if (userIndex >= 0) {

        if (users[userIndex].token !== '') {
            return response.json({
                mensagem: "Você já está logado."
            });
        } else {
            users[userIndex].setLogin();
            const token = users[userIndex].token;

            return response.json({
                mensagem: "Login efetuado com sucesso!",
                token
            });
        };

    };

    return response.json({
        mesangem: "Usuário ou senha incorretos. Por favor verifique os campos e tente novamente."
    });
    
});

app.post('/user/logout', (request: Request, response: Response) => {
    const { token } = request.body;
    if (!token) {
        return response.json({
            mensagem: "Você precisa enviar um token para fazer o logout."
        });
    };
    const userIndex = users.findIndex(user => user.token === token);

    if (userIndex >= 0) {
        users[userIndex].setLogout();
        return response.json({
            mensagem: "Seu logout foi efetuado com sucesso."
        });
    } else {
        return response.json({
            mensagem: "Seu token é inválido."
        });
    };
});

app.get('/user', (request: Request, response: Response) => {
    const { limit } = request.query;
    const showUsers = users.map(user => user.login);
    
    if (limit) {                               
        const limitString = limit?.toString();                     
        const limitNumber = parseInt(limitString);
        const limitedUsers = showUsers.slice(0, limitNumber);
        
        return response.json(limitedUsers);                                
    };
    
    return response.json(showUsers);
});

app.get('/user/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const user = users.find(user => user.id === (id));
    
    if (user) {
        return response.json(user);
    };

    return response.status(404).json({
        mensagem: 'Usuário não encontrado, ID inválido'
    });
    
});

app.put('/user/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const { login, password } = request.body;
    const indexUser = users.findIndex(user => user.id === (id));
    
    if (indexUser < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    };

    users[indexUser].login = login;
    users[indexUser].password = password;

    return response.json(users[indexUser]);
});

app.delete('/user/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const indexUser = users.findIndex(user => user.id === (id));

    if (indexUser < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    };

    users.splice(indexUser, 1);
    return response.sendStatus(204);
});

app.post('/errands/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const { token, title, description } = request.body;
    const newErrands = new Errands(title, description);
    
    errands.push(newErrands);
    return response.status(201).json(newErrands);
    
});

app.put('errands/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const { token, title, description } = request.body;
    const indexErrands = errands.findIndex(errands => errands.id === (id));
    
    if (indexErrands < 0) {
        return response.status(404).json({
            mensagem: 'Não há mensagens armazenadas.'
        });
    };

    errands[indexErrands].title = title;
    errands[indexErrands].description = description;

    return response.json(users[indexErrands]);

    const userIndex = users.findIndex(user => user.token === token)

});



app.listen(port, () => {
    console.log('API rodando...');
});

