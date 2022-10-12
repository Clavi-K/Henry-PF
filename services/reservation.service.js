/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/reservation.model.js");
const seatModel = require("../models/seat.model")
const showtimeModel = require("../models/showtime.model")
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    post: async (obj) => {

        if (!obj.userId || typeof obj.userId !== "string" || obj.userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        if (!obj.showtimeId || typeof obj.showtimeId !== "string" || obj.showtimeId.trim(" ").length === 0) {
            throw new Error("Missing or invalid showtime ID")
        }

        if (!obj.price || isNaN(Number(obj.price)) || Number(obj.price) < 0) {
            throw new Error("Missing or invalid reservation price")
        }

        if (!obj.type || typeof obj.type !== "string" || obj.type.trim(" ").length === 0) {
            throw new Error("Missing or invalid reservation type")
        }

        try {

            const showtime = await showtimeModel.getById(obj.showtimeId)
            if (!showtime) {
                throw new Error("Invalid reservation showtime ID")
            }

            return await model.save(obj)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getByUser: async (userId) => {

        if (!userId || typeof userId !== "string") {
            throw new Error("Missing or invalid user ID")
        }

        try {

            return await model.getByUser(userId)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    confirmByUser: async (userId) => {

        if (!userId || typeof userId !== "string") {
            throw new Error("Missing or invalid user ID")
        }

        try {

            await model.confirmByUser(userId)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    setSeats: async (reservationId, seatIds) => {

        if (!reservationId || typeof reservationId !== "string" || reservationId.trim(" ").length === 0) {
            throw new Error("Missing or invalid reservation ID")
        }

        if (!Array.isArray(seatIds) || !seatIds.length) {
            throw new Error("Missing or invalid reservation seats IDs")
        }

        try {

            const reservation = await model.getById(reservationId)
            if (!reservation) throw new Error("Invalid reservation ID")

            if (!reservation.userId || reservation.userId !== "") throw new Error("This reservation is not assigned to any user!")

            for (const seatId of seatIds) {

                const seat = await seatModel.getById(seatId)
                if (!seat) throw new Error("Invalid seat ID")

                if (seat.showtimeId !== reservation.showtimeId) throw new Error("One seat does not belong to this showtime")
                if (seat.userId !== "") throw new Error("One seat is already taken")

                await seatModel.setUserId(seat._id.toString(), user.uid)

            }

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */