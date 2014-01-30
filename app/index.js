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

  // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.hookFor('marionette', {
    as: 'model',
    args: [self.name]
  });

  this.hookFor('marionette', {
    as: 'collection',
    args: [self.name + 's', self.name]
  });
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

MarionetteCrudGenerator.prototype.compositeView = function con() {

  this.template('_CompositeView.js', './app/scripts/views/composite/'+this.name + 'sView.js');
  this.template('_ItemView.js', './app/scripts/views/item/'+this.name + 'View.js');
  this.template('_CompositeView.hbs', './app/templates/composite/'+this.name + 'sView_tmpl.hbs');
  this.template('_ItemView.hbs', './app/templates/item/'+this.name + 'View_tmpl.hbs');
};

MarionetteCrudGenerator.prototype.app = function app() {};

MarionetteCrudGenerator.prototype.projectfiles = function projectfiles() {};