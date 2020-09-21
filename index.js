// downloading
const request = require('request');
// folder creation
const fs = require('fs');
// get URL
const cheerio = require('cheerio');
const url = 'https://memegen.link/examples';
const content = [];
const objCount = [];

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

// folder creation

fs.mkdir('./meme', (err) => {
  if (err) {
    console.log('Directory has been created already!');
  } else {
    console.log('Directory created successfully!');
  }
});

// get URL&download

request(url, function (error, response, body) {
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
