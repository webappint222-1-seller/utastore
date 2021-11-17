const express = require("express");
const bodyParser = require("body-parser");
// var upload = multer();
const cors = require('cors');
const app = express();
const sql = require("./app/models/db.js");
const cookieParser = require('cookie-parser')
const fs = require('fs');
const https = require('https');

const router = express.Router();
const { signupValidation, loginValidation } = require("./app/models/validation.js");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const corsOptions = {
  origin: 'https://www.utastore.team',
  credentials: true,
};

const options = {
  key: fs.readFileSync('etc/key.pem'),
  cert: fs.readFileSync('etc/cert.pem')
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array()); 
app.use(express.static('public'));
app.use(cors());
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "https://www.utastore.team");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.header('Access-Control-Allow-Credentials', true); 
  next();
})
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Look like your server is working! " });
});
app.get("/uploaded", (req, res) => {
  res.json({ message: "Look like your it's working! " });
});


require("./app/routes/customer.routes.js")(app);
require("./app/routes/product.routes.js")(app);
// require("./router.js")(app);



const multer = require('multer');

const suff = Date.now();

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './public/upload')
  },

  filename: function (res, file, callback) {
    if (file.originalname == "undefined") {
      callback(null, "404.png")
    }
    else {
      callback(null, suff + ".png")
    }
  }
});

const multerSigleUpload = multer({
  storage: storage
});
app.use('/upload', express.static('public'));


// app.post("/singleFile", multerSigleUpload.single('singleImage'), function (req, res) {
//   const file = req.file
//   const body = req.body
//   req.app.locals.uploadStatus = true;
//   res.redirect('/uploaded');
// });

app.post('/formdataupload', multerSigleUpload.single('image'), function (req, res) {
  console.log('file received');
  console.log(req);
  var db = "INSERT INTO `product`(`product_name`, `band_name`, `price`,`product_des`,`image`) VALUES ('" + req.body.product_name + "', '" + req.body.band_name + "', '" + req.body.price + "','" + req.body.product_des + "','" + suff + ".png" + "')";
  sql.query(db, function (err, result) {
    console.log('inserted data');
    console.log(db);
    console.log(result);
  });
  res.redirect('/');

  // app(req, res, function (err) {
  //   if (!req.file) {
  //     var db = "INSERT INTO `product`(`product_name`, `band_name`, `price`,`product_des`,`image`) VALUES ('" + req.body.product_name + "', '" + req.body.band_name + "', '" + req.body.price + "','" + req.body.product_des + "','" + "404.png" + "')";
  //     sql.query(db, function (err, result) {
  //       console.log('inserted data');
  //       console.log(db);
  //       console.log(result);
  //     });
  //   }
  //   var db = "INSERT INTO `product`(`product_name`, `band_name`, `price`,`product_des`,`image`) VALUES ('" + req.body.product_name + "', '" + req.body.band_name + "', '" + req.body.price + "','" + req.body.product_des + "','" + suff + ".png" + "')";
  //   sql.query(db, function (err, result) {
  //     console.log('inserted data');
  //     console.log(db);
  //     console.log(result);
  //   });

  // })
  // res.redirect('/');

});

app.put('/productupdate/:productId', multerSigleUpload.single('image'), function (req, res, next) {
  console.log('file received');
  console.log(req);
  
    var db2 = "UPDATE product SET `product_name` = '" + req.body.product_name + "', `band_name` = '" + req.body.band_name + "' , `price` = '" + req.body.price + "',product_des = '" + req.body.product_des + "',image = '"+ suff + ".png"+ "' WHERE product_id = '" + req.params.productId + "'"
    sql.query(db2, function (err, result2) {
      console.log('inserted data');
      console.log(db2);
      console.log(result2);
    });
  

  res.redirect('/');
});

app.post('/formdatausersupload', loginValidation, multerSigleUpload.single('image'), function (req, res) {
  console.log('file received');
  console.log(req);
  var asd = "SELECT emailaddress FROM user where emailaddress = '" + req.body.emailaddress + "'"
  sql.connect((err) => {
    sql.query(asd, function (err, result) {
      if (result == 0) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          var db1 = "INSERT INTO user (`emailaddress`, `password`, `name`,`phonenumber`,`DOB`,`address`,`role`) VALUES ('" + req.body.emailaddress + "', '" + hash + "', '" + req.body.name + "','" + req.body.phonenumber + "','" + req.body.dob + "','" + req.body.address + "','" + 2 + "')";
          sql.query(db1, function (err, result1) {
            console.log('inserted data');
            console.log(db1);
            console.log(result1);
          });
        });
      }
    })
  });

  // bcrypt.hash(req.body.password, 10, function (err, hash) {
  //   var db1 = "INSERT INTO user (`emailaddress`, `password`, `name`,`phonenumber`,`DOB`,`address`,`role`) VALUES ('" + req.body.emailaddress + "', '" + hash + "', '" + req.body.name + "','" + req.body.phonenumber + "','" + req.body.dob + "','" + req.body.address + "','" + 2 + "')";
  //   sql.query(db1, function (err, result1) {
  //     console.log('inserted data');
  //     console.log(db1);
  //     console.log(result1);
  //   });
  // });
  res.redirect('/');
});

