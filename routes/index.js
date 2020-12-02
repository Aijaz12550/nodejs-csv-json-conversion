var express = require("express");
var router = express.Router();
let multer = require("multer");
/* GET home page. */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
router.post("/", upload.single("file"), function (req, res, next) {
  console.log("req.file", req.file);
  const { Parser } = require("json2csv");

  const fields = ["field1", "field2", "field3"];
  const opts = { fields };
  const myData = {field1:"a",field2:"2",field3:"3"}
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(myData);
    console.log(csv);
  } catch (err) {
    console.error(err);
  }
  res.render("index", { title: "Express" });
});

module.exports = router;

/**
 * 
 const express = require("express");
 const bodyParser = require("body-parser");
 const multer = require("multer");
 const app = express();
 const csv=require('csvtojson')
 app.use(bodyParser.urlencoded({ extended: true }));
 var storage = multer.diskStorage({
   destination: function(req, file, cb) {
     cb(null, 'upload');
    },
    filename: function (req, file, cb) {
      cb(null , file.originalname);
    }
  });
  var upload = multer({ storage: storage })
  app.post('/bulk', upload.array('profiles', 4) , (req, res) =>{
    try {
      res.send(req.files);
    } catch(error) {
      console.log(error);
      res.send(400);
    }
  });
  app.use("/fileUpload",upload.single('image'),(req,res)=>{
    console.log("res",req.headers.host);
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
      console.log(jsonObj);
     
  })
  res.sendFile(req.file)
  
})
// app.listen(4000, () => console.log("Server started on port 4000"));
module.exports = app;

*/
