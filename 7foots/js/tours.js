$(document).ready(function() {
    $('#tours').slider({menu: false});
    runSlider3('piers_slider');

    $('.tours_menu li').on('click', function(event) {
        var target = $('.tours_slider').children('li')[$(this).index()];
        if( target) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - 90
            }, 700);
        }
        $('.tours_menu li.current').removeClass('current');
        $(this).addClass('current');
    });
});

/* Slider3 */

function runSlider3(sliderName) {
    sliderName = '.' + sliderName;
    var viewport = sliderName + ' .viewport';
    var slideWrapper = sliderName + ' .slide_wrapper';
    var routeList = sliderName + ' .route';
    var dots = sliderName + ' .dots';
    var dotsLi = dots + ' li';
    var routeLi = routeList + ' li';

    var slideWidth = $(viewport).width();
    $(slideWrapper).width($(slideWrapper).children().size() * slideWidth);

    $(dotsLi).off('click');
    $(routeLi).off('click');

    $(dotsLi).click(function() {
        var newIndex = $(dotsLi).index($(this))
        toSlide(newIndex, slideWrapper, slideWidth, routeList, dots)
    });

    $(routeLi).click(function() {
        var newIndex = $(routeLi).index($(this))
        toSlide(newIndex, slideWrapper, slideWidth, routeList, dots)
    });

}

function toSlide(newIndex, slideWrapper, slideWidth, routeList, dots) {
    var currentSlide = parseInt($(slideWrapper).data('current'));

    var routeLi = routeList + ' li' + ':eq(' + currentSlide + ')';
    var dotsLi = dots + ' li' + ':eq(' + currentSlide + ')';
    $(routeLi).removeClass('current');
    $(dotsLi).removeClass('current');

    $(slideWrapper).animate({left: - newIndex * slideWidth}, 300).data('current', newIndex);
    currentSlide = newIndex;

    routeLi = routeList + ' > li' + ':eq(' + currentSlide + ')';
    $(routeLi).addClass('current');
    dotsLi = dots + ' > li' + ':eq(' + currentSlide + ')';
    $(dotsLi).addClass('current');
}

/* -- Slider3 -- */
