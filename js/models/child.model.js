define([
    "underscore",
    "backbone"
],
    function(_, Backbone) {

        var ChildModel = Backbone.Model.extend({

            parent : null,
            ownEvent : "change",
            parentEvent : null,

            constructor : function(attributes, options) {

                options = options || {};

                options.parent && ( this.parent = options.parent );
                options.parentEvent && ( this.parentEvent = options.parentEvent );
                options.ownEvent && ( this.ownEvent = options.ownEvent );

                Backbone.Model.apply(this,arguments);

                this._listenToEvent();
            },

            _listenToEvent : function() {

                if ( this.ownEvent ) this.listenTo(this,this.ownEvent,this._notifyParent);
            },

            _notifyParent : function() {

                if ( this.parentEvent && this.parent && this.parent.trigger ) {

                    var args = Array.prototype.slice.call(arguments);
                    args.splice(0,0,this.parentEvent);
                    args.splice(1,0,this);
                    this.parent.trigger.apply(this.parent,args);
                }
            },

            toJSON : function() {

                // clone all attributes
                var attributes = _.clone(this.attributes);

                // go through each attribute
                $.each(attributes, function(key, value) {

                    // check if we have some nested object with a toJSON method
                    if ( value && _.isFunction(value.toJSON) ) {
                        // execute toJSON and overwrite the value in attributes
                        attributes[key] = value.toJSON();
                    }
                });

                return attributes;
            }

        });

        return ChildModel;
    });
