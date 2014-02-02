'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var MarionetteCrudGenerator = module.exports = function MarionetteCrudGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  var self = this;
  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });


  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.hookFor('marionette', {
    as: 'collection',
    args: [self.name + 's', self.name]
  });

  this.copy('_bower.json', 'bower.json');
  this.copy('_routes.js', 'server/routes/index.js');
};

util.inherits(MarionetteCrudGenerator, yeoman.generators.NamedBase);

MarionetteCrudGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [];

  this.prompt(prompts, function(props) {
    this.modelName = props.modelName;

    cb();
  }.bind(this));
};

MarionetteCrudGenerator.prototype.views = function views() {
  this.template('_CompositeView.js', './app/scripts/views/composite/' + this.name + 'sView.js');
  this.template('_ItemView.js', './app/scripts/views/item/' + this.name + 'View.js');
  this.template('_CompositeView.hbs', './app/templates/composite/' + this.name + 'sView_tmpl.hbs');
  this.template('_ItemView.hbs', './app/templates/item/' + this.name + 'View_tmpl.hbs');
  this.template('_Model.js', './app/scripts/models/' + this.name + '.js');
  this.template('_tiny-server.js', './server/mongodbCrud.js');
};

MarionetteCrudGenerator.prototype.compositeView = function app() {
  var hook = '/* alias all marionette libs */',
    path = 'scripts/init.js',
    file = this.readFileAsString(path),
    insert = "\n '        Backbone.ModelBinder': '../bower_components/Backbone.ModelBinder/Backbone.ModelBinder',";

  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(hook, insert + '\n' + hook));
  }
};

MarionetteCrudGenerator.prototype.packages = function app() {
  var hook = '  "devDependencies": {',
    path = 'package.json',
    file = this.readFileAsString(path),
    insert = '        "mongoskin": "~0.6.1",\
     "jade": "~0.34.0",';

  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(hook, hook  + '\n' + insert));
  }
};

MarionetteCrudGenerator.prototype.app = function app() {};

MarionetteCrudGenerator.prototype.projectfiles = function projectfiles() {};