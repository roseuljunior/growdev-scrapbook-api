import express, { Request, Response } from 'express'
import cors from 'cors'
import { request } from 'http'
import { userInfo } from 'os'
import { stringify } from 'querystring'
import { json } from 'stream/consumers'

import Users from './classes/User'
import Errands from './classes/Errands'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))              
app.use(cors())

app.get('/', (request: Request, response: Response) => {
    return response.send('OK!')
})

const users: Users [] = []
const newUser = new Users('', '')

app.post('/user/create', (request: Request, response: Response) => {
    const { login, password } = request.body
    const newUser = new Users(login, password)
    
    users.push(newUser)
    return response.status(201).json(newUser)
})      

app.get('/user', (request: Request, response: Response) => {
    const { limit } = request.query
    
    if (limit) {                               
        const limitString = limit?.toString()                      
        const limitNumber = parseInt(limitString)
        const limitedUsers = users.slice(0, limitNumber)
        
        return response.json(limitedUsers)                                
    }
    
    return response.json(users)
})

app.get('/user/:id', (request: Request, response: Response) => {
    const { id } = request.params
    const user = users.find(user => user.id === (id))
    
    if (user) {
        return response.json(user)
    }

    return response.status(404).json({
        mensagem: 'Usuário não encontrado, ID inválido'
    })
    
})

app.put('/user/:id', (request: Request, response: Response) => {
    const { id } = request.params
    const { login, password } = request.body
    const indexUser = users.findIndex(user => user.id === (id))
    
    if (indexUser < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        })
    }

    users[indexUser].login = login
    users[indexUser].password = password

    return response.json(users[indexUser])
})

app.delete('/user/:id', (request: Request, response: Response) => {
    const { id } = request.params
    const indexUser = users.findIndex(user => user.id === (id))

    if (indexUser < 0) {
        return response.status(404).json({
            mensagem: 'Usuário não encontrado'
        })
    }

    users.splice(indexUser, 1)
    return response.sendStatus(204)
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('API rodando...');
})

