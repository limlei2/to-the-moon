const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
    {
        ownerId: {
            type: String,
            required: true
        },

        stockId: {
            type: String,
            required: true
        },

        stockLogo: {
            type: String,
            required: true
        },

        stockName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Stock", stockSchema);