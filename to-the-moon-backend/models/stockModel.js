const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
    {
        ownerId: {
            type: String,
            require: true
        },

        stockId: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Stock", stockSchema);