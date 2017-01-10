var sliderPeriod    = 5000;
var sliderTimer     = null;

$(document).ready(function() {

    $('.about-basis-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.about-basis-menu li').index(curLi);
            $('.about-basis-menu li.active').removeClass('active');
            curLi.addClass('active');

            $('.about-basis-tab.active').removeClass('active');
            $('.about-basis-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.gallery-item a, .storehouse-gallery-item a').fancybox({
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        helpers: {
            overlay : {
                locked : false
            }
        }
    });

    $('.news-slider').each(function() {
        var curSlider = $(this);
        curSlider.data('curIndex', 0);
        curSlider.data('disableAnimation', true);
        var curHTML = '';
        curSlider.find('.news-slider-item').each(function() {
            curHTML += '<a href="#"></a>';
        });
        $('.news-slider-ctrl-inner').html(curHTML);
        $('.news-slider-ctrl-inner a:first').addClass('active');
        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
    });

    function sliderNext() {
        var curSlider = $('.news-slider');

        if (curSlider.data('disableAnimation')) {
            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex >= curSlider.find('.news-slider-item').length) {
                newIndex = 0;
            }

            curSlider.data('curIndex', newIndex);
            curSlider.data('disableAnimation', false);

            curSlider.find('.news-slider-item').eq(curIndex).css({'z-index': 2});
            curSlider.find('.news-slider-item').eq(newIndex).css({'z-index': 1}).show();

            curSlider.find('.news-slider-ctrl a.active').removeClass('active');
            curSlider.find('.news-slider-ctrl a').eq(newIndex).addClass('active');

            curSlider.find('.news-slider-item').eq(curIndex).fadeOut(function() {
                curSlider.data('disableAnimation', true);
                sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            });
        }
    }

    $('.news-slider').on('click', '.news-slider-ctrl a', function(e) {
        if (!$(this).hasClass('active')) {
            window.clearTimeout(sliderTimer);
            sliderTimer = null;

            var curSlider = $('.news-slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = $('.news-slider-ctrl a').index($(this));

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.news-slider-item').eq(curIndex).css({'z-index': 2});
                curSlider.find('.news-slider-item').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.news-slider-ctrl a.active').removeClass('active');
                curSlider.find('.news-slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.find('.news-slider-item').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        e.preventDefault();
    });

    $('.bg-slider').each(function() {
        var curSlider = $(this);
        curSlider.data('disableAnimation', true);
    });

    $('.bg-slider-preview a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {

            var curSlider = $('.bg-slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = $('.bg-slider-preview li').index($('.bg-slider-preview li.active'));
                var newIndex = $('.bg-slider-preview li').index(curLi);

                curSlider.data('disableAnimation', false);

                curSlider.find('.bg-slider-item').eq(curIndex).css({'z-index': 2});
                curSlider.find('.bg-slider-item').eq(newIndex).css({'z-index': 1}).show();

                $('.bg-slider-preview li.active').removeClass('active');
                $('.bg-slider-preview li').eq(newIndex).addClass('active');

                curSlider.find('.bg-slider-item').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                });
            }
        }

        e.preventDefault();
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.why-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.why-menu li').index(curLi);
            $('.why-menu li.active').removeClass('active');
            curLi.addClass('active');

            $('.why-tab.active').removeClass('active');
            $('.why-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.news-other-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
    });

});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
    });
}