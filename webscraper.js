const request = require('request'),
      cheerio = require('cheerio'),
      path = require('path');

const webscraper = { 
  getHtml: function (url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
        else {
          reject(error);
        }
      });
    });
  },
  getData: function (body) {
    var $ = cheerio.load(body);
    var rows = $('tr');
    var data = webscraper.processData($, rows);
    return data;
  },
  processData: function ($, rows) {
    var data = [['File Permission', 'Absolute URL', 'File Type']],
        filename;
    [].forEach.call(rows, function (row) {
      filename = $(row).children('td:nth-child(3)').children('a').text();
      if (path.extname(filename) !== '') {
        data.push([
          $(row).children('td:first-child').children('code').text(),
          $(row).children('td:nth-child(3)').children('a').attr('href'),
          path.extname(filename)
        ]);
      }
    });
    return data;
  }
}

module.exports = webscraper;