const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
    // Extra datatypes: Date,ObjectId,(buffer),

    bookName:{ 
       type: String,
       required:true,
    }, 
    ISBN:
    {
        type: String,
        required:true,
        unique:true

    },

    authorName: String,
    
    catagory:String,
    tags:[String],//#cool
    year: Number,
    isPublished:{Boolean, default:false},
    prices:{
        indiunPrice:String,
        usaPrice:String,
        japanPrice:String,
        chinesPrice:String  //i can aad more when require
    },
    //indian price,japan price,usa price,nepalian price,-----new prices["150INR",'12$',]
    sales:{
        type:Number,
        default:0
    },
    completionDate:String,
    totalPages:Number,
    stockAvailable:
    {
        Boolean, default:false  
    },
     // should be flexible enough to take any datatype
     summery:mongoose.Schema.Types.Mixed,
     isUpdated:{
        type:Boolean,
        default:false
    },


}, {timestamps: true} );

module.exports=mongoose.model('Book',bookSchema)//books// create a model with above structure also create a collection in db
//

// String, Number
// Boolean, Object/json, array


/*
{
    "bookName": "java",
    "ISBN":"1book",
    "author": "databites",
    "catagory":"computere",
     "tags":["#book","#mybook"],
     "year": 2100,
     "isPublished":"",
     "prices":{
        "indiunPrice":"100Inr",
        "usaPrice":"1$",
        "japanPrice":"2yen",
        "chinesPrice":"1yen"  
    },
     "sales":10,
     "completionDate":""

    
}

*/