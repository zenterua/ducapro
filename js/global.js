/* 01 - Variables */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, isIE = window.navigator.msPointerEnabled, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style;
	var tabItemDegrees = [0, -9, 8, -18, -1, 16, -26, -9, 8, 25, -36, -17, -1, 16, 35];
	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/

	// Check if mobile mobile device
	if(_ismobile) $('body').addClass('mobile');

	// Main set time out for content loaded
	setTimeout( function() {
		// Add class after page loaded
		$('body').addClass('loaded');

		if ( isIE ) $('body').addClass('IE');

		// Page calculations functuin
		_functions.pageCalculations();
// 
		// Delate main page loader
		$('#loader-wrapper').fadeOut(300);

		// Swiper init function
		_functions.initSwiper();

		sectionCoordinates();

		animateSections();

		if ( !$('.hamburger').is(':visible') && $(window).scrollTop() > $('header').outerHeight() ) {
			$('header').addClass('scroll');
		} else {
			$('header').removeClass('scroll');
		}

		if ( $('.tabMenu').length === 1 ) {
			for ( var i = 0; i < tabItemDegrees.length; i++ ) {
				$('.tabMenu').eq(i).attr('data-rotate', tabItemDegrees.slice(0, 1)[i]);
			}
		}

		if ( $('.tabMenu').length === 2 ) {
			for ( var i = 0; i < tabItemDegrees.length; i++ ) {
				$('.tabMenu').eq(i).attr('data-rotate', tabItemDegrees.slice(1, 3)[i]);
			}
		}

		if ( $('.tabMenu').length === 3 ) {
			for ( var i = 0; i < tabItemDegrees.length; i++ ) {
				$('.tabMenu').eq(i).attr('data-rotate', tabItemDegrees.slice(3, 6)[i]);
			}
		}

		if ( $('.tabMenu').length === 4 ) {
			for ( var i = 0; i < tabItemDegrees.length; i++ ) {
				$('.tabMenu').eq(i).attr('data-rotate', tabItemDegrees.slice(6, 10)[i]);
			}
		}

		if ( $('.tabMenu').length === 5 ) {
			for ( var i = 0; i < tabItemDegrees.length; i++ ) {
				$('.tabMenu').eq(i).attr('data-rotate', tabItemDegrees.slice(10)[i]);
			}
		}
		
		$('.tabCircle').css({ 'transform': 'rotate(' + $('.tabMenu.active').attr('data-rotate') + 'deg)'});
		$('.tabCircle').css({ WebkitTransform: 'rotate(' + $('.tabMenu.active').attr('data-rotate') + 'deg)'});
		$('.tabCircle').css({ '-ms-transform': 'rotate(' + $('.tabMenu.active').attr('data-rotate') + 'deg)'});
        $('.tabCircle').css({ '-moz-transform': 'rotate(' + $('.tabMenu.active').attr('data-rotate') + 'deg)'});
		
	}, 700);

	/*==============================*/
	/* 04 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 05 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();

		if ( !$('.hamburger').is(':visible') && winScr > $('header').outerHeight() ) {
			$('header').addClass('scroll');
		} else {
			$('header').removeClass('scroll');
		}

		// Anchor sticky menu
		if ( $('.pageNav').length ) {
			$('.pageNav a').each(function () {
		        var $t = $(this),
		        	scrollPath = $( $t.attr("href") ).closest('.section'),
		        	thisHeeadH = $('header').outerHeight();

		        if ( scrollPath.offset().top - thisHeeadH <= winScr + winH / 2 && scrollPath.offset().top + scrollPath.outerHeight() - thisHeeadH > winScr + winH / 2 ) {
		            $('.pageNav li').removeClass("active");
		            $t.parent().addClass("active");
		            scrollPath.removeClass('activeSection');
		            scrollPath.addClass('activeSection');
		        }
		        else{
		            $t.parent().removeClass("active");
		            scrollPath.removeClass('activeSection');
		        }

		        if ( $(window).scrollTop() + $(window).height() >  $(document).height() - ( $('footer').outerHeight() / 2 ) ) {
		        	$('.pageNav').addClass('hidePagi');
		        } else {
		        	$('.pageNav').removeClass('hidePagi');
		        }

		        if ( $('.activeSection').attr('data-navAnchor') ) {
		        	$('nav li').removeClass('active');
		        	$('nav li.' + $('.activeSection').attr('data-navAnchor') + '').addClass('active');
		        } else {
		        	$('nav li').removeClass('active');
		        }
		    });
		}

		if ( $('.whiteBlock').hasClass('activeSection') ) {
			$('.pageNav').addClass('darkPagination');
		} else {
			$('.pageNav').removeClass('darkPagination');
		}

		animateSections();
	};

	/*=====================*/
	/* 06 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.parent().find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
				paginationType: 'fraction',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 
		        	767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 
		        	991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 
		        	1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) }, 
		        	1500: {slidesPerView: parseInt($t.attr('data-lt-slides'), 10)} } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
				parallax: (_isFF)?($t.data('parallax'), 0): ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				centeredSlides: ($t.is('[data-centered]'))?parseInt($t.data('centered'), 10):0,
				onTransitionEnd: function(swiper) {
					if( $t.closest('.swiperMainWrapper').hasClass('dataTitleSlider') ) {
						$t.closest('.swiperMainWrapper').find('.slideTitle').html($t.find('.swiper-slide-active').attr('data-title'));
					}
					if ( $t.closest('.processSwiper') ) {
						$('.customSelect').removeClass('active');
						$('.processSwiper').find('.customSelect').eq(swiper.activeIndex).addClass('active');
					}
				}
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});

	};

	/*==============================*/
	/* 07 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	$(document).on('click', '.open-popup', function(e){
		e.preventDefault();

		$('.popupContent').removeClass('active');
		$('.popupWrapper, .popupContent[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popupWrapper .buttonClose, .popupWrapper .layerClose', function(){
		$('.popupWrapper, .popupContent').removeClass('active');
		$('.popupContent').find('iframe').attr('src', '');
		$('html').removeClass('overflow-hidden');
		return false;
	});
	
	//Function OpenPopup
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	}

	//Tabs
	var tabsFinish = 0;
	$('.tabMenu').on('click', function() {
		if($(this).hasClass('active') || tabsFinish) return false;
		tabsFinish = 1;
        var tabsWrapper = $(this).closest('.tabsBlock'),
        	tabsMenu = tabsWrapper.find('.tabMenu'),
        	tabsItem = tabsWrapper.find('.tabEntry'),
        	index = tabsMenu.index(this);
        
        tabsItem.filter(':visible').fadeOut(function(){
        	tabsItem.eq(index ).fadeIn(function(){
        		tabsFinish = 0;
        	});
        });

        $('.tabCircle').css({ 'transform': 'rotate(' + $(this).attr('data-rotate')  + 'deg)'});
        $('.tabCircle').css({ WebkitTransform: 'rotate(' + $(this).attr('data-rotate') + 'deg)'});
        $('.tabCircle').css({ '-ms-transform': 'rotate(' + $(this).attr('data-rotate') + 'deg)'});
        $('.tabCircle').css({ '-moz-transform': 'rotate(' + $(this).attr('data-rotate') + 'deg)'});

        if ( $('.hamburger').is(':visible') ) {
        	$('.mobileTabMenu .as').html($(this).html());
        	$('.mobileTabMenu').removeClass('active');
        	$(this).closest('.tabMenuWrapp').slideToggle(350);
        }
        tabsMenu.removeClass('active');
        $(this).addClass('active');
    });

	//Accordeon
	$('.accordeonTitle').on('click', function(){
		$(this).closest('.accordeon').find('.accordeonTitle').not(this).removeClass('active').next().slideUp();
		$(this).addClass('active').next().slideDown();
	});
    
	//Smooth Scroll
    if(!_ismobile) SmoothScroll({ stepSize: 100 });

    // Mobile menu icon
    $('.hamburger').on('click', function() {
    	$(this).toggleClass('active');
    	$('nav').toggleClass('active');
    	$('html,body').toggleClass('overflow-hidden');
    });

    // Banner scroll dowm
    $('.scrollButtonWrap').on('click', function() {
    	$('body,html').animate({scrollTop: $(this).closest('section').outerHeight() - 80 }, 500);
    });

    // Swiper pagination
    $('.customSelect').on('click', function() {
    	swipers['swiper-'+$(this).closest('.processSwiper').find('.swiper-container').attr('id')].slideTo( $(this).index() );

    	$('.customSelect').removeClass('active');
    	$(this).addClass('active');
    });

    // Responsive tab menu
    $('.mobileTabMenu').on('click', function() {
    	$(this).toggleClass('active');
    	$(this).parent().find('.tabMenuWrapp').slideToggle(350);
    });

    //Page navigation menu
    $('.pageNav a').on('click', function(e) {
    	e.preventDefault(); 

    	$('body, html').stop().animate({scrollTop: $( $(this).attr('href') ).offset().top }, 777);
    });

    $('header a').on('click', function(e) {
    	if ( !$(this).closest('header').hasClass('style2') ) e.preventDefault();

    	var sliceStart = $(this).attr('href').indexOf('#'),
    		scrollPath = $(this).attr('href').slice(sliceStart),
    		scrollPathOf = $(scrollPath).offset().top ;

    	$('body, html').stop().animate({scrollTop: scrollPathOf }, 777);
    	$('header nav li').removeClass('active');
    	$(this).parent().addClass('active');

    	if ($('.hamburger').is(':visible') ) {
    		$('nav, .hamburger').removeClass('active');
    		$('html, body').removeClass('overflow-hidden');
    	}

    });

    //Change textarea height on focus/unfocus
    $('textarea.simpleInput').focus(function() {
    	$(this).addClass('areaActive');
    });
    $('textarea.simpleInput').blur(function() {
    	if ( !$(this).val() ) $(this).removeClass('areaActive');
    	
    });

    // On page load set top coordinates for animation
	function sectionCoordinates(){
		$('.animateSection').each(function(){
			$(this).data('top', $(this).offset().top );
		});
	}

	// Trigger animation on scroll
	function animateSections() {
		$('.animateSection').each(function(){
			if ($(this).data('top') <= $(window).scrollTop() + $(window).height() / 1.65 ){
				$(this).addClass('animated');
			} 
		});
	}



	


});