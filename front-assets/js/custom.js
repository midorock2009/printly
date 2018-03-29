/*console.log(navigator.userAgent);*/

! function (a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
	function i() {
		var b, c, d = {
			height: f.innerHeight,
			width: f.innerWidth
		};
		return d.height || (b = e.compatMode, (b || !a.support.boxModel) && (c = "CSS1Compat" === b ? g : e.body, d = {
			height: c.clientHeight,
			width: c.clientWidth
		})), d
	}

	function j() {
		return {
			top: f.pageYOffset || g.scrollTop || e.body.scrollTop,
			left: f.pageXOffset || g.scrollLeft || e.body.scrollLeft
		}
	}

	function k() {
		if (b.length) {
			var e = 0,
				f = a.map(b, function (a) {
					var b = a.data.selector,
						c = a.$element;
					return b ? c.find(b) : c
				});
			for (c = c || i(), d = d || j(); e < b.length; e++)
				if (a.contains(g, f[e][0])) {
					var h = a(f[e]),
						k = {
							height: h[0].offsetHeight,
							width: h[0].offsetWidth
						},
						l = h.offset(),
						m = h.data("inview");
					if (!d || !c) return;
					l.top + k.height > d.top && l.top < d.top + c.height && l.left + k.width > d.left && l.left < d.left + c.width ? m || h.data("inview", !0).trigger("inview", [!0]) : m && h.data("inview", !1).trigger("inview", [!1])
				}
		}
	}

	var c, d, h, b = [],
		e = document,
		f = window,
		g = e.documentElement;
	a.event.special.inview = {
		add: function (c) {
			b.push({
				data: c,
				$element: a(this),
				element: this
			}), !h && b.length && (h = setInterval(k, 250))
		},
		remove: function (a) {
			for (var c = 0; c < b.length; c++) {
				var d = b[c];
				if (d.element === this && d.data.guid === a.guid) {
					b.splice(c, 1);
					break
				}
			}
			b.length || (clearInterval(h), h = null)
		}
	}, a(f).on("scroll resize scrollstop", function () {
		c = d = null
	}), !g.addEventListener && g.attachEvent && g.attachEvent("onfocusin", function () {
		d = null
	})
});

$ = jQuery;

// Login Modal BEGIN
function openLoginModal() {
	var signModal = $('#sign-up-modal');
	$('#forget-modal').modal('hide');
	signModal.modal('hide');
	setTimeout(function () {
		$('#login-modal').modal();
	}, 500)
}

function openSignUpModal() {
	var loginModal = $('#login-modal');
	var forgetModal = $('#forget-modal');
	loginModal.modal('hide');
	forgetModal.modal('hide');
	setTimeout(function () {
		$('#sign-up-modal').modal();
	}, 500)
}

function openForgetModal(event) {
	event.preventDefault();
	var loginModal = $('#login-modal');
	loginModal.modal('hide');
	setTimeout(function () {
		$('#forget-modal').modal();
	}, 500)
}
// Login Modal EOF

var $init = $('#footer');
if ($init.length) {
	$init.bind('inview', function (event, isInView) {
		// var $this = $(this);
		if (isInView) {
			$('.total-price-in-footer').css('position', 'absolute');
		} else {
			$('.total-price-in-footer').css('position', 'fixed');
		}
	});
}

// jQuery(window).resize(function ($) {
//     var height = window.innerHeight;
//     jQuery('.first-screen').css('height', height);
// });

window.addEventListener("orientationchange", function () {
	var height = window.innerHeight;
	$('.first-screen').css('height', height);
}, false);

var $width = document.body.clientWidth;

