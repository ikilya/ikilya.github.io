$(document).ready(function() {

    $('.mini li').on('click', function(event) {
        var currentIndex = $('.mini li.current').index();
        $('.gallery').children('ul').children('li').eq(currentIndex).addClass('hidden');
        $('.mini li.current').removeClass('current');
        currentIndex = $(this).index();
        $('.gallery').children('ul').children('li').eq(currentIndex).removeClass('hidden');
        $(this).addClass('current');
    });
});
