/* ===== REQUIRED IMPORTS ===== */

const service = require('../services/showtime.service.js')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async (req, res, next) => {
        const newShowtime = req.body

        try {

            const result = await service.post(newShowtime)
            return res.status(201).send(result)

        } catch (e) {
            next(e)
        }
    },

    getAll: async (req, res, next) => {

        try {
            const showtimes = await service.getAll()
            return res.status(200).send(showtimes)
        } catch (e) {
            next(e)
        }

    },

    update: async (req, res, next) => {
        const updatedShowtime = req.body

        try {
            const result = await service.update(updatedShowtime)
            return res.status(201).send(result)
        } catch (e) {
            next(e)
        }
    },
}

/* ========== */