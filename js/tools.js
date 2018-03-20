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

    $('.gallery-item a, .storehouse-gallery-item a').click(function(e) {
        $('html').data('scrollTop', $(window).scrollTop());
        $('.wrapper').css('margin-top', -$(window).scrollTop());
        e.preventDefault();
    });

    $('.gallery-item a, .storehouse-gallery-item a').fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        margin: 0,
        padding: 0,
        maxWidth: 970,
        minWidth: 480,
        topRatio: 0,
        aspectRatio: true,
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        helpers: {
			thumbs	: {
				width	: 86,
				height	: 58
			}
        },
        closeEffect: 'none',
        closeSpeed: 0,
        beforeShow: function() { this.title += '<div class="fancybox-title-date">' + $(this.element).data('date') + '</div><a href="' + $(this.element).attr('href') + '" download class="fancybox-download-link"></a>' }
    });

    $('.storehouse-info-item-text a').fancybox({
        margin: 0,
        padding: 0,
        maxWidth: 970,
        minWidth: 480,
        topRatio: 0,
        aspectRatio: true,
        scrolling: 'visible',
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        closeEffect: 'none',
        closeSpeed: 0,
        beforeShow: function() { this.title += '<div class="fancybox-title-date">' + $(this.element).data('date') + '</div>'}
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

    $('.geography-item-feedback-link').click(function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.geography-item-feedback.open').removeClass('open');
            curBlock.addClass('open');
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.geography-item-feedback').length == 0) {
            $('.geography-item-feedback.open').removeClass('open');
        }
    });

    $('.footer-feedback-link').click(function(e) {
        var curBlock = $(this).parent();
        curBlock.toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.footer-feedback').length == 0) {
            $('.footer-feedback.open').removeClass('open');
        }
    });

    $('.nav-mobile-link').click(function(e) {
        $('html').toggleClass('nav-mobile-open');
        e.preventDefault();
    });

    $('.nav-mobile > ul > li.with-submenu > a').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('.services-menu-mobile').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: true
    });

    $('.header-address-window-link').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-address').length == 0) {
            $('.header-address').removeClass('open');
        }
    });

    $('body').on('click', '.why-tab-more-link', function(e) {
        $(this).parents().filter('.why-tab-text').toggleClass('open');
        e.preventDefault();
    });

    $(window).on('load resize', function() {
        $('.why-tab-text').each(function() {
            var curBlock = $(this);
            curBlock.removeClass('open');
            if (curBlock.find('.why-tab-text-wrap').outerHeight() < curBlock.find('.why-tab-text-inner').outerHeight()) {
                curBlock.addClass('why-tab-text-with-link');
            } else {
                curBlock.removeCass('why-tab-text-with-link');
            }
        });
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

$(window).on('load resize', function() {
    if ($(window).width() < 1200) {
        if (!$('.storehouse-gallery').hasClass('slick-slider')) {
            $('.storehouse-gallery').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                arrows: false,
                dots: true
            });
        }
    } else {
        if ($('.storehouse-gallery').hasClass('slick-slider')) {
            $('.storehouse-gallery').slick('unslick');
        }
    }
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

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
    $('.form-checkbox, .form-input, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}