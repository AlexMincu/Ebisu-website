/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const app = express();

const PORT = 8080;

app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(['/', '/index', '/home'], (req, res) => {
  res.status(200).render('pages/index');
});

app.listen(PORT);

console.log(`Server ON: http://localhost:${PORT}`);

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
      }
    });
  });
}

resizeImages(path.join('homepage', 'cover'), 750, 1200, 1500);
resizeImages('products', 600);
resizeImages('categories', 650);
resizeImages('books', 200);
resizeImages('articles', 300);
