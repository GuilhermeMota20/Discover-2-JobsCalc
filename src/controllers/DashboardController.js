const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length,
        }

        // total de horas por dia de cada job em progress
        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress' //se o dia for menos ou igual a zero seu status será done=finalizado, senão seu status será progress=em andamento

            // Somando a quantidade de status
            statusCount[status] += 1;

            // total de horas por dia de cada job em progress
            /*             if(status == 'progress'){
                jobTotalHours += Number(job['daily-hours'])
            }*/
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            };

        });

        // quantidade de horas que querto trabalhar dia (PROFILE)
        // MENOS
        // quantidade de horas/dia de cada job em PROGRESS
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
    }
};
