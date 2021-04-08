// importar config do banco de dados
const Databases = require('../db/config')


module.exports = {
    async get() {
        // iniciar bd
        const db = await Databases()

        // executar código que vai pegar os dados do banco de dados
        const data = await db.get(`SELECT * FROM profile`) // get no sql traz apenas um dado

        // encerrar db
        await db.close()

        // normalizar dados; troca de "-" por "_"
        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        
        }
    },

    async update(newData) {
        // iniciar bd
        const db = await Databases()

        // executar código que vai pegar os dados do banco de dados
        await db.run(`UPDATE profile SET
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget = ${newData["monthly-budget"]},
            days_per_week = ${newData["days-per-week"]},
            hours_per_day = ${newData["hours-per-day"]},
            vacation_per_year = ${newData["vacation-per-year"]},
            value_hour = ${newData["value-hour"]}

        `)

        // encerrar db
        await db.close()

    }
};