$(document).ready(function () {
	// FQA Accordion BEGIN
	$('#accordion').on('hide.bs.collapse', function () {
		var panelHeader = $('.panel-header');
		var panelTitle = panelHeader.find('.panel-title');
		panelTitle.addClass('panel-title-plus');
		panelTitle.removeClass('panel-title-minus');
	});
	$('#accordion').on('shown.bs.collapse', function () {
		var panelHeader = $('#accordion .in').siblings('.panel-header');
		var panelTitle = panelHeader.find('.panel-title');
		panelTitle.addClass('panel-title-minus');
		panelTitle.removeClass('panel-title-plus');
	});
	// FAQ Accordion EOF

	// Anchor Scroll Begin
	$(".scroll-down").on("click", "a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({
			scrollTop: top
		}, 1500);
	});
	// Anchor Scroll EOF

	$('.faq-hidden-content').hide();
	$('.faq-show-hidden-content').click(function () {
		$('.faq-hidden-content').show(300);
	});

	var height = window.innerHeight;
	$('.first-screen').css('height', height);

	// Add controls to video
	if ($width <= 1024) {
		$('#styled_video').attr('controls', 'controls');
	}

	function animateLogo() {
		// var $width = document.body.clientWidth;
		var $logoParagraph = $('.first-screen-desc p');
		var $printer = $('.printer-pic img');
		var $topMenu = $('.animate-top-menu');
		var $waveOne = $('.header-wave-one');
		var $waveTwo = $('.header-wave-two');
		var $scrollDown = $('.scroll-down');
		$waveOne.animate({
			bottom: 0
		}, 4000);
		$waveTwo.animate({
			bottom: 0
		}, 4000);
		setTimeout(function () {
			$logoParagraph.animate({
				opacity: 1
			}, 4000);
		}, 700);
		setTimeout(function () {
			$topMenu.animate({
				top: '0'
			}, 2000);
			$printer.animate({
				top: '75%',
				opacity: 1
			}, 2000);
		}, 1300);
		setTimeout(function () {
			$scrollDown.animate({
				opacity: 1
			}, 1000);
		}, 2500);
	}

	animateLogo();

	// Slick Slider BEGIN
	try {
		$('.slider').slick({
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 3,
			arrows: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true
						// dots: true
					}
                },
				{
					breakpoint: 769,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
                },
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
                }
            ]
		});
		$('.slick-dots li button').html('');
	} catch (e) {}
	// Slick Slider EOF

	// Form number BEGIN
	/*$('.quantity').each(function () {
	    var spinner = jQuery(this),
	        input = spinner.find('input[type="number"]'),
	        btnUp = spinner.find('.quantity-up'),
	        btnDown = spinner.find('.quantity-down'),
	        min = input.attr('min'),
	        max = input.attr('max');

	    btnUp.click(function () {
	        // event.preventDefault();
	        var oldValue = parseFloat(input.val());
	        if (oldValue >= max) {
	            var newVal = oldValue;
	        } else {
	            var newVal = oldValue + 1;
	        }
	        spinner.find("input").val(newVal);
	        spinner.find("input").trigger("change");
	    });

	    btnDown.click(function () {
	        // event.preventDefault();
	        var oldValue = parseFloat(input.val());
	        if (oldValue <= min) {
	            var newVal = oldValue;
	        } else {
	            var newVal = oldValue - 1;
	        }
	        spinner.find("input").val(newVal);
	        spinner.find("input").trigger("change");
	    });

	});*/
	// Form number EOF

	// Document Type Tabs BEGIN
	var largeDoc = $('#large-format-tab').hide();
	var normalDoc = $('#normal-document-tab').hide();
	var presentationDoc = $('#presentation-document-tab').hide();
	for (var i = 0; i < document.getElementsByName("document-type").length; i++) {
		if (document.getElementsByName("document-type")[i].checked) {
			var el = document.getElementsByName("document-type")[i].id;
			var active = '#' + el + '-tab';
			$(active).show();
			try {
				var top = $(active).offset().top;
			} catch (e) {}
		}
	}
	$('[name=document-type]').on('change', function () {
		var largeDoc = $('#large-format-tab').hide('fast');
		var normalDoc = $('#normal-document-tab').hide('fast');
		var presentationDoc = $('#presentation-document-tab').hide('fast');
		for (var i = 0; i < document.getElementsByName("document-type").length; i++) {
			if (document.getElementsByName("document-type")[i].checked) {
				var el = document.getElementsByName("document-type")[i].id;
				var active = '#' + el + '-tab';
				$(active).show('fast');
				$('body,html').animate({
					scrollTop: top - 15
				}, 700);
			}
		}
	});
	// Document Type Tabs EOF
	// Pickup Location Tabs BEGIN
	var pickup = $('#pickup-tab').hide();
	var delivery = $('#delivery-tab').hide();
	var amarex = $('#aramex-tab').hide();
	for (var j = 0; j < document.getElementsByName("delivery-method").length; j++) {
		if (document.getElementsByName("delivery-method")[j].checked) {
			var deliveryEl = document.getElementsByName("delivery-method")[j].id;
			var deliveryActive = '#' + deliveryEl + '-tab';
			$(deliveryActive).show();
			var topPickUp = $(deliveryActive).offset().top;
		}
	}

	$('[name=delivery-method]').on('change', function () {
		var pickup = $('#pickup-tab').hide('fast');
		var delivery = $('#delivery-tab').hide('fast');
		var amarex = $('#aramex-tab').hide('fast');
		for (var i = 0; i < document.getElementsByName("delivery-method").length; i++) {
			if (document.getElementsByName("delivery-method")[i].checked) {
				var el = document.getElementsByName("delivery-method")[i].id;
				var active = '#' + el + '-tab';
				$(active).show('fast');
				$('body,html').animate({
					scrollTop: topPickUp
				}, 700);
			}
		}
	});
	// Pickup Location Tabs EOF

	//$('[data-toggle="popover"]').popover();

	$('#style_it').on('click', function () {
		$('#styled_video')[0].play();
		$('#style_it').hide();
	});
	$('#stop_style_it').on('click', function () {
		$('#styled_video')[0].pause();
		$('#style_it').show();
	});
	window.addEventListener("orientationchange", function () {
		// Выводим числовое значение ориентации
		var height = window.innerHeight;
		$('.first-screen').css('height', height);
	}, false);

	var options = {
		strings: [pyour_one_stop_printshopp],
		typeSpeed: 100
	};

	try {
		var typed = new Typed(".element", options);
	} catch (e) {}

});



