/* eslint-disable no-undef */
const express = require('express');
const path = require('path');

const app = express();

const PORT = 8080;

app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(['/', '/index', '/home'], (req, res) => {
  res.status(200).render('pages/index');
});

app.listen(PORT);

console.log(`Server ON: http://localhost:${PORT}`);
