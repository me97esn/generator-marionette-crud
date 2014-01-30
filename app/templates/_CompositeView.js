define([
	'backbone',
	'views/item/<%=name%>View',
	'hbs!tmpl/composite/<%=name %>sView_tmpl'
],
function( Backbone, <%=name %>view, <%=name %>viewTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a <%=name %>view CompositeView");
		},
		
    	itemView: <%=name %>view,
    	
    	template: <%=name %>viewTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "#<%=name %>View",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
