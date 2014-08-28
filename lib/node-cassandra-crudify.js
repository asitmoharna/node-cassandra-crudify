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
  this.options = options || {};

  if(!resource) { throw 'Error: No resource given' }

  this.resource = pluralize.singular(resource);
  this.attribs = attribs;
}

/**
 * Generate the resource files, controllers, models, cqls
 */
NodeCassandraCrudify.prototype.run = function(){
  console.log("Crudify!", this.resource, this.attribs);
}

module.exports = NodeCassandraCrudify;
