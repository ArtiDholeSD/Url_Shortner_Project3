const express = require('express');
const router = express.Router();
const BookModel= require("../models/bookModel")

const BookController= require("../controllers/BookController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createBooks',  BookController.createBook  );
router.get('/getAllBooks',  BookController.getBooksData  );

router.get('/bookList',  BookController.bookList  );
router.get('/getParticularBooks',  BookController.getParticularBooks  );
router.get('/getBooksInYear/:year',  BookController.getBooksInYear  );


router.get('/getXINRBooks',  BookController.getXINRBooks   );
router.get('/getRandomBooks',  BookController.getRandomBooks  );
//toady
router.get('/getfirstBook',  BookController.getfirstBook  );
router.get('/deleteBooks',  BookController.deleteBooks   );

module.exports = router;