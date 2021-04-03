/****************************************
  Template:		AppVim - App Landing Page Template
  Author:		ThemeREC
  Website:		https://www.themerec.com
  Description:	Custom JS file
*****************************************/
(function($) {
    "use strict";
    $(window).on('load', function() {
        var preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function() {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });
    /* Navbar Scripts */
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 20) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });
    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });
    /* Rotating Text - Morphtext */
    $("#js-rotating").Morphext({
        animation: "fadeIn",
        separator: ",",
        speed: 2000,
        complete: function() {}
    });
    /* Countdown Timer - The Final Countdown */
    $('#clock').countdown('2021/10/13 08:50:56')/* change here your "countdown to" date */
    .on('update.countdown', function(event) {
        var format = '<span class="counter-number">%D<br><span class="timer-text">Days</span></span><span class="counter-number">%H<br><span class="timer-text">Hours</span></span><span class="counter-number">%M<br><span class="timer-text">Minutes</span></span><span class="counter-number">%S<br><span class="timer-text">Seconds</span></span>';
        $(this).html(event.strftime(format));
    }).on('finish.countdown', function(event) {
        $(this).html('This offer has expired!').parent().addClass('disabled');
    });
    /* Card Slider - Swiper */
    /* Testimonial */
    var cardSlider = new Swiper('.card-slider',{
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 1
            }
        }
    });
    /* Image Slider - Swiper */
    /* Screenshot */
    var imageSlider = new Swiper('.image-slider',{
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            380: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            516: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30
            },
        }
    });
    /* CUSTOMER SLIDER */
    /* Image Slider 1 - Swiper */
    var imageSliderOne = new Swiper('.image-slider-1',{
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true,
        spaceBetween: 30,
        slidesPerView: 6,
        breakpoints: {
            380: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30
            },
        }
    });
    /* Text Slider - Swiper */
    var textSlider = new Swiper('.text-slider',{
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        }
    });
    /* Image Slider - Magnific Popup */
    $('.popup-link').magnificPopup({
        removalDelay: 300,
        type: 'image',
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure ' + this.st.el.attr('data-effect'));
            },
            beforeClose: function() {
                $('.mfp-figure').addClass('fadeOut');
            }
        },
        gallery: {
            enabled: true
        }
    });
    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1])
                            return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5])
                            return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });
    /* Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        /* keep it false to avoid html tag shift with margin-right: 17px */
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });
    /* Counter - CountTo */
    var a = 0;
    $(window).scroll(function() {
        if ($('#counter').length) {
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function() {
                    var $this = $(this)
                      , countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
                });
                a = 1;
            }
        }
    });
    /* Move Form Fields Label When User Types */
    $("input, textarea").keyup(function() {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });
    /* Contact Form */
    $("#contactForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            cformError();
            csubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            csubmitForm();
        }
    });
    function csubmitForm() {
        var name = $("#cname").val();
        var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var varData = "name=" + name + "&email=" + email + "&message=" + message;
        $.ajax({
            type: "POST",
            url: "../assets/php/contactform-process.php",
            data: varData,
            success: function(text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
    }
    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty');
        $("textarea").removeClass('notEmpty');
    }
    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }
    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Download Form */
    $("#downloadForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            dformError();
            dsubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            dsubmitForm();
        }
    });
    function dsubmitForm() {
        var email = $("#demail").val();
        $.ajax({
            type: "POST",
            url: "../assets/php/downloadform-process.php",
            data: "email=" + email,
            success: function(text) {
                if (text == "success") {
                    dformSuccess();
                } else {
                    dformError();
                    dsubmitMSG(false, text);
                }
            }
        });
    }
    function dformSuccess() {
        $("#downloadForm")[0].reset();
        dsubmitMSG(true, "Download Link Sent To Your Email!");
        $("input").removeClass('notEmpty');
    }
    function dformError() {
        $("#downloadForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }
    function dsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#dmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Second Download Form */
    $("#secdownloadForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            sdformError();
            sdsubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            sdsubmitForm();
        }
    });
    function sdsubmitForm() {
        var email = $("#sdemail").val();
        $.ajax({
            type: "POST",
            url: "../assets/php/downloadform-process.php",
            data: "email=" + email,
            success: function(text) {
                if (text == "success") {
                    sdformSuccess();
                } else {
                    sdformError();
                    sdsubmitMSG(false, text);
                }
            }
        });
    }
    function sdformSuccess() {
        $("#secdownloadForm")[0].reset();
        sdsubmitMSG(true, "Download Link Sent To Your Email!");
        $("input").removeClass('notEmpty');
    }
    function sdformError() {
        $("#secdownloadForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }
    function sdsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#sdmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Get Quote Form */
    $("#getQuoteForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            gformError();
            gsubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            gsubmitForm();
        }
    });
    function gsubmitForm() {
        var name = $("#gname").val();
        var email = $("#gemail").val();
        var phone = $("#gphone").val();
        var select = $("#gselect").val();
        var terms = $("#gterms").val();
        $.ajax({
            type: "POST",
            url: "../assets/php/getquoteform-process.php",
            data: "name=" + name + "&email=" + email + "&phone=" + phone + "&select=" + select + "&terms=" + terms,
            success: function(text) {
                if (text == "success") {
                    gformSuccess();
                } else {
                    gformError();
                    gsubmitMSG(false, text);
                }
            }
        });
    }
    function gformSuccess() {
        $("#getQuoteForm")[0].reset();
        gsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty');
    }
    function gformError() {
        $("#getQuoteForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }
    function gsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#gmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Back To Top Button */
    
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });
    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });
}
)(jQuery);
/* WOW JS Animation */
new WOW().init();
/* reCaptcha Validation */
var error = document.getElementById('g-recaptcha-error');
function submitUserForm() {
    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        error.innerHTML = '<span class="recaptcha-error">This field is required.</span>';
        return false;
    }
    return true;
}
function verifyCaptcha() {
    error.innerHTML = '';
}
