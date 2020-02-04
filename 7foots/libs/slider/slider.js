(function($) {
	var defaults = {
		//Slider has a menu
		menu: false,
		//Last menu item show all sliders
		lastItemShowAll: false,
		//Slider has navigation dots
		dots: true,
		//Slider has navigation arrows
		arrows: true,
		//Slider has captions
		captions: true,
		//Slider has small images
		smallImages: false,
        //Slide width
        width: 538,
        //Slide height
        height: 373,
        //Need resize slider
        resize: false
	};

	$.fn.slider = function(params) {
        var options = $.extend({}, defaults, params);

        var slider = this.find('.slider');

        if (options.menu === true) {
        	var menu = this.find('.slider_menu');
            var menuItems = $(menu).children('li');
            var childrenNumber = menuItems.size();
            for (var i = 0; i < childrenNumber - 1; i++) {
                runSlider(i, slider, options.width, options.height, options.resize);
            }

            $(menuItems).click(function() {
                var currentItem = parseInt($(menu).data('current'));
                changeCurrent($(this), options.lastItemShowAll, currentItem, menu, menuItems, slider);
            });
		} else {
            if ($(slider).children('li').length > 0) {
                for (var i = 0; i < $(slider).children('li').size(); i++) {
                    runSlider(i, slider, options.width, options.height, options.resize);
                }
            } else {
                runSlider(0, slider, options.width, options.height, options.resize);
            }
        }

		return this;
	};

    function changeCurrent(thisLi, lastItemShowAll, currentItem, menu, menuItems, slider) {
        var menuLi = menuItems[currentItem];
        var ulLi = slider.children('li')[currentItem];
        $(menuLi).removeClass('current');
        $(ulLi).addClass('hidden');

        currentItem = menuItems.index(thisLi);
        $(menu).data('current', currentItem);
        $(thisLi).addClass('current');

        ulLi = slider.children('li')[currentItem];
        $(ulLi).removeClass('hidden');

        if (lastItemShowAll) {
            var childrenNumber = menuItems.size();
            for (var i = 0; i < childrenNumber; i++) {
                var currentLi = slider.children('li')[i];
                if (currentItem == childrenNumber - 1 || i == currentItem) {
                    if ($(currentLi).hasClass('hidden')) {
                        $(currentLi).removeClass('hidden');
                    }
                } else if (!$(currentLi).hasClass('hidden')) {
                    $(currentLi).addClass('hidden');
                }
            }
        }

        return currentItem;
    }

    function runSlider(currentItem, slider, width, height, resize) {
        var viewport = slider.find('.viewport')[currentItem];
        var slideWrapper = slider.find('.slide_wrapper')[currentItem];
        var viewportSmall = slider.find('.viewport_small')[currentItem];
        var slideWrapperSmall = slider.find('.slide_wrapper_small')[currentItem];
        var captions = slider.find('.captions')[currentItem];
        var captionWrapper = slider.find('.caption_wrapper')[currentItem];
        var nextArrow = slider.find('.next_slide')[currentItem];
        var prevArrow = slider.find('.prev_slide')[currentItem];
        var routeList = slider.find('.route')[currentItem];
        var textList = slider.find('.text_wrapper')[currentItem];
        var arrows = slider.find('.arrows')[currentItem];
        var sliderNav = slider.find('.slider_nav')[currentItem];
        var dots = slider.find('.dots')[currentItem];
        var dotsLi = $(dots).find('li');
        var routeLi = $(routeList).find('li');

        var slideWidth = $(viewport).width();
        if (resize) {
            var slideHeight = parseInt(slideWidth * (height / width), 10);
            $(viewport).height(slideHeight);
            $(arrows).height(slideHeight);
            $(sliderNav).height(slideHeight);
            $(slideWrapper).children('li').width(slideWidth).height(slideHeight);
        }

        $(slideWrapper).width($(slideWrapper).children().size() * slideWidth);
        var slideWidthSmall = $(viewportSmall).width();
        $(slideWrapperSmall).width($(slideWrapperSmall).children().size() * slideWidthSmall);
        var captionWidth = $(captions).width();
        $(captionWrapper).width($(captionWrapper).children().size() * captionWidth);

        $(nextArrow).off('click');
        $(prevArrow).off('click');
        $(dotsLi).off('click');
        $(routeLi).off('click');

        $(nextArrow).click(function() {
            nextSlide(slideWrapper, slideWidth, slideWrapperSmall, slideWidthSmall, captionWrapper, captionWidth, routeList, textList, dots);
            return false;
        });

        $(prevArrow).click(function() {
            prevSlide(slideWrapper, slideWidth, slideWrapperSmall, slideWidthSmall, captionWrapper, captionWidth, routeList, textList, dots);
            return false;
        });

        $(dotsLi).click(function() {
            var newIndex = $(dotsLi).index($(this));
            toSlide(newIndex, slideWrapper, slideWidth, slideWrapperSmall, slideWidthSmall, captionWrapper, captionWidth, routeList, textList, dots);
        });

        $(routeLi).click(function() {
            var newIndex = $(routeLi).index($(this));
            toSlide(newIndex, slideWrapper, slideWidth, slideWrapperSmall, slideWidthSmall, captionWrapper, captionWidth, routeList, textList, dots);
        });
    }

    function nextSlide(slideWrapper, slideWidth, slideWrapperSmall, slideWidthSmall, captionWrapper, captionWidth, routeList, textList, dots) {
        var currentSlide = parseInt($(slideWrapper).data('current'));

        var routeLi = $(routeList).find('li')[currentSlide];
        var textLi = $(textList).find('li')[currentSlide];
        var dotsLi = $(dots).find('li')[currentSlide];
        $(routeLi).removeClass('current');
        $(textLi).addClass('hidden');
        $(dotsLi).removeClass('current');

        currentSlide++;
        if (currentSlide >= $(slideWrapper).children().size()) {
            currentSlide = 0;
        }
        $(slideWrapper).animate({left: - currentSlide * slideWidth}, 300).data('current', currentSlide);
        $(slideWrapperSmall).animate({left: - currentSlide * slideWidthSmall}, 300).data('current', currentSlide);
        $(captionWrapper).animate({left: - currentSlide * captionWidth}, 300).data('current', currentSlide);

        routeLi = $(routeList).children('li')[currentSlide];
        $(routeLi).addClass('current');
        textLi = $(textList).children('li')[currentSlide];
        $(textLi).removeClass('hidden');
        dotsLi = $(dots).children('li')[currentSlide];
        $(dotsLi).addClass('current');
    }

    function prevSlide(slideWrapper, slideWidth, slideWrapperSmall, slideWidthSmall, captionWrapper, captionWidth, routeList, textList, dots) {
        var currentSlide = parseInt($(slideWrapper).data('current'));

        var routeLi = $(routeList).find('li')[currentSlide];
        var textLi = $(textList).find('li')[currentSlide];
        var dotsLi = $(dots).find('li')[currentSlide];
        $(routeLi).removeClass('current');
        $(textLi).addClass('hidden');
        $(dotsLi).removeClass('current');

        currentSlide--;
        if (currentSlide < 0)
        {
            currentSlide = $(slideWrapper).children().size()-1;
        }
        $(slideWrapper).animate({left: - currentSlide * slideWidth}, 300).data('current', currentSlide);
        $(slideWrapperSmall).animate({left: - currentSlide * slideWidthSmall}, 300).data('current', currentSlide);
        $(captionWrapper).animate({left: - currentSlide * captionWidth}, 300).data('current', currentSlide);

        routeLi = $(routeList).children('li')[currentSlide];
        $(routeLi).addClass('current');
        textLi = $(textList).children('li')[currentSlide];
        $(textLi).removeClass('hidden');
        dotsLi = $(dots).children('li')[currentSlide];
        $(dotsLi).addClass('current');
    }

    function toSlide(newIndex, slideWrapper, slideWidth, slideWrapperSmall, slideWidthSmall, captionWrapper, captionWidth, routeList, textList, dots) {
        var currentSlide = parseInt($(slideWrapper).data('current'));

        var routeLi = $(routeList).find('li')[currentSlide];
        var textLi = $(textList).find('li')[currentSlide];
        var dotsLi = $(dots).find('li')[currentSlide];
        $(routeLi).removeClass('current');
        $(textLi).addClass('hidden');
        $(dotsLi).removeClass('current');

        $(slideWrapper).animate({left: - newIndex * slideWidth}, 300).data('current', newIndex);
        $(slideWrapperSmall).animate({left: - newIndex * slideWidthSmall}, 300).data('current', newIndex);
        $(captionWrapper).animate({left: - newIndex * captionWidth}, 300).data('current', newIndex);
        currentSlide = newIndex;

        routeLi = $(routeList).children('li')[currentSlide];
        $(routeLi).addClass('current');
        textLi = $(textList).children('li')[currentSlide];
        $(textLi).removeClass('hidden');
        dotsLi = $(dots).children('li')[currentSlide];
        $(dotsLi).addClass('current');
    }
})(jQuery);