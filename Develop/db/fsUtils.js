const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(`Error writing to ${destination}:`, err) : console.info(`\nData written to ${destination}`)
  );

// Function to read data from a given file and append some content
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading from ${file}:`, err);
    } else {
      try {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      } catch (parseErr) {
        console.error(`Error parsing JSON from ${file}:`, parseErr);
      }
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };

