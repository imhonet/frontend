define([
    "jquery",
    "underscore",
    "backbone"
],
    function($, _, Backbone) {

        var CustomCollection = Backbone.Collection.extend({

            _models : {},
            _modelOption : "model",

            constructor : function(models, options) {

                options || (options = {});

                this._models = ( options.models ) ? options.models : this._models;
                this._modelOption = ( options.modelOption ) ? options.modelOption : this._modelOption;

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
                    modelClass = attrs[this._modelOption],
                    definedModelClass = this._models[modelClass];

                model = ( modelClass && definedModelClass )
                    ? definedModelClass
                    : this.model;

                return new model(attrs, options);
            }
        });

        return CustomCollection;
    });
