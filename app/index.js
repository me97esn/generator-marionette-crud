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

  this.hookFor('marionette', {
    as: 'compositeview',
    args: [self.name + 'sView', self.name + 'View'],
  });

  this.hookFor('marionette', {
    as: 'itemview',
    args: [self.name + 'View'],
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

MarionetteCrudGenerator.prototype.compositeViewTemplate = function con() {
  var path = './app/tmpl/composite/' + this.name + 'sView_tmpl.hbs';
  this.write(path, '<div id="' + this.name + 'View" />');
};

MarionetteCrudGenerator.prototype.itemViewTemplate = function con() {
  var path = './app/templates/item/' + this.name + 'View_tmpl.hbs';
  this.write(path, '<p>{{this.name}}</p>');
};

MarionetteCrudGenerator.prototype.updateComposite = function app() {
  // TODO why don't I find the hook? Aren't they equal
  var hook = 'itemViewContainer: "",',
    path = './app/scripts/views/composite/' + this.name + 'sView.js',
    file = this.readFileAsString(path),
    insert = 'itemViewContainer: "#' + this.name + 'View",';
    console.log(file);
    console.log(file.indexOf(insert));
  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(hook, insert + '\n' + hook));
  }
};



MarionetteCrudGenerator.prototype.app = function app() {};

MarionetteCrudGenerator.prototype.projectfiles = function projectfiles() {};