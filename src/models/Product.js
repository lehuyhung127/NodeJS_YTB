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
    }
}, { timestamps: true, versionKey: false })
// tao ra 1 model ten la Product
export default mongoose.model('Product', productSchema);
