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
        buttons : [
            'download',
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                DOWNLOAD    : 'Скачать',
                CLOSE       : 'Закрыть',
                NEXT        : 'Вперед',
                PREV        : 'Назад'
            }
        },
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-caption"></div>' +
                    '<div class="fancybox-stage"></div>' +
                "</div>" +
            "</div>",
        btnTpl: {
            download:
                '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"></a>',
            close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
            arrowLeft:
                '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"></a>',
            arrowRight:
                '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"></a>'
        },
        thumbs: {
            autoStart: true,
            hideOnClose: true,
            axis: 'x'
        }
    });

    $('.storehouse-info-item-text a').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE       : 'Закрыть',
                NEXT        : 'Вперед',
                PREV        : 'Назад'
            }
        },
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-caption"></div>' +
                    '<div class="fancybox-stage"></div>' +
                "</div>" +
            "</div>",
        btnTpl: {
            close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
            arrowLeft:
                '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"></a>',
            arrowRight:
                '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"></a>'
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

    $('.news-slider-prev').click(function(e) {
        var curIndex = $('.news-slider-ctrl a').index($('.news-slider-ctrl a.active'));
        curIndex--;
        if (curIndex < 0) {
            curIndex = $('.news-slider-ctrl a').length - 1;
        }
        $('.news-slider-ctrl a').eq(curIndex).trigger('click');
        e.preventDefault();
    });

    $('.news-slider-next').click(function(e) {
        var curIndex = $('.news-slider-ctrl a').index($('.news-slider-ctrl a.active'));
        curIndex++;
        if (curIndex > $('.news-slider-ctrl a').length - 1) {
            curIndex = 0;
        }
        $('.news-slider-ctrl a').eq(curIndex).trigger('click');
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
                curBlock.removeClass('why-tab-text-with-link');
            }
        });
    });

    $('.how-list').each(function() {
        $(this).find('.how-item').css({'width': 100 / $(this).find('.how-item').length + '%'});
    });

    $('.map-geography-cities a').click(function(e) {
        var curLink = $(this);
        myMap.setZoom(curLink.data('zoom'));
        myMap.panTo([curLink.data('coord1'), curLink.data('coord2')], {duration: 250, flying: false, safe: false});
        e.preventDefault();
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
        },
        submitHandler: function(form) {
            var curForm = $(form);

            $.ajax({
                type: 'POST',
                url: curForm.attr('action'),
                dataType: 'html',
                processData: false,
                contentType: false,
                data: new FormData(form),
                cache: false
            }).done(function(html) {
                for (var i = 0; i < captchaArray.length; i++) {
                    grecaptcha.reset(captchaArray[i][0]);
                    var curInput = captchaArray[i][1].next();
                    curInput.val('');
                    curForm.trigger('reset');
                    curForm.find('.form-file-name').html('');
                }
                alert('Форма отправлена');
            });
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

var captchaKey = '6Ldk5DMUAAAAALWRTOM96EQI_0OApr59RQHoMirA';
var captchaArray = [];

var onloadCallback = function() {
    $('.g-recaptcha').each(function() {
        var newCaptcha = grecaptcha.render(this, {
            'sitekey' : captchaKey,
            'callback' : verifyCallback,
        });
        captchaArray.push([newCaptcha, $(this)]);
    });
};

var verifyCallback = function(response) {
    for (var i = 0; i < captchaArray.length; i++) {
        if (grecaptcha.getResponse(captchaArray[i][0])) {
            var curInput = captchaArray[i][1].next();
            curInput.val(response);
            curInput.removeClass('error');
            curInput.parent().find('label.error').remove();
        }
    }
};