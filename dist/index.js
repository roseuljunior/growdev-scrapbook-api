"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./classes/User"));
const Errands_1 = __importDefault(require("./classes/Errands"));
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const users = [];
const errands = [];
app.get('/', (request, response) => {
    return response.send('OK!');
});
app.post('/myId', checkToken, (request, response) => {
    const { userIndex } = request.body;
    if (userIndex >= 0) {
        return response.json(users[userIndex].id);
    }
    ;
    return response.sendStatus(401);
});
app.post('/user/create', (request, response) => {
    const { email, password } = request.body;
    if (email.indexOf('@') >= 0 && email.indexOf('.co') >= 0) {
        const userIndex = users.findIndex(user => user.email === email);
        if (userIndex >= 0) {
            return response.json({
                mensagem: "Esse usuário já existe."
            });
        }
        else {
            const newUser = new User_1.default(email, password);
            users.push(newUser);
            return response.status(201).json(newUser);
        }
        ;
    }
    ;
    return response.status(400).json({
        mensagem: 'Envie um e-mail válido.'
    });
});
app.post('/user/login', (request, response) => {
    const { email, password } = request.body;
    const userIndex = users.findIndex(user => user.email === email && user.password === password);
    if (userIndex >= 0) {
        if (users[userIndex].token !== '') {
            users[userIndex].setLogin();
            const token = users[userIndex].token;
            return response.json({
                mensagem: "Você foi desconectado de outra sessão e seu login foi efetuado com sucesso! (:",
                token
            });
        }
        else {
            users[userIndex].setLogin();
            const token = users[userIndex].token;
            return response.status(200).json({
                mensagem: "Login efetuado com sucesso!",
                token
            });
        }
        ;
    }
    ;
    return response.status(400).json({
        mesangem: "Usuário ou senha incorretos. Por favor verifique os campos e tente novamente."
    });
});
app.post('/checkToken', checkToken, (request, response) => {
    const { userIndex } = request.body;
    if (userIndex >= 0) {
        return response.sendStatus(200);
    }
    ;
    return response.sendStatus(401);
});
app.post('/user/logout', (request, response) => {
    const { token } = request.body;
    if (!token) {
        return response.json({
            mensagem: "Você precisa enviar um token para fazer o logout."
        });
    }
    ;
    const userIndex = users.findIndex(user => user.token === token);
    if (userIndex >= 0) {
        users[userIndex].setLogout();
        return response.json({
            mensagem: "Seu logout foi efetuado com sucesso."
        });
    }
    else {
        return response.json({
            mensagem: "Seu token é inválido."
        });
    }
    ;
});
app.get('/user', (request, response) => {
    const { limit } = request.query;
    const showUsers = users.map(user => user.email);
    if (limit) {
        const limitString = limit?.toString();
        const limitNumber = parseInt(limitString);
        const limitedUsers = showUsers.slice(0, limitNumber);
        return response.json(limitedUsers);
    }
    ;
    return response.json(showUsers);
});
app.get('/user/:id', (request, response) => {
    const { id } = request.params;
    const user = users.find(user => user.id === (id));
    if (user) {
        return response.json(user);
    }
    ;
    return response.status(404).json({
        mensagem: 'Usuário não encontrado, ID inválido'
    });
});
app.put('/user/:id', (request, response) => {
    const { id } = request.params;
    const { email, password } = request.body;
    const indexUser = users.findIndex(user => user.id === (id));
    if (indexUser < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }
    ;
    users[indexUser].email = email;
    users[indexUser].password = password;
    return response.json(users[indexUser]);
});
app.delete('/user/:id', (request, response) => {
    const { id } = request.params;
    const indexUser = users.findIndex(user => user.id === (id));
    if (indexUser < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }
    ;
    users.splice(indexUser, 1);
    return response.sendStatus(204);
});
function checkToken(request, response, next) {
    const { token } = request.body;
    if (token) {
        const userIndex = users.findIndex(user => {
            return user.token === token;
        });
        if (userIndex >= 0) {
            request.body.userIndex = userIndex;
            next();
        }
        ;
        return response.status(403).json({
            mensagem: 'Token inválido!'
        });
    }
    ;
    return response.status(401).json({
        mensagem: 'Envie seu token'
    });
}
;
app.post('/errands', checkToken, (request, response) => {
    const { userIndex, title, description } = request.body;
    const newErrands = new Errands_1.default(users[userIndex].id, title, description);
    errands.push(newErrands);
    return response.status(201).json(newErrands);
});
app.put('/errands/:id', checkToken, (request, response) => {
    const { id } = request.params;
    const { userIndex, title, description } = request.body;
    const userId = users[userIndex].id;
    const indexErrands = errands.findIndex(errand => errand.id === (id));
    if (indexErrands < 0) {
        return response.status(404).json({
            mensagem: 'Não há mensagens armazenadas.'
        });
    }
    ;
    if (userId === errands[indexErrands].userId) {
        errands[indexErrands].title = title;
        errands[indexErrands].description = description;
        return response.json(errands[indexErrands]);
    }
    ;
    return response.status(403).json({
        mensagem: 'Apenas o autor da mensagem pode alterá-la.'
    });
});
app.delete('/errands/:id', checkToken, (request, response) => {
    const { id } = request.params;
    const { userIndex } = request.body;
    const userId = users[userIndex].id;
    const indexErrands = errands.findIndex(errand => errand.id === (id));
    if (userId) {
        if (indexErrands < 0) {
            return response.status(404).json({
                mensagem: 'Não há mensagens armazenadas.'
            });
        }
        ;
        if (userId === errands[indexErrands].userId) {
            errands.splice(indexErrands, 1);
            return response.sendStatus(204);
        }
        ;
    }
    ;
    return response.status(403).json({
        mensagem: 'Apenas o autor da mensagem pode deleta-la.'
    });
});
app.post('/errands/search/:id', checkToken, (request, response) => {
    const { id } = request.params;
    const { userIndex } = request.body;
    const userId = users[userIndex].id;
    const indexErrands = errands.findIndex(errand => errand.id === (id));
    if (indexErrands < 0) {
        return response.status(404).json({
            mensagem: 'Não há mensagens armazenadas.'
        });
    }
    ;
    if (userId === errands[indexErrands].userId) {
        return response.json(errands[indexErrands]);
    }
    return response.status(403).json({
        mensagem: 'Apenas o autor da mensagem pode alterá-la.'
    });
});
app.post('/getposts', checkToken, (request, response) => {
    return response.json(errands);
});
app.listen(port, () => {
    console.log('API rodando...');
});
