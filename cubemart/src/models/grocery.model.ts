import mongoose from "mongoose";

export interface IGrocery{
    _id?:mongoose.Types.ObjectId,
    name:string,
    category:string,
    price:string,
    unit:string,
    image?:string,
    createdAt?:Date,
    updatedAt?:Date
}

const grocerySchema=new mongoose.Schema<IGrocery>({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:[
            "Chocalates & Dark Chocalate",
            "White Chocalate & Sugar-Free Chocalate",
            "Chocalate Bars & Chocalate Coins",
            "Candies & Lollipops",
            "Fruit Candies & Candies Stick",
            "Toffy & Marshmallow",
            "Biscuits & CooKies",
            "Brownies & Chocalate Cakes",
            "Cupcakes & Cakes",
            "Almond Chocalate & Peenut Chocalate",
            "Chocalate Gift Boxes & Custom Name Chocalate",
            "Milk & Chocalate Milk"

        ],
        required:true
    },
    price:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        required:true,
        enum:[
           "kg", "g", "liter", "ml", "piece", "pack"
        ]
    },
    image:{
        type:String,
        required:false
    }
},{
    timestamps:true
})


const Grocery=mongoose.models.Grocery || mongoose.model("Grocery",grocerySchema)
export default Grocery

