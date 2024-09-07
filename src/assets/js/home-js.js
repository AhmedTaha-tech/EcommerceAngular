function owlcarousal(rtltype) {
	$('.feature-motors').owlCarousel({
		loop: false,
		margin: 0,
		nav: true,
		rtl: rtltype,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 6
			}
		}
	});

	$('.watchlist-slider').owlCarousel({
		rtl: rtltype,
		loop: false,
		margin: 5,
		nav: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
	});

	$('.category-slide-wrapper-home').owlCarousel({
		rtl: rtltype,
		loop: false,
		margin: 15,
		dots: false,
		nav: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			1000: {
				items: 7
			}
		}
	});
}






	


	
	function createOptions(number) {
  var options = [], _options;

  for (var i = 0; i < number; i++) {
    var option = '<option value="' + i + '">Option ' + i + '</option>';
    options.push(option);
  }

  _options = options.join('');
  $('#number2')[0].innerHTML = _options;
}

$(".watchlist-btn").click(function () {
	//$(".watchlist-btn span.selected").css("transform", "scale(1)");
	$(this).children('span').toggleClass('selected');
	$(this).children('span').toggleClass('animateselected');
});