var ZoomGrid = (function() {
	var w = $(window);
	var grid = $('.grid');
	var item = $('.grid__item');
	var itemContent = item.find('.grid__link');
	var post = $('.post');
	var backBtn = post.find('.post__back');
	var nextBtn = post.find('.post__forw');
	var breakpoint = 700;
	var isBig = false;

	var zoom = function(event) {
		var content = $(this).find('.grid__link');
		var self = $(this);
		var index = self.index();
		var vw = w.innerWidth();
		var vh = w.innerHeight();
		var ds = $(document).scrollTop();
		var px = event.pageX;
		var py = event.pageY;

		// scale stuff
		var iw = $(this).innerWidth();
		var ih = $(this).innerHeight();
		var sx = vw/iw;
		var sy = vh/ih;
		
		// transform-origin stuff
		var o = $(this).offset();
		var xc = vw/2;
		var yc = ds + vh/2;
		
		var dsp = ds/ (vh+ds) * 100;
		
		tox = px/vw *100;
		toy = py/vh *100;
		toy = toy - dsp;

		if (!isBig && vw >= breakpoint) {
			grid.css({
				'transform-origin': tox + '% ' + toy + '%'
			});

			setTimeout(function() {
				requestAnimationFrame(function() {
					grid.css({
						'transform-origin': tox + '% ' + toy + '%',
						'transform': 'scale(' + sx + ',' + sy + ')'
					});
					itemContent.css({'opacity': '0'});
					$('body').css('overflow', 'hidden');
					showPost(index); // show post function
					isBig = true;
				});

			}, 50);


		} else {
			// this stuff happens at the breakpoint/smaller screens
			
			itemContent.css({
				'opacity': '0'
			});
			showPost(index);
			isBig = true;
		}
		return false;
	};

	var zoomout = function() {
		// reset grid back to normal/hide post
		if (isBig) {
			post.addClass('post--hide');
			post.removeClass('post--active');
			post.on('transitionend', function() {
				grid.css({
					'transform': 'scale(1)'
				});
				itemContent.css({'opacity': '1'});
				$('body').removeAttr('style');
				post.off('transitionend');
			});

			isBig = false;
		}
		return false;
	};
	
	var showPost = function(index) {
		post.eq(index).removeClass('post--hide').addClass('post--active');
	};

	var nextPost = function() {
		var cur = $('.post--active');
		var next = cur.next('.post');
		if (!next.length) {
			next = post.first();
		}
		cur.addClass('post--hide').removeClass('post--active');
		next.removeClass('post--hide').addClass('post--active');
		return false;
	};
	
	var bindActions = function() {
		item.on('click', zoom);
		backBtn.on('click', zoomout);
		nextBtn.on('click', nextPost);
	};
	
	var init = function() {
		bindActions();
	};
	
	return {
		init: init
	};

}());

ZoomGrid.init();

