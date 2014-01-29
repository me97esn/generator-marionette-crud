'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MarionetteCrudGenerator = module.exports = function MarionetteCrudGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MarionetteCrudGenerator, yeoman.generators.Base);

MarionetteCrudGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'modelName',
    message: 'Name of the model?'
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

MarionetteCrudGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

MarionetteCrudGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
