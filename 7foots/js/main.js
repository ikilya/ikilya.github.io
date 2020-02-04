$(document).ready(function() {
    /* Run Sliders */
    $('#about_company').slider();
	$('#tours').slider({menu: true, width: 538, height: 373, resize:true});
    $('.tours_rm_wrapper').slider();
    $('#routes').slider({menu: true});
    $('#captains').slider();
    $('#events').slider({menu: true, lastItemShowAll: true});

    $('#tours').find('.read_more a').each(function(index) {
        $(this).click(function () {
            $('.bg').removeClass('hidden');
            $('.tours_rm_wrapper').removeClass('hidden').css('top', window.pageYOffset || document.documentElement.scrollTop).children('.slider').children('li').eq(index).removeClass('hidden');
            return false;
        });
    });

    $('.tours_rm_wrapper').find('.close_button').each(function(index) {
        $(this).click(function () {
            $('.bg').addClass('hidden');
            $('.tours_rm_wrapper').addClass('hidden').children('.slider').children('li').eq(index).addClass('hidden');
            return false;
        });
    });

    /* Main menu */
    $('.toggle_menu').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').parent().css('position', '').children('ul').css('transform', '');
        } else {
            $(this).addClass('active').parent().css('position', 'fixed').children('ul').css('transform', 'translateX(0%)');
        }
    });

    $('nav a').click(function () {
        if (!$('.toggle_menu').hasClass('hidden')) {
            $('.toggle_menu').removeClass('active').parent().css('position', '').children('ul').css('transform', '');
        }
    });

    /* Tours menu */
    $('.tours_menu li').click(function () {
        $('#tours').find('.choice').removeClass('active');
        $(this).parent().css('display', '');
    });

    $('#tours').find('.choice').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().children('ul').css('display', '');
        } else {
            $(this).addClass('active');
            $(this).parent().children('ul').css('display', 'block');
        }
    });

    /* Events menu */
    $('.events_menu li').click(function () {
        $('#events').find('.choice').removeClass('active');
        $(this).parent().css('display', '');
    });

    $('#events').find('.choice').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().children('ul').css('display', '');
        } else {
            $(this).addClass('active');
            $(this).parent().children('ul').css('display', 'block');
        }
    });


    /* Custom elements */
    var customInputNumber = $('.custom_input_number');

    var timeLabel = $('#certificate').find('.time').children('span').eq(1);
    $(customInputNumber).find('.plus_btn').click(function () {
        var input = $(this).parent().parent().children('input');
        var max = Number($(input).attr('max'));
        var step = Number($(input).attr('step'));
        var value = Number($(input).attr('value'));
        value += step;
        if (value <= max) {
            $(input).attr('value', value);
            $(this).parent().parent().children('span').html(value);
            correctTime();
        }
    });

    $(customInputNumber).find('.minus_btn').click(function () {
        var input = $(this).parent().parent().children('input');
        var min = Number($(input).attr('min'));
        var step = Number($(input).attr('step'));
        var value = Number($(input).attr('value'));
        value -= step;
        if (value >= min) {
            $(input).attr('value', value);
            $(this).parent().parent().children('span').html(value);
            correctTime();
        }
    });

    $(customInputNumber).children('span').html($(customInputNumber).children('input').attr('value'));
    correctTime();

    function correctTime() {
        var value = Number($(customInputNumber).children('span').html());
        var correctForm = "часов";
        if (value < 21) {
            if (value < 5) {
                if (value === 1) {
                    correctForm = "час";
                } else {
                    correctForm = "часа";
                }
            }
        } else if ((value % 10 < 5)) {
            if (value % 10 === 1) {
                correctForm = "час";
            } else {
                correctForm = "часа";
            }
        }
        $(timeLabel).html(correctForm);
    }
});