﻿$(window).ready(function () {
	$(".loader").fadeOut("slow");
});

$(document).ready(function () {

	if ($("body").hasClass("arabic")) {
		$("#initialuser").attr("Value", "الخطوة التالية");
	}
	


	var count = 1;
	setInterval(function () {
		count = ($(".slideshow :nth-child(" + count + ")").fadeOut().next().length == 0) ? 1 : count + 1;
		$(".slideshow :nth-child(" + count + ")").fadeIn(2000);
	}, 5000);

	//$('#select_language').on('change', function () {
	//	$("body").removeClass();
	//	var languageclass = this.value;
	//	$("body").addClass(languageclass);
	//	if ($("body").hasClass("arabic")) {
	//		$(".right-side-section-area").addClass("arabic-v");
	//	} else if ($("body").hasClass("English")) {
	//		$(".right-side-section-area").removeClass("arabic-v");
	//	}
	//});

});
function Notifications(message, type) {
	if (type === "error") {
		$(".success-messages").css("display", "none");
		$(".error-messages").css("display", "block");
		$(".error-messages").html("<p>"+message+"</p>");
		$(".close-error-message").css("display", "block");
		setTimeout(function () {
			$(".error-messages").slideToggle(500);
			$(".error-messages").hide();
			$(".close-error-message").hide();
		}, 3000);
	}
	else {
		$(".error-messages").css("display", "none");
		$(".success-messages").css("display", "block");
		$(".success-messages").html("<p>" + message+ "</p>");
		$(".close-success-message").css("display", "block");
		setTimeout(function () {
			$(".success-messages").slideToggle(500);
			$(".close-success-message").hide();
		}, 3000);

	}
}
function myFunction() {
	var x = document.getElementById("password");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

function myFunctioncf() {
	var x = document.getElementById("cfmpassword");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

$().ready(function () {
	// validate signup form on keyup and submit
	$("#login-form").validate();
})

$(document).ready(function () {
	//$(".sub_btn").click(function(){
	// $(".error-messages").css("display","block");
	//  $(".error-messages").append("The Email and Password you entered is incorrect or somwthing went wrong");
	//});
	//$(".sub_btn").click(function(){
	// $(".success-messages").css("display","block");
	//  $(".success-messages").append("Login Successful");
	//});
});

$(document).ready(function () {
	$(".close-error-message").click(function () {
		$(".error-messages").slideToggle();
	});
	$(".close-success-message").click(function () {
		$(".success-messages").slideToggle();

	});
});



$(document).ready(function () {



	//$(".next").click(function(){

	//current_fs = $(this).parent();
	//next_fs = $(this).parent().next();

	//Add Class Active
	//$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	//next_fs.show();
	//hide the current fieldset with style
	//current_fs.animate({opacity: 0}, {
	//step: function(now) {
	// for making fielset appear animation
	//opacity = 1 - now;

	//current_fs.css({
	//'display': 'none',
	//'position': 'relative'
	//});
	//next_fs.css({'opacity': opacity});
	//},
	//duration: 600
	//});
	//});

	//$(".previous").click(function(){

	//current_fs = $(this).parent();
	//previous_fs = $(this).parent().prev();

	////Remove class active
	//$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	////show the previous fieldset
	//previous_fs.show();

	////hide the current fieldset with style
	//current_fs.animate({opacity: 0}, {
	//step: function(now) {
	//// for making fielset appear animation
	//opacity = 1 - now;

	//current_fs.css({
	//'display': 'none',
	//'position': 'relative'
	//});
	//previous_fs.css({'opacity': opacity});
	//},
	//duration: 600
	//});
	//});

	$('.radio-group .radio').click(function () {
		$(this).parent().find('.radio').removeClass('selected');
		$(this).addClass('selected');
	});



});


var input = document.querySelector("#phone");
var input2 = document.querySelector(".phonefield");
window.intlTelInput(input, {
	initialCountry: 'sa',
	onlyCountries: ["ae", "sa", "bh", "KW", "OM"],
	separateDialCode: true,
	utilsScript: "../assets/js/utils.js",
});
window.intlTelInput(input2, {
	initialCountry: 'sa',
	onlyCountries: ["ae", "sa", "bh", "KW", "OM"],
	separateDialCode: true,
	utilsScript: "../assets/js/utils.js",
});

$("#verify_code").keyup(function () {
	var bla = $('#verify_code').val();
	if (bla == 12345) {
		$(".code_success").css("display", "block")
	} else {
		$(".code_success").css("display", "none")
	};
});






$(document).ready(function () {
	$.dobPicker({
		daySelector: '#dobday', /* Required */
		monthSelector: '#dobmonth', /* Required */
		yearSelector: '#dobyear', /* Required */
		dayDefault: 'Day', /* Optional */
		monthDefault: 'Month', /* Optional */
		yearDefault: 'Year', /* Optional */
		minimumAge: 18, /* Optional */
		maximumAge: 100 /* Optional */
	});

	
});



