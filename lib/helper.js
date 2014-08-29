var fs = require('fs'),
    mkdir = require('mkdirp'),
    path = require('path');

var helper = {};

/**
 * Creates a folder if it doesnot exist
 * @param {string} path, folder name with relative path
 **/
helper.createDirectoryIfNotExist = function(name){
  if(!(fs.existsSync(name) && fs.lstatSync(name).isDirectory())){
    mkdir(name);
  }
}

/**
 * Load template file
 * @param {string} name, name of the template file without path
 */
helper.loadTemplate = function(name){
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}

/**
 * Write a file
 * @param {string} path
 * @param {string} content
 * @param {string} mode, optional, default to 0666
 */
helper.write = function(path, content, mode){
  fs.writeFile(path, content, { mode: mode || 0666 }, function(err){
    if(err) throw err;
  });
}

module.exports = helper;
