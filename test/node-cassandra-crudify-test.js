var assert = require('assert'),
    should = require('should'),
    NodeCassandraCrudify = require('../lib/node-cassandra-crudify.js');

describe("NodeCassandraCrudify", function(){

  describe("#constructor", function(){
    var crudify = new NodeCassandraCrudify('post', {title: 'string', body: 'text'});
    var crudifyWithOptions = new NodeCassandraCrudify('post', {title: 'string', body: 'text'}, {
      resourceDirectory: 'src',
      resourceFileTypes: ['cql', 'model'],
      templates: {'cql': 'customCql.mustache'}
    });

    it("requires resource name")//, function(){
    //  new NodeCassandraCrudify().should.throw(Error, 'No resource given');
    //});

    it("requires resource attributes")//, function(){
    //  new NodeCassandraCrudify('post').should.throw(Error, 'No attributes given');
    //});

    it("sets model name as resource", function(){
      crudify['resource'].should.equal('post');
    });

    it("sets model attributes as attribs", function(){
      crudify['attribs'].should.have.property('title', 'string');
      crudify['attribs'].should.have.property('body', 'text');
    });

    it("sets default resource directory when no options given", function(){
      crudify.resourceDirectory.should.eql('app');
    });

    it("sets resource directory from options", function(){
      crudifyWithOptions.resourceDirectory.should.eql('src');
    });

    it("sets default resource file types when no options given", function(){
      crudify.resourceFileTypes.should.eql(['cql', 'model', 'controller', 'route']);
    });

    it("sets resource file types from options", function(){
      crudifyWithOptions.resourceFileTypes.should.eql(['cql', 'model']);
    });

    it("sets default resource templates when no options given", function(){
      crudify.templates.should.have.property('cql', 'cql.mustache');
      crudify.templates.should.have.property('model', 'model.mustache');
      crudify.templates.should.have.property('controller', 'controller.mustache');
      crudify.templates.should.have.property('route', 'route.mustache');
    });

    it("sets resource templates from options", function(){
      crudifyWithOptions.templates.should.have.property('cql', 'customCql.mustache');
      crudifyWithOptions.templates.should.have.property('model', 'model.mustache');
    });
  });

});
