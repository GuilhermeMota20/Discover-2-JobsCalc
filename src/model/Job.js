// importar config do banco de dados
const Databases = require('../db/config')

module.exports = { 
    async get() {
        // iniciar bd
        const db = await Databases()

        // executar código que vai pegar os dados do banco de dados
        const jobs = await db.all(`SELECT * FROM jobs`) // busca tudo o que encontrar
        
        // encerrar db
        await db.close()
        
        // normalizar dados; troca de "-" por "_"; dois objetos dentro de um array
        return jobs.map(job =>({
            id: job.id,
            name: job.name,
            'daily-hours': job.daily_hours,
            'total-hours': job.total_hours,
            created_at: job.created_at
        }))
    },

    async update(updatedJob, jobId) {
        // iniciar bd
        const db = await Databases()

        // executar código que vai pegar os dados do banco de dados
        await db.run(`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"] },
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        
        `)

        // encerrar db
        await db.close()
        
    },

    async delete(id) {
        // iniciar bd
        const db = await Databases()

        // executar código que vai pegar os dados do banco de dados
        await db.run(`DELETE FROM jobs WHERE id = ${id}`) //comando DELETE  do sql

        // encerrar db
        await db.close()

    },

    async create(newJob) {
        // iniciar bd
        const db = await Databases()

        // executar código que vai pegar os dados do banco de dados
        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at

        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}

        )`)

        // encerrar db
        await db.close()
    }
}
