define([
    "jquery",
    "underscore",
    "backbone",
    "collections/custom.collection",
    "models/tags.group.model"
],
    function($, _, Backbone, CustomCollection, TagsGroup) {

        var CustomModel = Backbone.Model.extend({

            defaults : {

                name : null,
                message : null,
                expanded : false,
                model : "scale"
            }
        });

        var TagsGroups = CustomCollection.extend({

            model : TagsGroup,

            _models : {
                scale : CustomModel,
                recommendationStatus : CustomModel
            },

            parent : null,

            constructor : function(models, options) {

                if ( options && options.parent ) {

                    this.parent = options.parent;
                }

                CustomCollection.prototype.constructor.apply(this,arguments);
            },

            initialize : function() {

                this.listenTo(this,"change",this._notifyParent);
            },

            _notifyParent : function() {

                if ( this.parent && this.parent.trigger ) {

                    this.parent.trigger("update:filter",this);
                }
            }
        });

        return TagsGroups;
    });
