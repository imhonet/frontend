define([
    "jquery",
    "underscore",
    "marionette",
    "views/composite/m-advanced-content-filter.current.tags.group.composite.view"
],
    function($, _, Marionette, CurrentTagsGroupCompositeView) {

        var CurrentTagsGroups = Marionette.CollectionView.extend({

            tagName : "div",
            itemView : CurrentTagsGroupCompositeView,

            initialize : function() {

                this.listenTo(this.collection,"update:tags",this.render);
            },

            showCollection: function(){

                var ItemView,
                    activeGroups = [];

                this.collection.each(function(item,index){

                    var tags = item.get("tags");
                    if ( tags && tags.find(function(tag){ return tag.get("active") === true;}) ) activeGroups.push(item);

                }, this);

                _.each(activeGroups,function(item,index){
                    ItemView = this.getItemView(item);
                    this.addItemView(item, ItemView, index);

                },this);
            }
        });

        return CurrentTagsGroups;

    });
