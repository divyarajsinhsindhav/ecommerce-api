import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    }
});

export default mongoose.model("Product", ProductSchema);
