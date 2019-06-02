const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kadodb',
    password: 'rnlduadbswjd611!',
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
  // 1 - Init Settings (for managers)
  // 2 - Store Settings (for authorized peoples by managers)
  // 3 - Time Working (for authorized peoples by Store peoples)
  // I analyized all tables for this job.
  // At present all tables are not enough for conditional login.
  // In future I will fix some more for login

  const login = (request, response) => {
    // request.header("Access-Control-Allow-Origin", "*");
    // request.header("Access-Control-Allow-Headers", "Content-Type");
    //const id = request.params.id
    const id = request.body;
    console.log(id.id);
    //const { id } = request.body
    // console.log(id);
     //database treatment (return 1, 2, 3 )
    /*
    pool.query('select FROM syain WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })

    */
    // today state = random() mod 3
    var random = Math.floor(Math.random()*10000); 
    var state = random % 3
    switch(state){
      case 0:
        response.send({ state: 1})
        break;
        case 1:
        response.send({ state: 2})
        break;
        case 2:
        response.send({ state: 3})
    }
    // response.end();
   
  }


  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
  }