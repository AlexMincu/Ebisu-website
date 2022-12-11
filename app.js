/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { object } = require('sharp/lib/is');
const formidable = require('formidable');
const crypto = require('crypto');
const helmet = require('helmet');

// Express Server
const app = express();
const PORT = process.env.PORT || 8080;

// View engine
app.set('view engine', 'ejs');

app.use(helmet.frameguard()); // Block iframes

const { Client } = require('pg');
const { text, query } = require('express');
let client;

if(process.env.RENDER_ON) { // Connect to Heroku DB

  const webProtocol = 'https://';
  const webDomain = 'ebisu.onrender.com';

  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

} else { // Connect to local DB

  const webProtocol = 'http://';
  const webDomain = 'localhost:8080';

  client = new Client({
    user: 'alex',
    password: 'alex',
    database: 'ebisu',
    host: 'localhost',
    port: 5432
  });
}

client.connect();

//////////////////////////////////////////////////////////////////


// Static paths
express.static(path.join(__dirname, 'views'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

///// Page requests /////

// Products categories
let categories = [];

client.query(`SELECT DISTINCT category FROM products;`, (Qerr, Qres) => {
  if (Qerr) {
    console.log(Qerr.stack);
  } else {
    for (let categ of Qres.rows) {
      categories.push(categ.category);
    }
  }
});

//-------------------- Homepage --------------------//
app.get(['/', '/index', '/home'], (req, res) => {
  let static_gallery = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, 'assets/json/img-gallery.json'))
      .toString()
  );

  res.status(200).render('pages/index', {
    ip: req.ip,
    static_gallery: static_gallery,
    categories: categories
  });
});

//-------------------- Static Gallery --------------------//
app.get('/static-gallery', (req, res) => {
  let static_gallery = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, 'assets/json/img-gallery.json'))
      .toString()
  );

  // Filter images - keep only the images that contains the current date month
  static_gallery.images = static_gallery.images.filter((img) => {
    if (img['months'].includes(new Date().getMonth())) return img;
  });

  res.status(200).render('pages/static-gallery', {
    static_gallery: static_gallery,
    categories: categories
  });
});

//-------------------- Dynamic Gallery --------------------//
app.get('/dynamic-gallery', (req, res) => {
  let dynamic_gallery = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, 'assets/json/img-gallery.json'))
      .toString()
  );

  // Eliminate random images until the length is 9
  while (dynamic_gallery.images.length >= 10) {
    delete dynamic_gallery.images[
      Math.floor(Math.random() * dynamic_gallery.images.length)
    ];
    dynamic_gallery.images = dynamic_gallery.images.filter(Boolean);
  }

  res.status(200).render('pages/dynamic-gallery', {
    dynamic_gallery: dynamic_gallery,
    img_no: dynamic_gallery.images.length,
    categories: categories
  });
});

//-------------------- Products Page --------------------//
app.get('/products', (req, res) => {
  let condition = 'WHERE true';

  if (req.query.category) {
    condition += ` AND category = '${req.query.category}'`;
  }

  if (req.query.name) {
    let words = req.query.name.split(' ');

    condition += ` AND (`;
    for (let word_index = 0; word_index < words.length; word_index++) {
      if (word_index + 1 === words.length) {
        condition += `name ILIKE '%${words[word_index]}%'`;
      } else {
        condition += `name ILIKE '%${words[word_index]}%' OR `;
      }
    }
    condition += `)`;
  }

  if (req.query.priceMin) {
    condition += ` AND (price BETWEEN ${req.query.priceMin} AND ${req.query.priceMax})`;
  }

  if (req.query.in_stock) {
    condition += ` AND in_stock = ${req.query.in_stock}`;
  }

  if (req.query.subcategory) {
    const subcategories = req.query.subcategory.split('+');
    condition += ' AND (';

    for (
      let subcategory_index = 0;
      subcategory_index < subcategories.length;
      subcategory_index++
    ) {
      if (subcategory_index + 1 === subcategories.length) {
        condition += `'${subcategories[subcategory_index]}'=ANY(subcategory)`;
      } else {
        condition += `'${subcategories[subcategory_index]}'=ANY(subcategory) AND `;
      }
    }

    condition += ')';
  }

  if (req.query.sortAsc) {
    condition += ` ORDER BY ${req.query.sortAsc} ASC`;
  }

  if (req.query.sortDesc) {
    condition += ` ORDER BY ${req.query.sortDesc} DESC`;
  }

  console.log(`SELECT * FROM products ${condition}`);

  client.query(`SELECT * FROM products ${condition}`, (Qerr, Qres) => {
    if (Qerr) {
      console.log(Qerr.stack);
    } else {
      res.status(200).render('pages/products', {
        products: Qres.rows,
        categories: categories
      });
    }
  });
});

//-------------------- Individual Product Page --------------------//
app.get('/products/:id', (req, res) => {
  client.query(
    `select * from products where id = '${req.params.id}'`,
    (Qerr, Qres) => {
      if (Qerr) {
        console.log(Qerr.stack);
      } else {
        res.status(200).render('pages/product', {
          product: Qres.rows[0],
          categories: categories
        });
      }
    }
  );
});

//-------------------- 403 Page --------------------//
app.get('/*.ejs', (req, res) => {
  res.status(403).render('pages/403', {
    categories: categories
  });
});

//-------------------- The rest of pages --------------------//
app.get('/*', (req, res) => {
  console.log(req.originalUrl);

  res.render('pages/' + req.url, { categories: categories, err: "" }, (err, result) => {
    if (err) {
      if (err.message.includes('Failed to lookup')) {
        res.status(404).render('pages/404', { categories: categories, err: "" });
      } else {
        console.log(err);
        res.status(400).render('pages/error', { categories: categories, err: "" });
      }
    } else {
      // Send the successful result
      res.send(result);
    }
  });
});

