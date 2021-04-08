// inicialização do banco de dados
// importar a config
const Database = require('./config')

// async= fala que tudo que estiver dentro de uma estrutura de execução possui await, e que deve por sua vez esperar || await= executa uma função e espera pelo termino de tal
// async / await

const initDb = {
    async init() {
        const db = await Database() // conexão realizada com o banco

        // criando as tabelas e os campos do banco de dados
        await db.exec(`CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`);

        await db.exec(`CREATE TABLE IF NOT EXISTS jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        // inserindo dados nos campos do banco de dados
        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour

        )VALUES (
            "Guilherme Mota",
            "https://avatars.githubusercontent.com/u/70167159?v=4",
            3000,
            5,
            5,
            4,
            70
        )`);

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at

        )VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        )`);

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at

        )VALUES (
            "OneTwoProject",
            3,
            47,
            1617514376018

        )`);

        await db.close() // desligando conexão com o banco
        // para executar o banco devemos utilizar o comando (npm run init-db) no terminal
    }
}

initDb.init()