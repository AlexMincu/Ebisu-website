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

// Static paths
express.static(path.join(__dirname, 'views'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

///// Page requests /////
// Homepage
app.get(['/', '/index', '/home'], (req, res) => {
  let static_gallery = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, 'assets/json/static-gallery.json'))
      .toString()
  );
  console.log(static_gallery);

  res
    .status(200)
    .render('pages/index', { ip: req.ip, static_gallery: static_gallery });
});

app.get('/static-gallery', (req, res) => {
  let static_gallery = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, 'assets/json/static-gallery.json'))
      .toString()
  );

  // Filter images - keep only the images that contains the current date month
  static_gallery.images = static_gallery.images.filter((img) => {
    if (img['months'].includes(new Date().getMonth())) return img;
  });

  console.log(static_gallery);

  res
    .status(200)
    .render('pages/static-gallery', { static_gallery: static_gallery });
});

app.get('/*.ejs', (req, res) => {
  res.status(403).render('pages/403');
});

// Other pages
app.get('/*', (req, res) => {
  console.log(req.originalUrl);

  res.render('pages/' + req.url, (err, result) => {
    if (err) {
      if (err.message.includes('Failed to lookup')) {
        res.status(404).render('pages/404');
      } else {
        res.status(400).render('pages/error');
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
