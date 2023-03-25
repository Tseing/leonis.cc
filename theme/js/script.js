jQuery(function($) {

	var body = $('body');
	var html = $('html');
	var viewport = $(window);

	/* ==========================================================================
	   Menu
	   ========================================================================== */

	function menu() {
		html.toggleClass('menu-active');
	};

	$('#menu').on({
		'click': function() {
			menu();
		}
	});

	$('.menu-button').on({
		'click': function() {
			menu();
		}
	});

	$('.hidden-close').on({
		'click': function() {
			menu();
		}
	});

	/* ==========================================================================
	   Search (TODO)
	   ========================================================================== */
	function search() {
		html.toggleClass('search-active');
	};

    function showSearch() {
		search();
		$('html').css('overflow-y', 'hidden');
        $('#search-wrapper').css('display','block');
		$('#search-wrapper').css('opacity','1');
    };

    function closeSearch() {
		search();
		$('html').css('overflow-y', 'unset');
        $('#search-wrapper').css('display','none');
		$('#search-wrapper').css('opacity','0');
		$(".input-field").val("");
    };

	// function click_body_to_close_search() {
	// 	var search_active = document.getElementsByClassName('search-active');
	// 	search_active ? closeSearch(): {};
	// };

	$('.search-button').on({
		'click': function() {
			showSearch();
		}
	});

	$('.search-close').on({
		'click':function() {
			closeSearch();
		}

	});

	// document.body.onclick = function() {
	// 	click_body_to_close_search();
	// };

	// $('.search').on({
	// 	'click':function() {
	// 		event.stopPropagation();
	// 	}
	// });

	/* ==========================================================================
	   Parallax cover
	   ========================================================================== */

	var cover = $('.cover');
	var coverPosition = 0;

	function prlx() {
		if(cover.length >= 1) {
			var windowPosition = viewport.scrollTop();
			(windowPosition > 0) ? coverPosition = Math.floor(windowPosition * 0.25) : coverPosition = 0;
			cover.css({
				'-webkit-transform' : 'translate3d(0, ' + coverPosition + 'px, 0)',
				'transform' : 'translate3d(0, ' + coverPosition + 'px, 0)'
			});
			if(viewport.scrollTop() < cover.height()){
				html.addClass('cover-active');
				html.removeClass('cover-inactive');
			}
			else{
				html.removeClass('cover-active');
				html.addClass('cover-inactive');
			}
			// (viewport.scrollTop() < cover.height()) ? html.addClass('cover-active') : html.removeClass('cover-active');
			// (viewport.scrollTop() > cover.height()) ? html.addClass('cover-inactive') : html.removeClass('cover-inactive');
		}
	}
	prlx();

	viewport.on({
		'scroll': function() {
			prlx();
		},
		'resize': function() {
			prlx();
		},
		'orientationchange': function() {
			prlx();
		}
	});

	/* ==========================================================================
	   Reading Progress
	   ========================================================================== */

	var post = $('.post-content');

	function readingProgress() {
		if(post.length >= 1) {
			var postBottom = post.offset().top + post.height();
			var windowBottom = viewport.scrollTop() + viewport.height();
			var progress = 100 - (((postBottom - windowBottom) / (postBottom - viewport.height())) * 100);
			$('.progress-bar').css('width', progress + '%');
			(progress > 100) ? $('.progress-container').addClass('ready') : $('.progress-container').removeClass('ready');
		}
	}
	readingProgress();

	viewport.on({
		'scroll': function() {
			readingProgress();
		},
		'resize': function() {
			readingProgress();
		},
		'orientationchange': function() {
			readingProgress();
		}
	});

	/* ==========================================================================
	   Gallery
	   ========================================================================== */

	function gallery() {
		var images = document.querySelectorAll('.kg-gallery-image img');
		images.forEach(function (image) {
			var container = image.closest('.kg-gallery-image');
			var width = image.attributes.width.value;
			var height = image.attributes.height.value;
			var ratio = width / height;
			container.style.flex = ratio + ' 1 0%';
		});
	}
	gallery();

	/* ==========================================================================
	   Style code blocks with highlight and numbered lines
	   ========================================================================== */

	// function codestyling() {
	// 	$('pre code').each(function(i, e) {
	// 		hljs.highlightBlock(e);

	// 		if(!$(this).hasClass('language-text')) {
	// 			var code = $(this);
	// 			var lines = code.html().split(/\n/).length;
	// 			var numbers = [];
	// 			for (i = 1; i < lines; i++) {
	// 				numbers += '<span class="line">' + i + '</span>';
	// 			}
	// 			code.parent().append('<div class="lines">' + numbers + '</div>');
	// 		}
	// 	});
	// }
	// codestyling();

	/* ==========================================================================
	   Initialize and load Disqus
	   ========================================================================== */

	if (typeof disqus === 'undefined') {
		$('.post-comments').css({
			'display' : 'none'
		});
	} else {
		$('#show-disqus').on('click', function() {
			$.ajax({
				type: "GET",
				url: "//" + disqus + ".disqus.com/embed.js",
				dataType: "script",
				cache: true
			});
			$(this).parent().addClass('activated');
		});
	}

	/* ==========================================================================
	   My Footprint Map Loading
	   ========================================================================== */

	let loader =`<div class="loader">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
      </svg>
  	</div>`;
	$("#map").prepend(loader);
	document.getElementById("map-html").onload = function() {
		$(".loader").remove();
	};
});
