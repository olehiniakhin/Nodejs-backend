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

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('select * from sayin where id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
}
