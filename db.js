const Pool = require("pg").Pool;
const  envirnment = process.env;
const obj = {"message":"database is connected"}
const pool = new Pool({
    user:envirnment.user || 'obsrv_user',
    host: envirnment.host || 'postgres',
    database: envirnment.database || 'obsrv',
    password: envirnment.password || 'obsrv123',
    port:envirnment.port || 5432,
});
console.log(obj)
module.exports = pool;
/*
const Pool = require("pg").Pool;
//const  envirnment = process.env;
const obj = {"message":"database is connected"}
const pool = new Pool({
    user: 'obsrv_user',
    host: 'cruidapi-db-1',
    database: 'obsrv',
    password: 'obsrv123',
    port: 5432,
});

module.exports = pool;
console.log(obj)
*/