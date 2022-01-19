const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'classicModel',
    user: 'postgres',
    password: 'postgres'
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM offices ORDER BY officecode ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM offices WHERE officecode = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { officecode, city, phone, addressline1, addressline2, state, country, postalcode, territory } = request.body

    pool.query('INSERT INTO offices (officecode,city, phone , addressline1, addressline2, state, country, postalcode, territory) VALUES ($1, $2, $3,$4,$5,$6,$7,$8, $9)', [officecode, city, phone, addressline1, addressline2, state, country, postalcode, territory], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('User added with ID')
    })
}

const updateUser = (request, response) => {
    const officecode = parseInt(request.params.officecode)
    const { city, phone, addressline1, addressline2, state, country, postalcode, territory } = request.body

    pool.query(
        'UPDATE offices SET city = $2, phone = $3, addressline1 = $4, addressline2 = $5, state = $6, country = $7, postalcode = $8, territory = $9 WHERE officecode = $1',
        [officecode, city, phone, addressline1, addressline2, state, country, postalcode, territory],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${officecode}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM offices WHERE officecode = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
