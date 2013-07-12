define([
    "jquery",
    "underscore",
    "marionette",
    "views/m-advanced-content-filter.current.tag.view",
    "text!templates/views/m-advanced-filter-current-tag-group.html"
],
    function($, _, Marionette, CurrentTagView, Template) {

        var CurrentTagsGroupCompositeView = Marionette.CompositeView.extend({

            tagName : "div",
            itemView : CurrentTagView,
            template : Template,
            className : "m-advancedcontentfilter-bottom-item",

            initialize : function() {

                this.collection = this.model.get("tags");
            },

            showCollection: function(){

                var ItemView,
                    activeTags = [];

                this.collection.each(function(item,index){
                    if ( item.get("active") === true ) activeTags.push(item);
                }, this);

                _.each(activeTags,function(item,index){
                    ItemView = this.getItemView(item);
                    this.addItemView(item, ItemView, index);

                },this);
            }
        });

        return CurrentTagsGroupCompositeView;
    });
