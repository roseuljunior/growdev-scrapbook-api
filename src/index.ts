import express, { Request, Response } from 'express'
import cors from 'cors'
import { request } from 'http'
import { userInfo } from 'os'
import { stringify } from 'querystring'
import { json } from 'stream/consumers'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (request: Request, response: Response) => {
    return response.send('OK!')
})

class Users {
    id = Math.random().toString(16).substring(2)
    errands: Errands [] = []
    constructor(public login: string, public password: string) {
        this.id;
    }
}

class Errands {
    id = Math.random().toString(16).substring(2)
    constructor(public title: string, public descricption: string) {
        this.id;
    }
}

const users: Users [] = [];

app.post('/users/login', (request: Request, response: Response) => {
    const {  id, login, password, confirmPassword } = request.body 
    
    if(password != confirmPassword) {
        return response.status(404).json({
            mensagem: 'Senha inválida!'
        })
    }
    
    users.push()
    return response.status(201).json({
        id,
        login,
        password,
        confirmPassword
    })
})

/*app.get('/users', (request: Request, response: Response) => {
    const { limit } = request.query
    
        const limitString = limit.toString()
        const limitNumber = parseInt(limitString)
        const limitedUsers = users.slice(0, limitNumber)

        return response.json(limitedUsers)
    }

    return response.json(users)
})*/

app.get('/users:id', (request: Request, response: Response) => {
    const { id } = request.params
    const user = users.find(user => user.id === (id))
    
    if (user) {
        return response.json(users)
    }
   
    return response.status(404).json({
        mensagem: 'Usuário não encontrado, ID inválido'
    })
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('API rodando...');
})