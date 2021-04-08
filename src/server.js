const express = require("express")
const server = express() // criar o server 
const routes = require("./routes") // routes 
const path = require('path')

server.set('view engine', 'ejs') // configurando o ejs template engine

// mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// criando rotas publicas com express | habilitando uma nova funcionalidade a ele
// habilitar os arquivos estáticos
server.use(express.static("public"))  //use server para criar configurações novas

// Usar o req.body | liveração do corpo
server.use(express.urlencoded({ extended: true }))

// routes 
server.use(routes)

// função que irá ligar meu servidor
server.listen(3000, () => console.log('Rodando')) //servidor ligado!