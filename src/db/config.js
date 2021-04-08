// importar sqlite
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');// só vamos utilizar uma funcionalidade deste sqlite, chamada open

module.exports = () => open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
