/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { object } = require('sharp/lib/is');

// Express Server
const app = express();
const PORT = process.env.PORT || 8080;

// View engine
app.set('view engine', 'ejs');

const { Client } = require('pg');

// Connect to DB
const localClient = new Client({
  user: 'alex',
  password: 'alex',
  database: 'ebisu',
  host: 'localhost',
  port: 5432
});

const herokuClient = new Client({
  user: 'opnawygbptmvff',
  password: '7a8161cc5796b82d8d25b86214f487ed99d3bb1f2779775851f1e986a7a7febd',
  database: 'df8sv1oc3dah9a',
  host: 'ec2-176-34-215-248.eu-west-1.compute.amazonaws.com',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});


herokuClient.connect();

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

  res.render('pages/' + req.url, { categories: categories }, (err, result) => {
    if (err) {
      if (err.message.includes('Failed to lookup')) {
        res.status(404).render('pages/404', { categories: categories });
      } else {
        console.log(err);
        res.status(400).render('pages/error', { categories: categories });
      }
    } else {
      // Send the successful result
      res.send(result);
    }
  });
});

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
