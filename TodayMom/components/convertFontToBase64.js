const fs = require('fs');
const path = require('path');

fs.readFile(
  path.join(__dirname, '../assets/fonts/NotoSansKR-Regular.ttf'),
  (err, data) => {
    if (err) throw err;
    const base64 = data.toString('base64');
    console.log(base64);
  }
);
