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

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

// login functions
// 1 - 初期設定 (for managers)
// 2 - 随時設定 (for authorized peoples by managers)
// 3 - ワーカー (for authorized peoples by Store peoples)
const login = (req, res) => {
  const {user_id, password} = req.body;
  pool.query('select * FROM login WHERE user_id = $1 AND password = $2', [user_id,password], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows[0]){
        res.status(200).json({user:results.rows[0]});
    }else{
        res.status(400).json({message:"user not fount!"});
    }
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
}
