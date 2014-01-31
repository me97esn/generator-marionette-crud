# generator-marionette-crud [![Build Status](https://secure.travis-ci.org/me97esn/generator-marionette-crud.png?branch=master)](https://travis-ci.org/me97esn/generator-marionette-crud)

A generator for [Yeoman](http://yeoman.io).


## Getting Started
install via npm:
$ npm install marionette-crud
and yeoman of course
$ npm install yo
You also need to install the marionette-generator:
$ npm install (-g) generator-marionette

Then, run the marionette-generator
$ yo marionette
after that is done, you can run the marionette-crud generator:
$ yo marionette-crud Todo

This creates model, collection, composite and item view and connects them together.

Run server with
$ grunt

And backend with
$ node server/mongodbCrud.js

To show the generated views you can goto app/scripts/application and remove the following row:
document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });

Then add the following:
App.todos.show(new TodosView({collection:todos}))

You also have to include the files in the require part at the top of application.js:

define([
	'backbone',
	'communicator',
	'views/composite/TodosView',
	'collections/Todos'
],

function( Backbone, Communicator, TodosView, Todos ) {


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
