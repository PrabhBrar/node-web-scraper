const webscraper = require('./webscraper');
const writeToCsv = require('./write_to_csv');

webscraper.getHtml(process.argv[2]).then(function (body) {
  var data = webscraper.getData(body);
  writeToCsv.writeCsvFile(data);
}, function (error) {
  console.error(error);
});
