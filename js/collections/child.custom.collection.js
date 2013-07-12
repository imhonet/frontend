define([
    "jquery",
    "underscore",
    "backbone",
    "collections/custom.collection"
],
    function($, _, Backbone, CustomCollection) {

        var ChildCustomCollection = CustomCollection.extend({

            parent : null,
            ownEvent : "change",
            parentEvent : null,

            constructor : function(attributes, options) {

                options = options || {};

                options.parent && ( this.parent = options.parent );
                options.parentEvent && ( this.parentEvent = options.parentEvent );
                options.ownEvent && ( this.ownEvent = options.ownEvent );

                CustomCollection.apply(this,arguments);

                this._listenToEvent();
            },

            _listenToEvent : function() {

                this.listenTo(this,this.ownEvent,this._notifyParent);
            },

            _notifyParent : function() {

                if ( this.parentEvent && this.parent && this.parent.trigger ) {

                    this.parent.trigger(this.parentEvent);
                }
            }

        });

        return ChildCustomCollection;
    });
