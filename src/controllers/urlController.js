const urlModel = require("../models/urlModel.js")
const validUrl = require('valid-url')
const shortid = require('shortid')
const baseUrl = 'http://localhost:3000/getUrl'



//  ISVALID   REQUESTBODY FUNCTION
const isValidRequestBody = function (requestBody) {
   return Object.keys(requestBody).length > 0
 }
 //  ISVALID   FUNCTION
 const isValid = function (value) {
   if (typeof value === 'undefined' || value === null) return false
   if (typeof value === 'string' && value.trim().length === 0) return false
   return true;
 }


// This is the first post api to create longer to shorter URL.
const createUrl = async function (req, res) {
   let body= req.body
   let longUrl = req.body.longUrl
   if(!isValidRequestBody(body)){
      res.status(400).send({status: false , msg:'Invalid body'})
      return
   }
   if(!isValid(longUrl)){
      res.status(400).send({status: false , msg:'Enter appropriate URL'})
      return
   }
   longUrl= longUrl.trim()
   if (!validUrl.isUri(baseUrl)) {
      return res.status(400).send('Invalid base URL')
   }
   if (validUrl.isUri(longUrl)) {
      try {
         const urlCode = shortid.generate()
         let checkUrl = await urlModel.findOne({ longUrl })
         if (checkUrl) {
            res.send({ message: "You have already created shortUrl for the requested URL as given below", data: checkUrl })
         } else {
            const shortUrl = baseUrl + '/' + urlCode
            const storedData = { longUrl, shortUrl, urlCode }
            let savedData = await urlModel.create(storedData);
            res.status(201).send({ status: true, data: savedData });
         }
      } catch (err) {
         res.status(500).send({ status: false, data: err.message })
      }
   } else {
      res.status(400).send('Invalid longUrl')
   }
}


// This is my second get api to redirect from shorter to original (longer) URL
const getUrl = async function (req, res) {
   try {
      let paramsUrl = req.params.code
       paramsUrl=paramsUrl.trim();
      if(!isValid(paramsUrl)){
        res.status(400).send({status: false , msg:'Enter appropriate URL'})
        return
     }
       const urlExist = await urlModel.findOne({ urlCode: paramsUrl })
      if (urlExist) {
       // console.log(urlExist)
         return res.redirect(urlExist.longUrl) 
        // return res.send(urlExist.longUrl) // gives main url link
      } else {
         return res.status(400).send('Sorry, there is no url for this request')
      }
   } catch (err) {
      res.status(500).send('Server Error')
   }
}

module.exports.createUrl = createUrl
module.exports.getUrl = getUrl


  // console.log(req.params)
      // if(req.params.code==':code'){
      // return res.status(400).send({status : false , msg:'Invalid Params'})   
      // } 