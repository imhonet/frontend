/**
 * Project: imhonet_frontend
 * File: ${FILE_NAME}
 * Author: Pavel Liaukovich <pl@xlinur.com>
 * Modified By: Pavel Liaukovich <pl@xlinur.com>
 * Modified:
 */

define(
    [
        "app",
        "jquery"
    ],

    function(App, $){
        App.module('pager', function(){
            var wait_time = 300;
            var menu_selector = '.m-mainnavigation .nav:first';
            var menu_element_sub_selector = 'li';
            var menu_element_active_class = 'active';
            var menu_element_active_sub_selector = '.' + menu_element_active_class;
            var menu_element_link_sub_selector = 'a';
            var page_prev_selector = '.m-mainnavigation-page-left';
            var page_next_selector = '.m-mainnavigation-page-right';

            var menu = null;
            var menu_elements = null;
            var menu_active = null;
            var page_prev = null;
            var page_next = null;
            var page_prev_menu_element = null;
            var page_next_menu_element = null;
            var timer = null;

            var stopLoad = function(){
                try{
                    window.stop();
                }
                catch(e){
                    try{
                        document.execCommand('Stop');
                    }
                    catch(e){
                    }
                }
            };

            var getMenuElementUrl = function(element){
                var result, menu_element;
                menu_element = element.find(menu_element_link_sub_selector);
                if (menu_element){
                    result = menu_element.attr('href');
                } else {
                    result = false;
                }
                return result;
            };

            var setPagePrevElement = function(element){
                page_prev_menu_element = element;
                page_prev.attr('href', getMenuElementUrl(page_prev_menu_element));
            };

            var setPageNextElement = function(element){
                page_next_menu_element = element;
                page_next.attr('href', getMenuElementUrl(page_next_menu_element));
            };

            var menuRemoveActiveAttr = function(element){
                element.removeClass(menu_element_active_class);
            };

            var menuAddActiveAttr = function(element){
                element.addClass(menu_element_active_class);
            };

            var setPageSwitchers = function(){
                var i, menu_elements_length, element;
                menu_elements_length = menu_elements.length;
                if (menu_elements.length > 1){
                    for (i = 0; i<menu_elements_length; i++){
                        if (menu_elements.eq(i).get(0) == menu_active.get(0)){
                            if (i==0){
                                setPagePrevElement(menu_elements.eq(menu_elements_length-1));
                                setPageNextElement(menu_elements.eq(i+1));
                            } else if (i==menu_elements_length-1){
                                setPagePrevElement(menu_elements.eq(i-1));
                                setPageNextElement(menu_elements.eq(0));
                            } else {
                                setPagePrevElement(menu_elements.eq(i-1));
                                setPageNextElement(menu_elements.eq(i+1));
                            }
                        }
                    }
                }
            };

            this.setMenuActive = function(element){
                var _this = this;
                if (menu_active){
                    menuRemoveActiveAttr(menu_active);
                }
                if (timer){
                    clearTimeout(timer);
                }
                menuAddActiveAttr(element);
                menu_active = element;
                timer = setTimeout(function(){
                   _this.go();
                }, wait_time);
                setPageSwitchers();
            };

            this.setMenuByPagePrev = function(){
               this.setMenuActive(page_prev_menu_element);
            };

            this.setMenuByPageNext = function(){
                this.setMenuActive(page_next_menu_element);
            };

            this.go = function(){
                stopLoad();
                var link_element;
                if (menu_active){
                    link_element = getMenuElementUrl(menu_active);
                    if (link_element){
                        window.location = link_element;
                    }
                }
            };


            this.init = function(){
                var _this = this;

                menu = $(menu_selector);
                menu_elements = menu.find(menu_element_sub_selector);
                menu_active = menu.find(menu_element_active_sub_selector);
                menu_elements.click(function(obj){
                    _this.setMenuActive($(this));
                    return false;
                });


                page_prev = $(page_prev_selector);
                page_next = $(page_next_selector);
                setPageSwitchers();
                page_prev.click(function(obj){
                    _this.setMenuByPagePrev();
                    return false;
                });
                page_next.click(function(obj){
                    _this.setMenuByPageNext();
                    return false;
                });
            };

            this.addInitializer(function(){
                this.init();
            });
        });
    }
);