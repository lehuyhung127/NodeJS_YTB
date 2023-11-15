import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
    }
    , price: {
        type: Number,
        require: true,
        minLength: 1
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    }
}, { timestamps: true, versionKey: false })
// tao ra 1 model ten la Product
export default mongoose.model('Product', productSchema);
