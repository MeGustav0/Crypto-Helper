const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: 'gagain226',
    host: "localhost",
    port: 5432,
    database: "CryptoHelp"
})

module.exports = pool