/**
** jQuery Plugin : Rolling Banner
** 
** author : Jinwoong Han ( eng00n )
** twitter : https://twitter.com/theskyend0
** version : 1.0
** make date : 2014-01-11
** License : MIT
** Using : \n
-> 

HTML:
<div id='rolling-banner'>
	<div class='wrapper'>
		<div class='item' js-class='rollingBanner-item'><div style='width:200px; height:40px; background-color:#000;'></div></div>
		<div class='item' js-class='rollingBanner-item'><div style='width:200px; height:40px; background-color:#223;'></div></div>
		<div class='item' js-class='rollingBanner-item'><div style='width:200px; height:40px; background-color:#321;'></div></div>
		<div class='item' js-class='rollingBanner-item'><div style='width:200px; height:40px; background-color:#123;'></div></div>
		<div class='item' js-class='rollingBanner-item'><div style='width:200px; height:40px; background-color:#421;'></div></div>
		<div class='item' js-class='rollingBanner-item'><div style='width:200px; height:40px; background-color:#987;'></div></div>
		<div class='item' js-class='rollingBanner-item'><div style='width:200px; height:40px; background-color:#552;'></div></div>
	</div>
	<div class='clear'></div>
</div>

CSS:
#rolling-banner {
	height:50px;
	overflow:hidden;
	position: relative;
}

#rolling-banner > .wrapper {
	width:10000px;
	position: relative;
}

#rolling-banner > .wrapper > .item {
	position: absolute;
	left:0px;
	padding:5px;
	float:left;
}

JS:
$('#rolling-banner').rolling_banner({fps:10, speed:1});

***/

(function($) {
	/* public value */
	var roller_instance;

	/* Item Object */
	var item_class = function(_el, _next, _prev){
		this.leader;
		this.prev = _prev;
		this.next = _next;
		this.$el = $(_el);
		this.follow_to = 'prev';

		this.width = this.$el.width();
		this.x = 0;
	};

	item_class.prototype.blessLeader = function(){
		this.leader = true;
	};

	item_class.prototype.run = function(){

		if( this.leader ){
			this.setX( this.getX() + roller_instance.speed );
		}

		else if( this.follow_to === 'next' ){
			this.setX( this.next.getX() - this.width - 10 );
		} else {
			this.setX( this.prev.getX() + this.width + 10 );
		}

		if( this.getX() > roller_instance.getScreenWidth() ){
			this.follow_to = 'next';

			/* 리더가 스크린 밖으로 나가면 따라오는 prev 아이템을 리더로 변경  */
			if( this.leader ){
				this.leader = false;
				this.prev.leader = true;	
			}
		} else if ( this.getX() > 0 && this.follow_to === 'next' ){
			//this.follow_to = 'prev';
		}
	};

	item_class.prototype.setX = function(x){
		this.x = x;
		this.$el.css('left',x+'px');
	};

	item_class.prototype.getX = function(){
		return this.x;
	};

	item_class.prototype.setPrev = function(prev){ this.prev = prev; }
	item_class.prototype.setNext = function(next){ this.next = next; }

	/* Roller Object */
	var roller = function(el, options){
		this.$el = $(el);
		this.root_id = this.$el.attr('id');
		this.items = [];
		this.screen_width ;

		this.fps = options.fps || 10;
		this.speed = options.speed || 2;


		this.init();
		this.run();
		this.running = true;

		var self = this;
		this.$el.mouseover(function(){
			self.running = false;
		})

		this.$el.mouseout(function(){
			self.running = true;
		})

	};

	roller.prototype.init = function(){
		/**/
		this.screen_width = this.$el.width();

		var $wrapper = $('#'+this.root_id+" > .wrapper");

		var first, last, next, prev = undefined;

		for( var i in $wrapper[0].children ){
			var item_el = $wrapper[0].children[i];

			if( typeof item_el !== 'object'){
				continue;
			}

			if (item_el.getAttribute('js-class') !== 'rollingBanner-item' ){
				continue;
			}

			var item_obj = new item_class( item_el, next, prev );

			if(i == 0){
				first = item_obj;
				item_obj.blessLeader();
			}else{
				item_obj.setPrev(prev);
			}
			prev = last = item_obj;

			this.items.push( item_obj );

		}

		first.setPrev(last);

		/* next setting */
		for( var i in this.items ){
			this.items[i].prev.setNext( this.items[i] );
		}
	};

	roller.prototype.getScreenWidth = function(){
		return this.screen_width;
	};

	roller.prototype.run = function(){
		var self = this;
		setInterval(function(){
			if( self.running ){
				for( var i in self.items ){
					self.items[i].run();
				}
			}
		}, 1000 / this.fps );
	};


	$.fn.rolling_banner = function(options){
		roller_instance = new roller(this, options);
	};
}(jQuery));