const encryptSecret = "saltul_ebisu";
const alphaNumString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let profilePictureFilePath;

function generateToken(length) {
  randomString = "";
  for(let i = 0; i < length; i++) {
    randomString += alphaNumString[ Math.floor( Math.random() * alphaNumString.length ) ];
  }
  return randomString;
}


app.post("/register", (req, res) => {
  const form = new formidable.IncomingForm();

  let username;

  form.parse(req, (err, textFields, fileFields) => {
    console.log(textFields);

    let errors = [];

    // TODO - Required field missing
    if(!textFields.username) {
      errors.push("Missing Username");
    }
    if(!textFields.first_name) {
      errors.push("Missing First Name");
    }
    if(!textFields.last_name) {
      errors.push("Missing Last Name");
    }
    if(!textFields.password) {
      errors.push("Missing Password");
    }
    if(!textFields.password2) {
      errors.push("Missing Password confirmation");
    }
    if(!textFields.email) {
      errors.push("Missing Email");
    }


    // Fields requirements
    if(!textFields.username.match("^[a-zA-Z0-9]{5,20}$")) {
      errors.push("Username must contain between 5 and 20 letters and/or digits")
    }

    if(!textFields.password.match("^(?=(.*[0-9]){2,})(?=.*[.])(?=.*[a-z])(?=.*[A-Z]).{5,}$")) {
      errors.push('Password must contain at least two numbers, both lower and uppercase letters and at least one dot (".")')
    }

    if(!textFields.email.match("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")) {
      errors.push("Email is not valid");
    }

    console.log(errors);
    if (errors != ""){
      res.render("pages/register", {categories: categories, err: errors});
      return;
    }
    
    client.query(`select username from users where username='${textFields.username}'`, (err, queryRes) => {
      if(err) {
        console.log(err);
        res.render("pages/register", {categories: categories, err: "Database Error"})
      }
      else {
        // If username doesn't exist in DB
        if(queryRes.rows.length == 0) {
          
          const encryptedPassword = crypto.scryptSync(textFields.password, encryptSecret, 32).toString('hex');
          const token = generateToken(100);

          const queryAddUser = `INSERT INTO users (username, first_name, last_name, password, token, email, chat_color, profile_picture) VALUES ('${textFields.username}','${textFields.first_name}','${textFields.last_name}', $1, '${token}', '${textFields.email}','${textFields.chat_color}', '${profilePictureFilePath}')`; 

          client.query(queryAddUser, [encryptedPassword], (err, queryRes) => {
              if(err) {
                console.log(err);
                res.render("pages/register", {categories: categories, err: "Database Error"});
              }
              else {
                // TODO - Send Email

                // Render page
                res.render("pages/register", {categories: categories, response: "Account created successfully"})
              }
          })


        }
        else {
          errors.push("Username already exists");
          res.render("pages/register", {categories: categories, err: errors});
        }
      }
    })

  })

  form.on("field", (textFieldName, textFieldValue) => {   // textFields
    if(textFieldName == "username") {
      username = textFieldValue;
    }
  })

  form.on("fileBegin", (fileFieldName, file) => {
    if(!file.originalFilename) {
      return;
    }

    const userFolderPath = path.join(__dirname, 'users_files', username);
    if(!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath);

      fileName = file.originalFilename.split('.');
      fileExtension = '.' + fileName[fileName.length-1];

      file.filepath = userFolderPath + "/profile_picture" + fileExtension;

      profilePictureFilePath = file.filepath; // global variable
    }

  })

  form.on("file", (fileFieldName, file) => {
    console.log("File uploaded.");
  })
})


// Server port listener
app.listen(PORT);

// Custom message
console.log(`Server ON: http://localhost:${PORT}`);

// Compress Images Function
async function resizeImages(imgsFolder, ...dimensions) {
  const imgsPath = path.join(__dirname, '/assets/images/', imgsFolder);
  const compressedPath = path.join(imgsPath, 'compressed');

  // if (fs.existsSync(compressedPath)) {
  //   return;
  // }

  await fs.promises.mkdir(compressedPath, { recursive: true }, (err) =>
    console.error(err)
  );

  fs.readdir(imgsPath, (err, files) => {
    if (err) {
      return console.error(err);
    }

    files.forEach((file) => {
      if (file == 'compressed') return;

      const [fileName, fileExt] = file.split('.');

      if (fileExt == 'jpg' || fileExt == 'jpeg') {
        dimensions.forEach(async (dimension) => {
          await sharp(path.join(imgsPath, file))
            .resize(dimension)
            .toFormat('jpeg')
            .jpeg({
              quality: 80
            })
            .toFile(
              path.join(
                compressedPath,
                fileName + '-' + dimension + '.' + 'jpeg'
              )
            )
            .catch((err) => console.error(err));
        });
      } else if (fileExt == 'webp') {
        dimensions.forEach(async (dimension) => {
          await sharp(path.join(imgsPath, file))
            .resize(dimension)
            .toFormat('webp')
            .webp({
              lossless: true,
              quality: 60,
              alphaQuality: 80,
              force: false
            })
            .toFile(
              path.join(
                compressedPath,
                fileName + '-' + dimension + '.' + 'webp'
              )
            )
            .catch((err) => console.error(err));
        });
      }
    });
  });
}

resizeImages(path.join('homepage', 'cover'), 750, 1200, 1500);
resizeImages('products', 600);
resizeImages('categories', 650);
resizeImages('books', 200);
resizeImages('articles', 300);
resizeImages('promos', 200);
resizeImages(path.join('gallery', 'static'), 750, 500);
