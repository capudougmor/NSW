const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const Place = require('./database/Place')
const {Op} = require('./database/db')




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
  return res.render('create-point.html')
})


server.post('/savepoint', async (req, res) => {

  const {image, name, address, number, city, state, items} = req.body

  await Place.create({image, name, address, number, city, state, items}).then(() => {
    res.render('create-point.html', {salved: true})
  }).catch(function(erro){
      res.send("O ponto de coleta não foi cadastrado com sucesso!" + erro)
  })
})

server.get('/search-results', (req, res) => {
  
  const search = req.query.search
  
  if(search == "") {
      Place.findAll().then((places) => {
        const total = places.length

        res.render('search-results.html', {places: places, total})
      })
  } else {
    Place.findAll({where: {
        'city': {
          [Op.like]: search}
        }}
      ).then((places) => {
        const total = places.length

      res.render('search-results.html', {places: places, total})
    })
  }        
})


server.listen(3000)