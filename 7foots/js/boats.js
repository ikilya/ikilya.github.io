$(document).ready(function() {

    $('#boats .wrapper').css('min-height', $('.boats_menu').height() + 160);

    var boatsMenu = $('.boats_menu').children('ul');
    $(boatsMenu).children('li').children('a').on('click', function(event) {
        $(boatsMenu).children('li.current').children('ul').addClass('hidden');
        $(boatsMenu).children('li.current').removeClass('current');
        $(this).parent().addClass('current');
        $(this).parent().children('ul').removeClass('hidden');
        $(this).parent().children('ul').children('li').eq(0).addClass('current').click();
    });

    $('.sub_list').children('li').on('click', function(event) {
        $(this).parent().children('li.current').removeClass('current');
        $(this).addClass('current');
        var data = $(this).html();
        var arr = data.split(' ');
        var begin = Number(arr[0]);
        var end = Number(arr[2]);
        var type = $(this).parent().parent().children('a').attr('href').slice(1);
        var boatsList = $('#boats .wrapper').children('ul').children('li');
        for (var i = 0; i < boatsList.size(); i++) {
            var t = $(boatsList[i]).attr('data-type');
            var people = Number($(boatsList[i]).find('.number_of_people').html());
            if (t == type && people >= begin && people <= end) {
                if ($(boatsList[i]).hasClass('hidden')) {
                    $(boatsList[i]).removeClass('hidden');
                }
            } else if (!$(boatsList[i]).hasClass('hidden')) {
                $(boatsList[i]).addClass('hidden');
            }
        }
    });

    var anchorIndex = window.location.href.indexOf('#');
    if (anchorIndex > 0) {
        var anchor = window.location.href.slice(anchorIndex);
        $(boatsMenu).find('a[href = ' + anchor + ']').click();
    } else {
        $(boatsMenu).find('a').eq(0).click();
    }
});
