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
    console.log('modelname:' + this.modelName);

  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.hookFor('marionette', {
    as: 'model',
    args: [self.name]
  });

  this.hookFor('marionette', {
    as: 'collection',
    args: [self.name + 's', self.name],
    options: {
      options: {
        'create-all':true,
        model: self.name
      }
    }
  });
  // compositeview peopleview --itemview personview --create-all
  this.hookFor('marionette', {
    as: 'compositeview',
    args: [self.name + 'sView', self.name + 'View'],
    options: {
      options: {
        'create-all':true,
        model: self.name
      }
    }
  });
};

// MarionetteCrudGenerator.prototype.collection = function model() {
//   this.invoke("generator_marionette", {
//     options: {
//       modelName: this.modelName
//     }
//   })
// };

// MarionetteCrudGenerator.prototype.model = function model() {
//   this.invoke("generator_marionette", {
//     options: {
//       modelName: this.modelName
//     }
//   })
// };

util.inherits(MarionetteCrudGenerator, yeoman.generators.NamedBase);

MarionetteCrudGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'modelName',
    message: 'Name of the model?',
    default: 'Todo'
  }];

  this.prompt(prompts, function(props) {
    this.modelName = props.modelName;

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