// app.post('/login',  multerSigleUpload.single('image'), function (req, res) {
//   console.log('file received');
//   console.log(req);
//   var db = "SELECT * FROM user where emailaddress = '" + req.body.emailaddress + "'"
//   sql.connect((err) => {
//     sql.query(db, function (err, result1) {
//       bcrypt.compare(req.body.password, result1[0].password, function (err, result) {
//         if (result == true) {
//           var token = jwt.sign({id:result1[0].user_id},'secrect',{ expiresIn: '1h' });        
//           // return res.json({
//           //   msg: 'pass',
//           //   token,
//           //   userid: result1[0].user_id,
//           //   username: result1[0].name,
//           //   emailaddress: result1[0].emailaddress
//           // })
//           console.log(token);
//           res.cookie('jwt' , token , {maxAge: 24 * 60 * 60 * 1000, httpOnly: true} );
//           res.status(200).json("pass");
          
//           // res.cookie('jwt',token,{maxAge: 24*60*60*1000});
//           // return res.status(200).json("pass");
//         }
//       });
//       console.log(result1)
//     });
//   });
//   // bcrypt.compare(req.body.password, "$2a$10$VD53K9UoFs6UdhTdh7Y/9.2VAQmnqwmlJd506.mrAdIJT1BKSpknm", function (err, result) {
//   //   if(result == true){
//   //     var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//   //     console.log(token);
//   //   }
//   // });


// });

app.post('/login',  multerSigleUpload.single('image'), function (req, res) {
  console.log('file received');
  console.log(req);
  var db = "SELECT * FROM user where emailaddress = '" + req.body.emailaddress + "'"
  sql.connect((err) => {
    sql.query(db, function (err, result1) {
      bcrypt.compare(req.body.password, result1[0].password, function (err, result) {
        if (result == true) {
          var token = jwt.sign({id:result1[0].user_id},'secrect',{ expiresIn: '1d' });
          console.log(token);
          res.cookie('jwt' , token , {maxAge: 24 * 60 * 60 *1000, httpOnly: false} );
          res.status(200).json("pass");
        } else{
          res.status(401).json("email or password is wrong")
        }
      });
    });
  });
});

app.put('/userupdate/:userId', multerSigleUpload.single('image'), function (req, res) {
  console.log('file received');
  console.log(req);
  var db4 = "UPDATE user SET `password` = '" + req.body.password + "' WHERE user_id = '" + req.params.userId + "'"

  sql.query(db4, function (err, result4) {
    console.log('inserted data');
    console.log(db4);
    console.log(result4);
  });
  res.redirect('/');
});


// app.post('/register' , multerSigleUpload.single('image'), function(req, res)  {
//   bcrypt.hash(req.body.password, 10,function(err,hash){
//     var db6 = "INSERT INTO user (name, emailaddress, password, phonenumber, DOB, address, role) VALUES ("+ req.body.name +", "+req.body.emailaddress+","+ req.body.password +","+req.body.phonenumber+","+req.body.dob+","+req.body.address+",'buyer')"
//     sql.query(db6,function (err, result) {
//       console.log('inserted data');
//       console.log(db6);
//       console.log(result);

//     });
//   });
//   var db5 = "SELECT * FROM users WHERE LOWER(emailaddress) = LOWER("+req.body.emailaddress+");"
//   res.redirect('/');
// });



// app.get('/getuser', signupValidation, multerSigleUpload.single('image'), (req, res, next) => {
//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith('Bearer') ||
//     !req.headers.authorization.split(' ')[1]
//   ) {
//     return res.status(422).json({
//       message: "Please provide the token",
//     });
//   }
//   const theToken = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(theToken, 'secrect');
//   sql.query('SELECT * FROM user where user_id=?', decoded.id, function (error, results, fields) {
//     if (error) throw error;
//     return res.send({  data: results[0], message: 'Fetch Successfully.' });
//   });
// });

app.get('/getuser', multerSigleUpload.single('image'), (req, res, next) => {
  if(!req.cookies['jwt']){
    return res.status(401).send("must login")
  } else{
  const theCookie = req.cookies['jwt'];
  const decoded = jwt.verify(theCookie, 'secrect');
  if(!decoded){
    return res.status(401).send("unauthebtucated")
  }
  sql.query('SELECT * FROM user where user_id=?', decoded.id, function (error, results, fields) {
    if (error) throw error;
    res.send({  data: results[0], message: 'Fetch Successfully.' });
  });}
});

app.post('/clearuser', multerSigleUpload.single('image'), (req, res, next) => {
  res.status(202).clearCookie('jwt').send('cookie cleared');
  res.redirect('/');
});

const PORT = process.env.PORT || 3006;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

https.createServer(options, app).listen(PORT);

