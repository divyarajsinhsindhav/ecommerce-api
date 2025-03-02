import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    products: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        products: [
            {
                productId: { 
                    type: Schema.Types.ObjectId, 
                    ref: "Product", 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    required: true, 
                    min: 1 
                },
            },
        ],
        totalAmount: { 
            type: Number, 
            required: true 
        },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
