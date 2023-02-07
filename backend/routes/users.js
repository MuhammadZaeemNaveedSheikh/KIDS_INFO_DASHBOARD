const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth1 = require("../middleware/auth");
const User = require("../models/user.model");
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
var bodyParser = require('body-parser')
const multer = require('multer')
var cloudinary = require('cloudinary').v2
const { profile } = require("console");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
cloudinary.config({
  cloud_name: 'dgezsyvwl',
  api_key: '954591763861581',
  api_secret: 'wxrQbiuE2AsvO1vJPZ3BOEH9iYQ'
})


const fileFilter = (req, file, callback) => {
  callback(null, true);
}
const upload = multer({
  storage: storage
});

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}))

router.post("/register", upload.single('profilePicture'), async (req, res) => {

  try {
    let { email, password, passwordCheck, displayName, verified } = req.body;

    var result = cloudinary.uploader.upload(req.file.path, function (error, result) { console.log(result) });
    const profilePicture = (await result).secure_url;

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      profilePicture,
      verified
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
    transporter.sendMail({
      to: savedUser.email,
      from: "FA17-BCS-070@isbstudent.comsats.edu.pk",
      subject: "Sign up success",
      html: `Welcome`
    })
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res.status(422).json({ error: "User doesn't exist with that email" })
          }
          user.resetToken = token
          user.expireToken = Date.now() + 1800000
          user.save().then((result) => {
            transporter.sendMail({
              to: user.email,
              from: "FA17-BCS-070@isbstudent.comsats.edu.pk",
              subject: "Activate Account",
              html: `<h4>You requested for activate account</h4>
              <h2>Click on this <a href="http://localhost:3000/VerifyAccount/${token}">link</a> to activate account</h2>
              `
            })
            res.json({ message: "check your email" })
          })

        })
    })
  } catch (err) {
    res.status(500).json({ error: "User Already Registered " });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, loc } = req.body;
    console.log(req.body)
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email, verified: true });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        picture: user.profilePicture
      },
      
    });
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

    transporter.sendMail({
      to: user.email,
      from: "FA17-BCS-070@isbstudent.comsats.edu.pk",
      subject: "You have logged in",
      html: `<p>Logged In!!!</p>
      <h2>Time:${year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}</h2>
      <h2>Location ${loc}</h2>
      `
    })
    
  } catch (err) {
    console.log(err)
    
  }
});

//
router.post("/change", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });


    const newPassword = req.body.newpassword
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "User doesn't exist with that email" })
        }
        bcrypt.hash(newPassword, 12).then(hashedpassword => {
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((savedUser) => {
            res.json({ message: "Password Updated successfully" })
          })
        }).catch(err => {
          console.log(err)
        })


      })
    res.status(200).json({
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//deactivate
router.post("/deactivate", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });


    const newPassword = req.body.newpassword
    User.remove({ email: req.body.email })
    var myquery = {  email: req.body.email };
    User.deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
        


    res.status(200).json({
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/changeName", async (req, res) => {
  try {
    const { email, displayName } = req.body;

    const user = await User.findOne({ email: email });
    
    User.findOne({ email: req.body.email })
      .then(user => {
 
          user.displayName = displayName
          
          user.save().then((savedUser) => {
            res.json({ message: "Name changed" })
          })
      


      })
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//is main changes kr skta hn na? yeh kahin aur use to nai ho ta?nhi okakrla use
router.post("/uploadImage", async (req, res) => {

  try {
    const { email, pp } = req.body;

    const user = await User.findOne({ email: email });
    
    User.findOne({ email: req.body.email })
      .then(user => {
 
          user.email = email
          user.profilePicture = pp
          user.save().then((savedUser) => {
            res.json({ message: "Profile Picture Changed" })
          })
      


      })
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/activate', (req, res) => {
  const sentToken = req.body.token
  const verified = true;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try Again session expired" })
      }

      user.verified = verified;
      user.resetToken = undefined
      user.expireToken = undefined
      user.save().then((savedUser) => {
        res.json({ message: "Account Activated" })
      })
        .catch(err => {
          console.log(err)
        })
    })
})


router.post('/fetchData', async (req, res) => {
  var url = "http://www.amis.pk/Daily%20Market%20Changes.aspx"
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0); 
  await page.goto(url)
  const result = await page.evaluate(() => {
    const rows = document.querySelectorAll('#ctl00_cphPage_GridView1 tr');
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });

  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].slice(0, 3)
  }
  await browser.close();

  return res.status(200).json(result);

})


