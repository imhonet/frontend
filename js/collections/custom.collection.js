define([
    "jquery",
    "underscore",
    "backbone"
],
    function($, _, Backbone) {

        var CustomCollection = Backbone.Collection.extend({

            modelTypes : {},
            modelOption : "model",

            constructor : function(models, options) {

                options || (options = {});

                this.modelTypes = ( options.modelTypes ) ? options.modelTypes : this.modelTypes;
                this.modelOption = ( options.modelOption ) ? options.modelOption : this.modelOption;

                Backbone.Collection.prototype.constructor.apply(this,arguments);
            },

            _prepareModel: function(attrs, options) {
                if (attrs instanceof Backbone.Model) {
                    if (!attrs.collection) attrs.collection = this;
                    return attrs;
                }
                options || (options = {});
                options.collection = this;
                var model = this._getModelClass(attrs,options);
                if (!model._validate(attrs, options)) {
                    this.trigger('invalid', this, attrs, options);
                    return false;
                }
                return model;
            },

            _getModelClass : function(attrs, options) {

                var model,
                    modelClass = attrs[this.modelOption],
                    definedModelClass = this.modelTypes[modelClass];

                model = ( modelClass && definedModelClass )
                    ? definedModelClass
                    : this.model;

                return new model(attrs, options);
            }
        });

        return CustomCollection;
    });
