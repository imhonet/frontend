define([
    'jquery',
    'underscore',
    'marionette'
],
    function($, _, Marionette) {

        var MixedCollectionView = Marionette.CollectionView.extend({

            getItemView: function(item){

                var itemViewTypeOption = Marionette.getOption(this, "itemViewType") || "itemType",
                    itemViewType = item.get(itemViewTypeOption) || null,
                    itemViewsOption = Marionette.getOption(this, "itemViews");

                return ( itemViewType && itemViewsOption.hasOwnProperty(itemViewType) )

                    ? itemViewsOption[itemViewType]
                    : Backbone.Marionette.CollectionView.prototype.getItemView.apply(this,arguments);

            }

        });

        return MixedCollectionView;
    });
