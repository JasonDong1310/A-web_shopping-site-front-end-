(function ($) {
    "use strict";
    
    // Commons Variables
    var $window = $(window),
        $body = $('body');
    
    // Mobile Menu
    $('.mobile-menu-toggle').on('click', function(e) {
        e.preventDefault();
        $body.addClass('mobile-menu-open');
    });
    $('.mobile-menu-close, .offcanvas-menu-close').on('click', function(e) {
        e.preventDefault();
        $body.removeClass('mobile-menu-open');
    });
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( $this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) || ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active').children('ul').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
                $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
            } else {
                $this.parent('li').addClass('active').children('ul').slideDown().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-down').addClass('zmdi-chevron-up');
                $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
            }
        }
    });
    
    // Header Cart
    var $headerCarToggle = $('.offcanvas-cart-toggle'),
        $offCanvasCartClose = $('.offcanvas-cart-close');
    $headerCarToggle.on('click', function(e){
        e.preventDefault();
        $body.addClass('offcanvas-cart-open');
    });
    $offCanvasCartClose.on('click', function(e){
        e.preventDefault();
        $body.removeClass('offcanvas-cart-open');
    });
    
    // Close When Click Outside Elements
    $body.on('click', function(e){
        var $target = e.target;
        
        // Mobile Menu Close
        if (!$($target).is('.offcanvas-mobile-menu, .mobile-menu-toggle') && !$($target).parents().is('.offcanvas-mobile-menu, .mobile-menu-toggle')) {
            $body.removeClass('mobile-menu-open');
        }
        // Header Cart Close
        if (!$($target).is('.offcanvas-cart-section, .offcanvas-cart-toggle') && !$($target).parents().is('.offcanvas-cart-section, .offcanvas-cart-toggle')) {
            $body.removeClass('offcanvas-cart-open');
        }
    });
    
    // Hero Slider
    $('.hero-slider').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fa fa-chevron-right"></i></button>',
    });
    
    // Single Product Image & Thumbnail Slider
    $('.single-product-image').slick({
        arrows: false,
        draggable: false,
        swipe: false,
        touchMove: false,
        asNavFor: '.single-product-thumb',
    });
    $('.single-product-thumb').slick({
        focusOnSelect: true,
        slidesToShow: 4,
        asNavFor: '.single-product-image',
        vertical: true,
        verticalSwiping: true,
        prevArrow: '<button class="slick-prev"><i class="icofont-rounded-up"></i></button>',
        nextArrow: '<button class="slick-next"><i class="icofont-rounded-down"></i></button>',
        responsive: [
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    });
    
    // Related Product Slider
    $('.related-product-slider').slick({
        arrows: false,
        slidesToShow: 4,
        prevArrow: '<button class="slick-prev"><i class="icofont-thin-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="icofont-thin-right"></i></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    // Product View Mode
    $('.product-view-mode').on('click', 'button', function(e) {
        e.stopPropagation();
        var $this = $(this);
        var $modeClass = $this.data('mode');
        var $productWrap = $('.shop-product-wrap');
        $this.addClass('active').siblings().removeClass('active');
        $productWrap.removeClass('priduct-grid product-list').addClass('product-'+$modeClass);
    });
    
    // Price Range
    $('#price-range').slider({
        range: true,
        min: 0,
        max: 900,
        values: [ 100, 755],
        slide: function( event, ui ) {
            $('.ui-slider-handle:eq(0)').html( '<span>' + '$' + ui.values[ 0 ] + '</span>');
            $('.ui-slider-handle:eq(1)').html( '<span>' + '$' + ui.values[ 1 ] + '</span>');
        }
    });
    $('.ui-slider-handle:eq(0)').html( '<span>' + '$' + $( "#price-range" ).slider( "values", 0 ) + '</span>' );
    $('.ui-slider-handle:eq(1)').html( '<span>' + '$' + $( "#price-range" ).slider( "values", 1 ) + '</span>' );
    
    // Product Quantity
    $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
    $('.pro-qty').append('<span class="inc qtybtn">+</span>');
    $('.qtybtn').on('click', function() {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
           // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
            } else {
            newVal = 0;
          }
        }
        $button.parent().find('input').val(newVal);
    });
    
    // Nice Select
    $('.nice-select').niceSelect();
    
    // Single Product Zoom
    $('.single-product-image .slick-slide').zoom();
    
    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    
    // Shipping Form Toggle
    $('[data-shipping]').on('click', function(){
        if( $('[data-shipping]:checked').length > 0 ) {
            $('#shipping-form').slideDown();
        } else {
            $('#shipping-form').slideUp();
        }
    })

    // Payment Method Select
    $('[name="payment-method"]').on('click', function(){
        var $this = $(this);
        $this.siblings('.content').slideDown().parent('.single-method').siblings('.single-method').find('.content').slideUp();
    })
    
    // Masonry
    $('.masonry-wrap').imagesLoaded( function() {
        $('.masonry-wrap').masonry({
            itemSelector: '.masonry-item',
            columnWidth: '.masonry-sizer',
            percentPosition: true
        });
    });
    
    // AjaxChimp (MailChimp)
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

    });
    function mailChimpResponse(resp) {

        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);

        } else if(resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }  
    }
    
    // Ajax Contact Form
    $(function() {
        // Get the form.
        var form = $('#contact-form');
        // Get the messages div.
        var formMessages = $('.form-messege');
        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();
            // Serialize the form data.
            var formData = $(form).serialize();
            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                // Set the message text.
                $(formMessages).text(response);
                // Clear the form.
                $('#contact-form input:not([type="submit"]),#contact-form textarea').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });
    });
    
})(jQuery);