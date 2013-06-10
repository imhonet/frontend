define([
    'jquery',
    'underscore',
    'marionette',
    'views/smart.collection.view'
],
    function($, _, Marionette, SmartCollectionView) {

        var MixedCollectionView = SmartCollectionView.extend({

            getItemView: function(item){

                var itemViewTypeOption = Marionette.getOption(this, "itemViewType") || "itemType";
                var itemViewType = item.get(itemViewTypeOption) || null;
                var itemViewsOption = Marionette.getOption(this, "itemViews");

                return ( itemViewType && itemViewsOption.hasOwnProperty(itemViewType) )

                    ? itemViewsOption[itemViewType]
                    : Backbone.Marionette.CollectionView.prototype.getItemView.apply(this,arguments);

            }

        });

        return MixedCollectionView;
    });
