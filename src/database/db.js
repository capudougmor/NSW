const Sequelize = require('sequelize')
const Op = Sequelize.Op;



const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/places.sqlite'
})

sequelize.authenticate().then(function(){
  console.log('conexao com banco de dados realizada ')
}).catch(function(err){
  console.log('Erro ao realizar conecção '+err)
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  Op: Op
}

  
  // const sqlite = require('sqlite3')
  
// const db = new sqlite.Database('./src/database/database.db')

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS  places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       number TEXT,
//       state TEXT,
//       city TEXT,
//       items
//     )
//   `)
// })

// const query = `
//   INSERT INTO places (
//     image,
//     name, 
//     address, 
//     number,
//     city,
//     items
//   ) VALUES (?,?,?,?,?,?);
//   `
// const values = []

// function afterInsertData(err) {
//   if(err) {
//     return console.log(err)
//   }

//   console.log('Cadastrado com sucesso')
//   console.log(this)
// }

// //db.run(query, values, afterInsertData)

// db.all(`SELECT * FROM places`, function(err, rows) {
//   if(err){
//     return console.log(err)
//   }
//   console.log('Aqui estão seus registros: ')
//   console.log(rows)

// })

// db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//   if(err){
//     return console.log(err)
//   }
//   console.log('Registro deletado com sucesso!')
// })
