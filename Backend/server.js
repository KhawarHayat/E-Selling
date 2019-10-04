const express = require('express')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const app = express()
const schema = require('./Schema/categorySchema')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// use CORS
app.use(cors())

// parse application/json
app.use(bodyParser.json())

// Public folder
app.use('/static', express.static('public'))


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('image');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }


// SetUp MongoDB 

mongoose.connect('mongodb://khawar111:khawar111@cluster-shard-00-00-bh1wv.mongodb.net:27017,cluster-shard-00-01-bh1wv.mongodb.net:27017,cluster-shard-00-02-bh1wv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => { console.log('Database Connected') })
.catch((e) => { console.log(e)})



// Set Route for GraphQL 

app.use('/graphQL',graphqlHTTP({
    schema,
    graphiql: true
})

)


// Upload 
app.post('/upload',(req, res) => {
upload(req, res, (err) => {
  if(err) {
      res.json('Error!')
  }
  else{
      if(req.file === undefined){
          res.json('Err : NO file selected')
      }
      else {
          res.json({
              msg: 'Uploaded!',
              name: req.file.filename
          })
      }
  }

})
})


app.listen(4000, () => {
    console.log('Server Started')
})