router.post('/getLinks',async(req,res)=>{

  var url = "http://amis.pk/Roundup2020.aspx"
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto(url)
  var finalData = []
  const hrefs = await page.$$eval('a', as => as.map(a => a.href));
  
  for (var i = 0; i < hrefs.length; i++) {
      if (hrefs[i].includes('pdf')) {
          let data = hrefs[i].split('/')
          let new_data = data[data.length - 1].split('%20')
          var name = '';
          for (var j = 0; j < new_data.length; j++) {
              name = String(name) + String(new_data[j]) + ' '
          }
          finalData.push([name.replace(".pdf", ""),hrefs[i]])
          i++;
      }
  }
  await page.setDefaultNavigationTimeout(0)
  await page.goto('https://ndmc.pmd.gov.pk/new/bulletins.php');
  var hrefss = await page.$$eval('a', as => as.map(a => a.href));
  
  var result = await page.evaluate(() => {
      const rows = document.querySelectorAll('table tr');
      return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, column => column.innerText);
      });
    });
    var links = []
    for (var i = 0; i < hrefss.length; i++) {
      if (hrefss[i].includes('pdf') && hrefss[i].includes('assets')) {
          links.push(hrefss[i])
          i++;
      }
  }
  result  = result.slice(1,)
  for(var i=0;i<result.length;i++){ 
      finalData.push([result[i][1],links[i]])
  }




  var next = "";
  for (var i = 0; i < hrefss.length; i++) {
      if(hrefss[i].includes('page')){
          next = hrefss[i]
      }
  }
  await page.setDefaultNavigationTimeout(0)
  // await page.goto(next)



  // links = []
  // var result = await page.evaluate(() => {
  //     const rows = document.querySelectorAll('table tr');
  //     return Array.from(rows, row => {
  //       const columns = row.querySelectorAll('td');
  //       return Array.from(columns, column => column.innerText);
  //     });
  //   });

  //   for (var i = 0; i < hrefss.length; i++) {
  //     if (hrefss[i].includes('pdf') && hrefss[i].includes('assets')) {
  //         links.push(hrefss[i])
  //         i++;
  //     }
  // }
  // result  = result.slice(1,)
  finalData.push(["Karachi Heat Wave Alert","http://www.pmdnmcc.net/KarachiHeatwaveAlert/Heatwavealert.html"])
  finalData.push(["Flood Warning","http://www.ffd.pmd.gov.pk/weekly_catchment/weeklyforecast.pdf"])
  finalData.push(['Provincial Area Under Crop (1947-2018)','http://www.amis.pk/Agristatistics/area.aspx'])
  finalData.push(['Provincial Crop Production (1947-2018)','http://www.amis.pk/Agristatistics/production.aspx'])
  finalData.push(['Fruits And Vegetable Condinments','http://www.amis.pk/files/Fruit%20&%20Vegetable%20Condiments%20of%20Pakistan%202018-19.pdf'])
  finalData.push(['Export/Import Statistics Of Fruits/Vegetables/Condiments Of Pakistan 2015-16','http://www.amis.pk/files/F&V%20Statistics%202015-16.pdf'])
  for(var i=0;i<result.length;i++){ 
      finalData.push([result[i][1],links[i]])
  }
  await page.setDefaultNavigationTimeout(0)
  await page.goto("http://cms.ndma.gov.pk/")
  
  await page.$eval(
      "body > div.sp-body > main > div:nth-child(3) > div.row > div:nth-child(2) > div.owl-carousel.enable-owl-carousel.owl-theme > div.owl-wrapper-outer > div > div > marquee > ul",
      (ul) => {
          
          const cityArray = [];
          for (let i = 0; i < ul.children.length; i++) {
              cityArray.push([ul.children[i].textContent,"http://cms.ndma.gov.pk/"+ul.children[i].innerHTML.split("\"")[1]]);
          }
  
          return cityArray;
      }
  ).then((cityArray) => { finalData = finalData.concat(cityArray) });
  await page.$eval(
      "body > div.sp-body > main > div:nth-child(3) > div.row > div.col-md-4.col-lg-4.wow.fadeInRight > div.owl-carousel.enable-owl-carousel.owl-theme > div.owl-wrapper-outer > div > div > marquee > ul",
      (ul) => {
          
          const cityArray = [];
          for (let i = 0; i < ul.children.length; i++) {
              cityArray.push([ul.children[i].textContent,"http://cms.ndma.gov.pk/"+ul.children[i].innerHTML.split("\"")[1]]);
          }
  
          return cityArray;
      }
  ).then((cityArray) => { finalData = finalData.concat(cityArray) });
  await browser.close();
  
  return res.status(200).json(finalData);
})



router.post('/reset', async (req, res) => {

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "User doesn't exist with that email" })
        }
        user.resetToken = token
        user.expireToken = Date.now() + 1800000
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "FA17-BCS-070@isbstudent.comsats.edu.pk",
            subject: "password reset",
            html: `<p>You requested for password reset</p>
            <h5>Click on this <a href="http://localhost:3000/NewPassword/${token}">link</a> to reset your password</h5>
            `
          })
          res.json({ message: "check your email" })
        })

      })
  })
})

router.post('/NewPassword', (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try Again session expired" })
      }
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((savedUser) => {
          res.json({ message: "Password Updated successfully" })
        })
      }).catch(err => {
        console.log(err)
      })
    })
})

router.delete("/delete", auth1, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth1, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;