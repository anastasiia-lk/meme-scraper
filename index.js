//folder creation
const fs = require('fs');
const path = require('path');
//get URL
const cheerio = require('cheerio');
const DilbertURL = 'https://memegen.link/examples';
let content = [];
let objCount = [];

//downloading
const request = require('request');
const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

//folder creation

fs.mkdir((path.join('c/Users', '/../projects'), 'meme'), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

//get URL&download

request(DilbertURL, function (error, response, body) {
  const $ = cheerio.load(body);
  $('.row a .meme-img').each((i, element) => {
    objCount.push(
      './meme/' +
        element.attribs.src.slice(1, element.attribs.src.indexOf('/', 1)) +
        '.jpg',
    );
    content.push('https://memegen.link/' + element.attribs.src);
  });
  for (let i = 0; i < 10; i++) {
    download(content[i], objCount[i], () => {});
    console.log(content[i]);
    console.log(objCount[i]);
  }
});
