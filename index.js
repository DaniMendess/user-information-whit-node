// importando o express
const { request, response } = require('express')
const express = require('express')

const uuid = require('uuid')

// coloquei o express dentro dessa variavel
const app = express()

// Criando o padrão de troca de dados, devemos fazer da seguintes forma
// Detalhe isso sempre deve ir na parte de cima
app.use(express.json())


const users = []

// criei a primeira rota, isso é uma rota
// Metodo GET => Buscar informaçoes no back-end
app.get('/estudo', (request, response) => {
   
    
    return response.json(users)
})

// Metodo POST => Criar informaçoes no back-end
app.post('/estudo', (request, response) =>{

    // Recebendo do body, o NOME, IDADE, CITY que esta sendo enviado
   const {name , age, city} = request.body

   // Nessa linha estamos criando um usuario, com ID, NAME, AGE
   const user = {id:uuid.v4(), name, age, city}

   // Aqui estamos puxando o USER para a constante users criada acima ....
   users.push(user)

   // Retornando o usuario que acabei de criar e tambem o status 201
   return response.status(201).json(user)
})


// Metodo PUT =>  Alterar/Atualizar informaçao no back-end
app.put('/estudo/:id', (request, response) => {
    
    // Peganado id do user
    const {id} = request.params

    // Pegando do Body o NAME  E IDADE
    const {name, age} = request.body

    // Criando o USUARIO atualizado, OBS: o ID nao  muda
    const updateUser = {id , name, age}

    // Procurando o id do usuario, onde (user.id) for igual a id .. o findIndex vai passar para o index a posicao do array que o user esta
    const index = users.findIndex( user => user.id === id)

    // se nao encontrar o usuario, vaiu cair nessa linha de código
    if(index < 0) {
        return response.status(404).json({message: "Not Found"})
    }

    // Atualizando o usuario na posiçao [index]
    users[index] = updateUser

    // Mostrando em tela o usuario atualizado
    return response.status(201).json(updateUser)
})

// Metodo DELETE => Deletar informaçao no back-end
app.delete('/estudo/:id', (request,response) => {

    // Pegando id do user
    const {id} = request.params

    // Procurando o id do usuario, onde (user.id) for igual a id .. o findIndex vai passar para o index a posicao do array que o user esta
    const index = users.findIndex( user => user.id === id)

    // Removendo user na posição index com SPLICE
    users.splice(index,1)

    // Retornando que deu certo
    return response.status(204).json()
})

// PORTA
// avisando qual porta o meu app vai ser acessado
app.listen(3001, () => {
    console.log("👌")
})


/* 
    - Query params => meusite.com/users?nome=rodolfo&age=28 // filtros
    - Route params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request Body => {"name":"Daniel","age":}

    - GET => Buscar informaçoes no back-end
    - POST => Criar informaçoes no back-end
    - PUT / PATCH => Alterar/Atualizar informaçao no back-end
    - DELETE => Deletar informaçao no back-end
*/