const db = require('./db')

const Place = db.sequelize.define('places', {
  image: {
    type: db.Sequelize.STRING
  },
  name: {
      type: db.Sequelize.STRING
  },
  address: {
      type: db.Sequelize.STRING
  },
  number: {
      type: db.Sequelize.INTEGER
  },
  state: {
    type: db.Sequelize.STRING
  },
  city: {
    type: db.Sequelize.STRING
  },
  items: {
    type: db.Sequelize.NUMBER
  },
})

//Place.sync({force: true})


module.exports = Place
