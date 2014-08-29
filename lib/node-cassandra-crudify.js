var pluralize = require('pluralize'),
    helper = require('./helper.js'),
    mustache = require('mustache');

/**
 * Constructor accepts a resource name (as a string) and an object with attribute name as key and attribute type as value.
 *
 * @param {string} resource The resource name
 * @param {object} attribs The attribs of the resource
 * @options {!object} options The optional parameters
 * @constructor
 */
function NodeCassandraCrudify(resource, attribs, options){
  if(!resource) { throw new Error('No resource given') }
  if(!attribs) { throw new Error('No attributes given') }

  this.resource = pluralize.singular(resource);
  this.attribs = attribs;
  this.options = options || {};

  this.resourceDirectory = this.options.resourceDirectory || 'app';
  this.resourceFileTypes = this.options.resourceFileTypes || ['cql', 'model', 'controller', 'route'];
  this.templates = this.options.templates || {};
  for(var i = 0; i < this.resourceFileTypes.length; i++){
    this.templates[this.resourceFileTypes[i]] = this.templates[this.resourceFileTypes[i]] || this.resourceFileTypes[i] + '.mustache';
  }
}

/**
 * Generate resource file
 * @param {string} resource file type
 * @param {string} resource file template name
 * @param {object} resource file template attributes
 */
NodeCassandraCrudify.prototype.generateResourceFile = function(type, template, fileAttributes){
  helper.createDirectoryIfNotExist(fileAttributes.parentFolder);

  var resourceFileTemplate = helper.loadTemplate(template),
      resourceFileContent = mustache.render(resourceFileTemplate, fileAttributes),
      resourceFilePath = fileAttributes.parentFolder + "/" + fileAttributes.name;

  helper.write(resourceFilePath, resourceFileContent);
}

/**
 * Cql File Attributes
 *
 */
NodeCassandraCrudify.prototype.cqlFileAttributes = function(){
  var type = 'cql';

  var attributes = this.attribs,
      attributesNames = Object.keys(attributes),
      attributesLength = attributesNames.length;

  var questions = [],
      questionizedParameters = [];

  for(var i = 0; i < attributesLength; i++){
    questions.push("?");
    questionizedParameters.push( " " + attributesNames[i] + " = ?");
  }

  return {
    name: this.resource + "-" + type + ".json",
    parentFolder: this.resourceDirectory + "/" + pluralize.plural(type),
    resource: this.resource,
    resourcePlural: pluralize.plural(this.resource),
    attributes: attributes,
    attributesNames: attributesNames.toString(),
    attributesLength: attributesLength,
    questions: questions.toString(),
    questionizedParameters: questionizedParameters.toString()
  }
}

/**
 * Model File Attributes
 *
 */
NodeCassandraCrudify.prototype.modelFileAttributes = function(){
  var type = 'model';

  var attributes = this.attribs,
      attributesNames = Object.keys(attributes),
      attributesLength = attributesNames.length;

  return {
    name: this.resource + ".js",
    parentFolder: this.resourceDirectory + "/" + pluralize.plural(type),
    resource: this.resource,
    resourcePlural: pluralize.plural(this.resource),
    attributes: attributes,
    attributesNames: attributesNames.toString(),
    attributesLength: attributesLength
  }
}

/**
 * Controller File Attributes
 *
 */
NodeCassandraCrudify.prototype.controllerFileAttributes = function(){
  var type = 'controller';

  return {
    name: pluralize.plural(this.resource) + "-" + type + ".js",
    parentFolder: this.resourceDirectory + "/" + pluralize.plural(type),
    resource: this.resource,
    resourcePlural: pluralize.plural(this.resource)
  }
}

/**
 * Route File Attributes
 *
 */
NodeCassandraCrudify.prototype.routeFileAttributes = function(){
  var type = 'route';

  return {
    name: pluralize.plural(this.resource) + ".js",
    parentFolder: this.resourceDirectory + "/" + pluralize.plural(type),
    resource: this.resource,
    resourcePlural: pluralize.plural(this.resource)
  }
}

/**
 * Generate the resource files, controllers, models, cqls
 */
NodeCassandraCrudify.prototype.run = function(){
  helper.createDirectoryIfNotExist(this.resourceDirectory);
  console.log('Crudifying...\n');
  for(var i = 0; i < this.resourceFileTypes.length ; i++){
    var type = this.resourceFileTypes[i],
        template = this.templates[type],
        fileAttributes = eval("this." + type + "FileAttributes()");
    this.generateResourceFile(type, template, fileAttributes);
    console.log('' + type + ' file ' + fileAttributes.name + ' generated in ' + fileAttributes.parentFolder + '.');
  }
  console.log('\nDone!');
}

module.exports = NodeCassandraCrudify;
