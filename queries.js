const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kadodb',
    password: 'yuta0408',
    port: 5432,
})


const getUsers = (request, response) => {
  console.log('getting users');

  pool.query('select * from syain ', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
}
