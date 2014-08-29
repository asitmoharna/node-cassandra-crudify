var pluralize = require('pluralize');

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
  this.resourceFileTypes = this.options.resourceFileTypes || ['cql', 'model', 'controller', 'router'];
  this.templates = this.options.templates || {};

  for(var i = 0; i < this.resourceFileTypes.length; i++){
    this.templates[this.resourceFileTypes[i]] = this.templates[this.resourceFileTypes[i]] || this.resourceFileTypes[i] + '.mustache' ;
  }
}

/**
 * Generate the resource files, controllers, models, cqls
 */
NodeCassandraCrudify.prototype.run = function(){
  console.log("Crudify!", this.resource, this.attribs);
}

module.exports = NodeCassandraCrudify;
