const express = require('express');
const app = express();
const port = 5000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.redirect('./index.html');
});

app.listen(port, () => {
  console.log(`Movie App is listening at http://localhost:${port}`)
})
