const fs = require('fs');

const writeToCsv = {
  writeCsvFile: function (data) {
    var writeStream = fs.createWriteStream('./webscraper.csv');
    data.forEach(function(line) {
      writeStream.write(line.join(',') + "\n");
    });
  }
}

module.exports = writeToCsv;