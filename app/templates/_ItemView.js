define([
	'backbone',
	'hbs!tmpl/item/<%= name%>View_tmpl'
],
function( Backbone, <%= name%>viewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a <%= name%>view ItemView");
		},
		
    	template: <%= name%>viewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
