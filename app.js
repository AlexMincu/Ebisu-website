const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get(['/', '/index', '/home'], (req, res) => {
  res.render('pages/index');
});

app.listen(8080);

console.log('Server ON');
