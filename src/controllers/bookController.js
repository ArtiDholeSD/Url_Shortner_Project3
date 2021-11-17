const BookModel= require("../models/bookModel.js")


const getBooksData= async function (req, res) {
    //let allBooks= await BookModel.find()
    //let allBooks= await BookModel.find().count()
    //count--gives no of documents
    
// ascending
    //let allBooks= await BookModel.find().sort({sales:1})

        
// descending
    //let allBooks= await BookModel.find().sort({sales:-1})

    // limit
    //let allBooks= await BookModel.find().sort({sales:-1}).limit(2)

       // skip item ---next page(pagination)
    //let allBooks= await BookModel.find().sort({sales:-1}).limit(2).skip( pagenumber *)//4

     // select === keys that wants (1)------only 
    //let allBooks= await BookModel.find().select({name:1,sales:1,_id:0})//_id=object id of json

     // select === keys that wants (1)------only 
    //let allBooks= await BookModel.find().select({name:0,sales:0,_id:0})

//(REGEX) contain name node
//let allBooks= await BookModel.find( {bookname: /.*Node.*/i})
//(REGEX) contain name node
//let allBooks= await BookModel.find( {bookname: /.*Node.*/i})




   // let allBooks= await BookModel.find({sales :12 })
    //let allBooks= await BookModel.find({sales :12 }).count()//total books

    //and == all condition must true  ..... or == only one can give o/p
    //let allBooks= await BookModel.find({sales :12, isPublished :true }).count()// and
    //let allBooks= await BookModel.find({   $or: [{sales :12}, {isPublished :true }]    }).count() //or

    //greater than
   // let allBooks= await BookModel.find({   sales: {$gt :10}   }).count()
   //less than
   //let allBooks= await BookModel.find({   sales: {$lt :10}   }).count()

   
    //greater than equal to
   // let allBooks= await BookModel.find({   sales: {$gte :10}   }).count()
   //less than equal to
   //let allBooks= await BookModel.find({   sales: {$lte :10}   }).count()
   
   
//inside 
  // let allBooks= await BookModel.find({   sales: {$in :[10 , 20,5 ] }   }).count()
//not equal 
//let allBooks= await BookModel.find({   sales: {$ne :[10] }   }).count()

// !4 !20 !3 !100
//let allBooks= await BookModel.find({   sales: {$nine :[10,20,2,4] }   }).count() // not in arry

//find by id


    res.send({msg: allBooks})
}
//createBook : to create a new entry..use this api to create 11+ entries in your collection
const createBook= async function (req, res) {
    let data= req.body
    let savedBook= await BookModel.create(data)
    res.send({msg: savedBook})    
}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData

 
//bookList : gives all the books- their bookName and authorName only 
const bookList = async function (req, res) {
   let allBooks= await BookModel.find({}).select({ authorName:1,  bookName:1})
  
  // console.log(allBooks)
    res.send({data: allBooks})
}
module.exports. bookList= bookList

//getBooksInYear: takes year as input in post request and gives list of all books published that year

const getBooksInYear = async function (req, res) {
   
    let checkyear=req.params.year
    let  allBooks= await BookModel.find( { year: checkyear } )
  //http://localhost:3000/getBooksInYear/2020
      res.send({msg: allBooks})
  }
  module.exports.getBooksInYear= getBooksInYear

  
 // getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 

	const getXINRBooks = async function (req, res) {
   
    let  allBooks= await BookModel.find({ 'prices.indiunPrice' : {$in: ["100INR", "200INR", "500INR"] } } )
    
    res.send({msg: allBooks})
  }
  module.exports.getXINRBooks= getXINRBooks 


//getRandomBooks - returns books that are available in stock or have more than 500 pages 

const getRandomBooks = async function (req, res) {
   
    let  allBooks= await BookModel.find({ $or: [ {stockAvailable: true} , { totalPages: {$gt: 500} }   ] } )
    res.send({msg: allBooks})
  }
  module.exports. getRandomBooks= getRandomBooks


  /*
  //getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition
	

		
e.g if body had { name: “hi”} then you would fetch the books with this name
		
if body had { year: 2020} then you would fetch the books with this name
		
hence the condition will differ based on what you input in the request body  */

const getParticularBooks = async function (req, res) {
    let  allBooks= await BookModel.find( req.body )
    res.send({msg: allBooks})
  }
  module.exports.getParticularBooks= getParticularBooks






  ///CRUD Operation --(GET and POST we have seen)

  const getfirstBook= async function (req, res) {
    
    let Book= await BookModel.findOne()  ///returns only fisrt book   //gives single  obj
    //res.send({msg: Book})   
    //let Book= await BookModel.findOne({"sales:10INR"});  ///returns only fisrt book   //gives single  obj
    res.send({ Book})          //gives null when no match
    

    // let Book= await BookModel.find({ "ispublished: true "});  ///returns all books   //gives arr of obj 
    // res.send({ Book})
   
    // let Book= await BookModel.find({"sales:10INR"})  ///returns only fisrt book   //gives single  obj
    // res.send({ Book}) //gives empty arr []
    

    // if(book)//findone
    // {
    //   console.log("book found")   //if got falsy value (NON,null,o)
    // }else{
    //   console.log(" no book found")
    // }

    // if(book)//find  if(book.lenght !=0  ... we check on array)
    // {
    //   console.log("book found")   //if got falsy value (NON,null,o)
    // }else{
    //   console.log(" no book found")  // gives empty arr which is truthy value 
    // }


}
module.exports.getfirstBook= getfirstBook




//upadte ----new/old ways


const updateBooks = async function (req, res) {
                                             //1st --query   //2nd --upadate data provide
 // let  allBooks= await BookModel.updateMany(  {ispublished: true },{authorName:'arti'} );
 
  //let  allBooks= await BookModel.findOneAndUpdate(  {ispublished: true },{authorName:'arti'} ); // it will update only one document
  //{ author:"arti"}
  //{ $set: {author:"arti"}}


// querry| update| boolean
  let  allBooks= await BookModel.findOneAndUpdate(  {ispublished: true },{authorName:arti},{new:true} );//new:true ---gies upadted document   
  let  allBooks= await BookModel.findOneAndUpdate(  {ispublished: true },{authorName:arti},{new:false} );//new:true --- not gies upadted document

//.........Upsert.......

// finds and upadtes doc(if not present )then, it creates a new doucument(object-entry)
let  allBooks= await BookModel.findOneAndUpdate(  {inspublished: true },{authorName:arti},{upsert:true} );//new:true --- not gies upadted document    ......Ex........used in sign I inf fuctionality if user exist send otp if not it will create new entry of user and sends otp ...............





  res.send({msg: allBooks})

}
module.exports.updateBooks= updateBooks


//delete -----must in POST 
// kerword-remove........ never used in mongoose
//we never deletes data 

// isDeleted=true

const deleteBooks = async function (req, res) {
  let  allBooks= await BookModel.findOneAndDelete(req.body,{isDeleted:true})
  res.send({msg: allBooks})
}
module.exports.deleteBooks = deleteBooks 
