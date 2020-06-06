const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const Place = require('./database/Place')

nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true}))


server.get('/', (req, res) => {
  return res.render('index.html', {title: 'Seu marketplace de coleta de resíduos'})
})



server.get('/create-point', (req, res) => {
  return res.render('create-point.html', {salved: true})
})


server.post('/savepoint', async (req, res) => {

  const {image, name, address, number, city, items} = req.body

  await Place.create({image, name, address, number, city, items}).then(() => {
    res.render('create-point.html', {salved: true})
  }).catch(function(erro){
      res.send("Erro: places não foi cadastrado com sucesso!" + erro)
  })
})



server.get('/search-results', (req, res) => {
  
  Place.findAll().then((places) => {
    const total = places.length

    res.render('search-results.html', {places: places, total})
    console.log('Aqui estão seus registros: ')
    console.log(places)
  })
})


server.listen(3000)