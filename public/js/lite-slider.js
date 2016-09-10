/**
 * Created by Ê¯×¿Çå on 2016/9/10.
 */




(function(window){


    /**
     *
     * util methods inside this component
     *
     * @type {{tween: Function, addEvent: Function}}
     */
    var utils  = {
        tween:function(handler,millis,func){

            var duration = 10;
            var counter = 0;

            var  max = Math.ceil(millis / duration);
            var interval  = setInterval(function () {

                handler && typeof handler === 'function' && handler(counter,max);
                if(counter++ >= max){
                    clearInterval(interval);
                    func && typeof func === 'function' && func(counter);
                }

            },duration);
        },
        addEvent: function (node, event, handler) {
            if(window.addEventListener && typeof window.addEventListener === 'function'){
                node.addEventListener(event, function (e) {
                    if(handler && typeof handler === 'function'){
                        handler(e);
                    }
                });
            }
            else if(window.attachEvent && typeof window.attachEvent === 'function'){
                node.attachEvent('on'+event,function () {
                    if(handler && typeof handler === 'function'){
                        handler(window.event);
                    }
                });
            }else{
                node['on'+event] = function () {
                    if(handler && typeof handler === 'function'){
                        handler();
                    }
                };
            }
        }
    };


    /**
     *
     * main constructor function, which receive an object option to initialize and render a slider html component
     *
     * @param options
     *
     * @constructor
     *
     */
    var LiteSlider = function (options) {

        options = options || {};

        this.imgs = options.imgs || [];

        this.cur = 0;

        if(!options.node){
            throw new TypeError('Element Required');
        }

        this.node = options.node;

        this.max = this.imgs.length;

        this.itemW = options.itemW || 600;

        this.options = options;

        this.options.imgs = this.imgs;

        this.options.cur = this.cur;

        this.options.max = this.max;

        this.options.node = this.node;

        this.options.itemW = this.itemW;

        this.init(this.options);

    };


    /**
     *
     * turn to next slider item
     *
     */
    LiteSlider.prototype.next = function () {
        var options  = this.options;

        if(options.cur >= options.max - 1){
            console.log('no more!');
            return;
        }

        this.options.cur = options.cur = options.cur + 1;

        var left =  - ((options.cur) * options.itemW);

        var leftNow = parseFloat(getComputedStyle(this.options.node.querySelector('ul')).left);

        var range = left - leftNow;

        utils.tween(function (counter,max) {

            this.options.node.querySelector('ul').style = 'left:'+(leftNow +range * counter/max) + 'px';

        }.bind(this),500);




    };


    /**
     * turn to previous slider item
     */
    LiteSlider.prototype.prev = function () {
        var options  = this.options;

        if(options.cur <= 0){
            console.log('no more!');
            return;
        }

        this.options.cur = options.cur = options.cur - 1;

        var left =  - ((options.cur) * options.itemW);

        var leftNow = parseFloat(getComputedStyle(this.options.node.querySelector('ul')).left);

        var range = left - leftNow;

        utils.tween(function (counter,max) {

            this.options.node.querySelector('ul').style = 'left:'+(leftNow + range * counter/max) + 'px';

        }.bind(this),500);
    };

    /**
     *
     *  get options of object
     *
     * @returns {*|{}}
     */
    LiteSlider.prototype.getOptions = function () {
        return this.options;
    };


    /**
     *
     * object initializations
     *
     * @param options
     */
    LiteSlider.prototype.init = function (options) {

        this.render(options);
    };


    /**
     *
     * construct html snippets method, can be overidden
     *
     * @param options
     * @returns {string}
     */
    LiteSlider.prototype.constructHtml = function (options) {


        var left =  - ((options.cur) * options.itemW);

        var html = '<div class="lite-slider"> \
            <ul style="left:'+left+'px">';

        for(var i = 0 ; i <options.imgs.length; i ++){
            html = html + '<li class="slide-item" data-item-id="'+i+'">\
            <a><img src="'+options.imgs[i]+'" /></a>\
            </li>';
        }
        html = html +
            '</ul>\
        <div class="nav-pair">\
        <span class="nav nav-left"></span>\
        <span class="nav nav-right"></span>\
        </div>\
        </div>';
        return html;
    };


    /**
     *
     *  Main render method
     *
     *
     * @param options
     */
    LiteSlider.prototype.render = function (options) {

        // construnct html
        var html = this.constructHtml(options);


        // render
        options.node.innerHTML = html;

        // bind event
        utils.addEvent(options.node.querySelector('.nav.nav-left'),'click',function(){ this.next(); }.bind(this));
        utils.addEvent(options.node.querySelector('.nav.nav-right'),'click',function(){ this.prev(); }.bind(this));
    };


    /**
     *
     * Exposed For Public Use.
     *
     *
     * @type {Function}
     */
    window.LiteSlider = LiteSlider;

})(this || window);