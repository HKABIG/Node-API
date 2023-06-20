// This Describes the Schema of the DataBases to be used 
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Please enter a product naame"]
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
        // Mongoose will add two properties of type Date to your schema:
        // createdAt: a date representing when this document was created
        // updatedAt: a date representing when this document was last updated
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports = Product;