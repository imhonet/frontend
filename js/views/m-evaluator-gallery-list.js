define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "showcase",
    "text!templates/views/m-evaluator-gallery-list.html",
    "text!templates/views/m-evaluator-gallery-list-item.html",
    "views/m-evaluator-gallery-item"
],

function($, _, Backbone, Marionette, ShowCase, Template, ChildTemplate, ItemView) {

    var ItemView = ItemView.extend({
        template : Template,
        selectorChildrenContainer: '.chose-body',
        selectorButton: 'button',
        childTemplate: ChildTemplate,
        childrenTag: '<ul>',
        childrenOneColClass: 'chose-ul',
        childrenTwoColClass: 'chose-ul width50',
        childSelectedClass: 'checked',
        button: null,
        selectedChildElement: null,
        selectedChildId: null,

        renderModel: function(){
            var data = {};
            data = this.serializeData();
            data = this.mixinTemplateHelpers(data);
            var template = this.getTemplate();
            return Marionette.Renderer.render(template, data);
        },

        renderChild: function(data){
            var self = this;
            var data = this.mixinTemplateHelpers(data);
            if (data.title){
                data.alt = data.title.replace(/"/g, "'");
            }
            if (data.img && !data.thumb){
                data.thumb = data.img;
            }
            var template = this.childTemplate;
            var item = $(Marionette.Renderer.render(template, data));
            item.bind('click', function(evt){
                self.selectChild($(evt.currentTarget), data.id);
            });
            return item
        },

        selectChild: function($el, id){
            this.selectedChildId = id;
            if (this.selectedChildElement) {
                this.selectedChildElement.removeClass(this.childSelectedClass);
            }
            this.selectedChildElement = $el;
            this.selectedChildElement.addClass(this.childSelectedClass);
            this.model.set('selected',id);
            if (!this.button){
                this.model.save();
            } else {
                this.button.removeAttr('disabled');
            }
        },

        renderChildrenColumn: function(items, className){
            var children_element = $(this.childrenTag);
            children_element.addClass(className);
            children_element.addClass(className);
            for (var i = 0; i < items.length; i++){
                children_element.append(this.renderChild(items[i]));
            }
            return children_element;
        },

        renderChildren: function(){
            var children_container =this.$el.find(this.selectorChildrenContainer);
            if (children_container.length>0){
                var data = this.serializeData();
                if (data.items){
                    if (data.double){
                        var center = Math.ceil(data.items.length/2);
                        children_container.append(this.renderChildrenColumn(data.items.slice(0,center),this.childrenTwoColClass));
                        children_container.append(this.renderChildrenColumn(data.items.slice(center),this.childrenTwoColClass));
                    } else {
                        children_container.append(this.renderChildrenColumn(data.items,this.childrenOneColClass));
                    }
                }
            }
        },

        render: function(){
            var self = this;
            var html = this.renderModel();
            this.$el.html(html);
            this.renderChildren();
            this.button = this.$el.find(this.selectorButton);
            if (this.button.length>0){
                this.button.bind('click',function(){
                    if (self.selectedChildId){
                        self.model.save();
                        self.button.attr('disabled','disabled');
                    }
                });
                this.button.attr('disabled','disabled');
            } else{
                this.button = false;
            }
            return this;
        }
    });

    return ItemView;
});
