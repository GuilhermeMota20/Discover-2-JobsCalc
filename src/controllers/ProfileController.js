// permite que todos os dados sejam exportaos 
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() })
    },

    // calculo do custo de horas
    async update(req, res) {
        // req.body para pegar os dados
        const data = req.body

        // definir quantas semanas tem o ano: 52
        const weekPerYear = 52

        // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
        const weekPerMonth = (weekPerYear - data['vacation-per-year']) / 12

        // quantas horas por semana estou trabalhando
        const weekTotalHours = data['hours-per-day'] * data['days-per-week']

        // total de horas trabalhadas no mês 
        const monthlyTotalHours = weekTotalHours * weekPerMonth

        // qual será o valor da minha horas
        const valueHour = data['monthly-budget'] / monthlyTotalHours

        const profile = await Profile.get()
        await Profile.update({
            ...profile,
            ...req.body,
            'value-hour': valueHour,
        })

        return res.redirect('/profile')
    },
}
