/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class MovieModel {

    constructor() {

        const schema = new Schema({
            name: String,
            summary: String,
            director: String,
            image: String,
            year: Number,
            rating: Number,
            duration: Number,
            genre: String,
            cast: { type: [String], default: [] },
            deleted: { type: Boolean, default: false }
        })

        this.model = model('movies', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new MovieModel()

/* ========== */