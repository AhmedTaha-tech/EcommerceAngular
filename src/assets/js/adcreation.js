var ListingFee = "";
var subTitle = "";
var Listingprice = 50;

var form = $("#example-form");
form.validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    rules: {
        confirm: {
            equalTo: "#password"
        }
    }
});
form.children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    showNav: 'left',
    onStepChanging: function (event, currentIndex, newIndex) {
        form.validate().settings.ignore = ":disabled,:hidden";

        if (currentIndex == 2) {
            var subCat = $('#subcathidden').val(); var getData;
            $.ajax
                ({
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    type: 'GET',
                    url: siteurl + '/v1/PricingAndDuration/GetAllSql?subcategory=' + subCat,
                    success: function (response) {
                        if (response.status_code == 200) {
                            ListingFee = response.data.listingFee;
                            subTitle = response.data.subtitle;
                            $('#fees1').text('SAR ' + response.data.listingFee);
                            $('#fees2').text('SAR ' + response.data);
                            $('#total1').text('SAR ' + response.data);
                            Listingprice = response.data.listingFee;
                            $("#Listingprice").text(Listingprice);
                            $(".Listing_fee").text('SAR ' + Listingprice);
                        }
                        else {
                        }
                    },
                    error: function () {
                    }
                });
        }

        if (currentIndex == 3) {
            var subCat = $('#subcathidden').val(); var getData;
            $.ajax
                ({
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    type: 'GET',
                    url: siteurl + '/v1/PricingAndDuration/GetAllSql?subcategory=' + subCat,
                    success: function (data) {
                        if (data.status_code == 200) {
                            $('#gallery').text('SAR ' + data.data.gallery);
                            $('#Radgallery').val(data.data.gallery);

                            $('#featureCombo').text('SAR ' + data.data.featureCombo);
                            $('#feature').val(data.data.featureCombo);

                            $('#featureSuperCombo').text('SAR ' + data.data.featureSuperCombo);
                            $('#super-feature').val(data.data.featureSuperCombo);


                            $('#goodPosition').text('SAR ' + data.data.goodPosition);
                            $('#super-feature-combo').val(data.data.goodPosition);
                        }
                        else {
                        }
                    },
                    error: function () {
                    }
                });
        }
        if (currentIndex == 4) {


            $('#total_price_inc').text($('input:radio[name=pack4]:checked').val()); //feature Price
            var totalfee = parseFloat($('input:radio[name=pack4]:checked').val()) + parseFloat(ListingFee);
            $('#totalAdfee').text(totalfee);
            $('#subTitlefee').text(subTitle);
            $('#featureFees').text($('input:radio[name=pack4]:checked').val());
            $('#TotalInclusive').text(totalfee);
        }

        $('.selectedcat').html($('#Category').val());
        $('#Quantity-review').html($('#Quantity').val());
        $('#selectedphone').html($('#phone-number-field').val());
        $("select#country").find(':selected').text();
        //$('#selectedcountry').html($('.crs-country').val());
        $('#selectedregion').html($('#four').val());
        $('#selectedcity').html($('#city-field').val());
        $('#selectedpdt').html($('#datetimepicker').val());
        $('#selectededt').html($('#datetimepicker').val());
        $('#selectedpublishstatus').html($('[name=publishtype]').val());

        $('#Buynow-review').html($('#price').val());
     
        var isbankpaid = $("#isbankpaid").prop("checked");
        if (isbankpaid == true) {
            
            $('#BankFieldsTable').show();
            if ($("#BankAccountTitleId").val() != "") {
                $('#BankFieldsDiv').show();
                $('#BankAccountTitleViewId').html($('#BankAccountTitleId').val());
                $('#BankNameViewId').html($('#BankNameId').val());
                $('#BankAccountNoViewId').html($('#BankAccountNoId').val());
                $('#BankAccountIBNNumberViewId').html($('#BankAccountIBNNumberId').val());
            }
            else {
                $('#BankFieldsDiv').hide();
                $('#BankAccountTitleViewId').html('');
                $('#BankNameViewId').html('');
                $('#BankAccountNoViewId').html('');
                $('#BankAccountIBNNumberViewId').html('');
            }
            if ($("#EditUserBankAccount_ID").val() != 0) {
                $('#EditBankFieldsDiv').show();
                $('#EditBankAccountTitleViewId').html($('#EditBankAccountTitleId').val());
                $('#EditBankNameViewId').html($('#EditBankNameId').val());
                $('#EditBankAccountNoViewId').html($('#EditBankAccountNoId').val());
                $('#EditBankAccountIBNNumberViewId').html($('#EditBankAccountIBNNumberId').val());
            }
            else {
                $('#EditBankFieldsDiv').hide();
                $('#EditBankAccountTitleViewId').html('');
                $('#EditBankNameViewId').html('');
                $('#EditBankAccountNoViewId').html('');
                $('#EditBankAccountIBNNumberViewId').html('');
            }
        }
        else {
            $('#BankFieldsTable').hide();
        }
        return form.valid();
    },
    onStepChanged: function (event, currentIndex, priorIndex) {

    },
    onFinishing: function (event, currentIndex) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex) {

        $('#addcreationpop').modal({
            show: true,
            keyboard: false,
            backdrop: 'static',

        });
        $(window).scrollTop(0);
        for (var i = 0; i < imagesArray.length; i++) {
            if (imagesArray[i] === String($(".get-img-url img").attr('src'))) {
                imagesArray.splice(i, 1);
            }
        }
        imagesArray.splice(0, 0, String($(".get-img-url img").attr('src')));
        imagesArray = imagesArray.filter(function (element) {
            return element !== "undefined";
        });
        result1['images'] = imagesArray;
        $.each($('#example-form').serializeArray(), function () {
            if (this.name == 'Country') {
                result1[this.name] = $("select#country").find(':selected').text();
            }
            else if (this.name == 'Region') {
                result1[this.name] = $("select#region").find(':selected').text();

            }
            else {
                result1[this.name] = this.value;
            }
        });

        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: siteurl + '/v1/CarTemplate/Create',
            data: JSON.stringify(result1),
            success: function (response) {
                if (response.status_code == 200) {
                    $('#addcreationpop').modal('hide');
                    document.getElementById("example-form").reset();
                    $(".error-messages").css("display", "none");
                    $(".success-messages").css("display", "block");
                    $(".success-messages").text("Your Listing Has Been Created Successfully");
                    $(".close-success-message").css("display", "block")
                    setTimeout(function () {
                        $(".success-messages").slideToggle(500);
                        $(".close-success-message").hide();
                    }, 5000);

                    window.location.href = "/Advertisement/Detail?id=" + response.data + "&template=" + $('[name="Template"]').val();
                }
                else {
                    $('#addcreationpop').modal('hide');
                    $(".success-messages").css("display", "none");
                    $(".error-messages").css("display", "block");
                    $(".error-messages").text("Failed");
                    $(".close-error-message").css("display", "block")
                    setTimeout(function () {
                        $(".error-messages").slideToggle(500);
                        $(".close-error-message").hide();
                    }, 5000);
                }

            },
            error: function () {
                $('#addcreationpop').modal('hide');
                $(".success-messages").css("display", "none");
                $(".error-messages").css("display", "block");
                $(".error-messages").text("Failed");
                $(".close-error-message").css("display", "block")
                setTimeout(function () {
                    $(".error-messages").slideToggle(500);
                    $(".close-error-message").hide();
                }, 5000);
            }

        });
    }
});

$('.package-box input[type="radio"]').click(function () {
    $(".package-box").removeClass("active");
    $(this).parent().parent().parent().addClass("active");
    $('.package-box input[type="radio"]').attr('checked', false);
    $(this, '.package-box input[type="radio"]').attr('checked', true);
    $('input.package-btn').not(this).prop('checked', false);
});

$('.package-detail-view .short-desc .package-checkbox input[type="radio"]').click(function () {
    $(".package-box").removeClass("active");
    $('.package-box input[type="radio"]').attr('checked', false);
    $(this, '.package-box input[type="radio"]').attr('checked', true);
});




$(document).ready(function () {

    var isChecked = $('input[value="fixed_length"').is(':checked');
    if (isChecked == true) {
        $('input[value="fixed_length"').parent().parent().addClass("duration_info");

    }

    $(".more-cat-visible ").click(function () {
        $("#show-category-btn").slideToggle();
        $(".radiobtn").prop('checked', false);
        $(".cat-suggestdiv").slideToggle();
    });

    if ($("body").hasClass("arabic")) {
        $(".actions ul li:nth-child(2) a").html("التالى");
        $(".actions ul li:first-child a").html("السابق");
        $(".actions ul li:nth-child(3) a").html("إنهاء");
    }
    else {
        $(".actions ul li:nth-child(2) a").html("Next");
        $(".actions ul li:first-child a").html("Previous");
        $(".actions ul li:nth-child(3) a").html("Finish");
    }

    $(".actions .pagination-li:nth-child(2) a").addClass("disable-btn");
    $(".disable-btn").css("pointer-events", "none");
    $("#Category").change(function () {
        $(".disable-btn").css("pointer-events", "");
        $(".disable-btn").removeClass();
    });

    $('#example-form>div').filter(function () {
        return !this.id && !this.className;
    }).addClass("noclassdiv");
    $(".noclassdiv").css('display', 'none');



    $('#cat-description-field').on('change', function () {
        var listdescription = $(this).val()
        $("p#item-description").text(listdescription);
    });

    $("input#shipping-cost-description").on('change', function () {
        var shippingdesc = $(this).val();
        $("p.shippingdescription").text(shippingdesc);
    });

    $("input#shipping-cost-field").on('change', function () {
        var shippingcost = $(this).val();
        $("p.shippingcost").text(shippingcost);
    });

    $("input[name='fixLength']").change(function () {
        var radioValue = $("input[name='fixLength']:checked").val();
        if (radioValue == "fixed_length") {
            $("fieldset#sss").removeClass("duration_info");
            $(this).parent().parent().addClass("duration_info");
        } else if (radioValue == "end_time") {
            $("fieldset#sss").removeClass("duration_info");
            $(this).parent().parent().addClass("duration_info");
        } else {
            return;
        }

    });

    var listingdetail = [];
    $(".paginaion-wrapper ul li:nth-child(2) a").click(function () {
        var images_url = $(imagesArray);
        $("#other_images_listing").html('')
        $.each(images_url, function (key, value) {
            $.each(value, function (key1, value1) {
                $("#other_images_listing").append('<li class="list-inline-item"><img src="' + value1 + '"></li>');
            });

        });
        var package_value = $("input[name='pack4']:checked").val();
        $("#package_name").text(package_value);

        var price = $(".feature-price").text();
        $("#total_price_inc").text(price);
        $(".selected_total_price_inc").text(price);

        // console.log($(".feature-price").text());

        var res = price.substring(3);
        var totalPrice = parseFloat(Listingprice) + parseFloat(res);
        //console.log("price : " + price + " res : " + res + " total Price : " + totalPrice + "Listing Price : " + Listingprice);
        // $("#totalAdfee").text(totalPrice);
        $(".totalfeeInclusive_of_VAT").text('SAR ' + totalPrice);

        var selectedshippingoption = $("input[name='shipping-option']:checked").val();

        if (selectedshippingoption == "shipping within Saudia") {
            $("p#duration-review").text(selectedshippingoption);
        } else if (selectedshippingoption == "shipping not available") {
            $("p#duration-review").text(selectedshippingoption);
        } else if (selectedshippingoption == "To be arranged") {
            $("p#duration-review").text(selectedshippingoption);
        } else if (selectedshippingoption == "Specific Shipping Cost") {
            var ship_cost_desc = $("input[name='cost-desc']");
            var ship_cost_amount = $("input[name='cost-amount']");
            $(".costing_desc").html('');

            for (var i = 0; i < ship_cost_desc.length; i++) {
                $(".costing_desc").append('<p id="duration-review">"' + $(ship_cost_amount[i]).val() + 'SAR --  ' + $(ship_cost_desc[i]).val() + '"</p>');

            }
        }

        var Fixedlength = $(".duration_info select option:selected").text();
        $("p#durationnn").text(Fixedlength);

        var Fixedlength = $(".duration_info input.datepicker-here").val();
        $("p#durationnn").text(Fixedlength);

        var timing = $(".duration_info input.timepicker").val();
        $("p#Timing_info").text(timing);

        jQuery('input[name="sa_bank_pm"]').change(function () {
            if ($(this).prop('checked')) {
                var bankdepo = $(this).val(); //checked
                $("#ban-deposite").text(bankdepo);
            }
            else {
                return;
            }
        });

        jQuery('input[name="cash_pm"]').change(function () {
            if ($(this).prop('checked')) {
                var cashpm = $(this).val(); //checked
                $("#cash-payment").text(cashpm);
            }
            else {
                return;
            }
        });

        $("p#pickup-review").text('Non');
        var pickup = $("input[name='pickup-option']:checked").val();
        $("p#pickup-review").text(pickup);

        $(".selectedtitle").text('None');
        var get_title = $("input#recheck-title-field").val();
        $(".selectedtitle").text(get_title);

        $("p#selectedcountry").text('Non')
        var country = $("select#country").find(':selected').html();
        //var c1 = $("#country").find(':selected').html();
        $("p#selectedcountry").text(country);

        $("p#selectedregion").text('Non')
        var region = $("select#region").val();
        $("p#selectedregion").text(region);

        $("p#selectedcity").text('Non')
        var city = $("select#city-field").val();
        $("p#selectedcity").text(city);



        $(".selected-cat-listing").text('')
        var cat_listing = $("#catdata li").text();
        $(".selected-cat-listing").text(cat_listing);

        $(".pricing_and_payment_data_confirmation").html('');
        var mainfieldset = $("fieldset#main-field").serializeArray();

        var user = $.cookie('name');
        $(".pricing_and_payment_data_confirmation").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4> Title </h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + get_title + '</p> </div> </div> </div>');
        $(".pricing_and_payment_data_confirmation").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4> User </h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + user + ' </p> </div> </div> </div>');
        $(".pricing_and_payment_data_confirmation").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4> Country </h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + country + '</p> </div> </div> </div>');
        $(".pricing_and_payment_data_confirmation").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4> Region </h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + region + '</p> </div> </div> </div>');
        $(".pricing_and_payment_data_confirmation").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4> City </h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + city + '</p> </div> </div> </div>');

        /*$.each(mainfieldset, function (k, v) {
            if (v.value == "") {
                return;
            }
            $(".pricing_and_payment_data_confirmation").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4>' + v.name + '</h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + v.value + '</p> </div> </div> </div>');

        });*/

        listingdetail = $("fieldset").serializeArray();
        $(".Listing-details-data").html(' ');
        $(".Listing-details-data-second").html(' ');
        $.each(listingdetail, function (k, v) {
            /*  console.log(v.name + ": " + v.value);*/
            //$(".Listing-details-data").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4>' + v.name + '</h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + v.value + '</p> </div> </div> </div>');
        });

        //var img = document.getElementById('image-upload-1');
        //var main_img = img.getAttribute('src'); // foo.jpg
        ////alert(img.src);
        //document.getElementById('mainimg')
        //    .setAttribute(
        //        'src', main_img
        //);

        //document.getElementById('prvAdImg')
        //    .setAttribute('src', main_img
        //    );

        var keys = new Array();
        var values = new Array();
        $(".fieldset-2-section label").each(function (index) {
            // alert("INDEX "+index);
            keys.push($(this).html());
        });
        $(".fieldset-2-section .form-control").each(function (index) {
            //  alert("INDEX "+index);
            values.push($(this).val());
            //console.log($(this).val());
        });
        //console.log(keys);
        //console.log(values);
        var result = keys.reduce(function (result, field, index) {
            result[values[index]] = field;
            return result;
        }, {})
        $.each(result, function (key, value) {
            if (key == "") {
                return;
            }
            $(".Listing-details-data").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4>' + value + '</h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + key + '</p> </div> </div> </div>');

        });

        //second column

        var fieldkeys = new Array();
        var fieldvalues = new Array();
        $(".fieldset-1-section label").each(function (index) {
            // alert("INDEX "+index);
            fieldkeys.push($(this).html());
        });
        $(".fieldset-1-section .form-control").each(function (index) {
            //  alert("INDEX "+index);
            fieldvalues.push($(this).val());
            //console.log($(this).val());
        });
        //console.log(fieldkeys);
        //console.log(fieldvalues);
        var result = fieldkeys.reduce(function (result, field, index) {
            result[fieldvalues[index]] = field;
            return result;
        }, {})

        $.each(result, function (keys, values) {
            if (keys == "") {
                return;
            }
            $(".Listing-details-data-second").append('<div class="row"> <div class="col-md-3"> <div class="title-wrapper"> <h4>' + values + '</h4> </div> </div> <div class="col-md-9"> <div class="user-selection"> <p>' + keys + '</p> </div> </div> </div>');

        });

        // var map = {};
    });

});
$(window).on('load', function () {

    $('input[name="featureexpirydate"]').datepicker({});
    $('input[name="urgentexpirydate"]').datepicker({});
    $('input[name="highlightexpirydate"]').datepicker({});
    $("input[name='featureexpirydate']").attr("data-language", "en");
    $("input[name='urgentexpirydate']").attr("data-language", "en");
    $("input[name='highlightexpirydate']").attr("data-language", "en");


    $("input[name='featureexpirydate']").addClass("datepicker-here");
    $("input[name='urgentexpirydate']").addClass("datepicker-here");
    $("input[name='highlightexpirydate']").addClass("datepicker-here");

    window.setInterval(function () {
        $('#example-form>div').filter(function () {
            return !this.id && !this.className;
        }).addClass("noclassdiv");
        $(".noclassdiv").css('display', 'none');
    }, 100);

});


$(document).ready(function () {
    setTimeout(function () {

        $('input[name="featureexpirydate"]').datepicker({
            language: 'en',
        });
        $('input[name="urgentexpirydate"]').datepicker({
            language: 'en',
        });
        $('input[name="highlightexpirydate"]').datepicker({
            language: 'en',
        });

        $("input[name='featureexpirydate']").attr("data-language", "en");
        $("input[name='urgentexpirydate']").attr("data-language", "en");
        $("input[name='highlightexpirydate']").attr("data-language", "en");


        //$('#search-category .main-wrapper-fields').append($('.noclassdiv fieldset'));
        $('.fieldset-1-section').append($('.fielsset1'));
        $('.fieldset-2-section').append($('.fielsset2'));
        $('.fieldset-3-section').append($('.fielsset3'));

        $("input[name='featureexpirydate']").addClass("datepicker-here");
        $("input[name='urgentexpirydate']").addClass("datepicker-here");
        $("input[name='highlightexpirydate']").addClass("datepicker-here");


        $(" fieldset.nf>.form-group").wrapInner($("<div />", {
            "class": "row"
        }));
        $("fieldset.nf>.form-group label").wrap($("<div />", {
            "class": "col-12 col-sm-12 col-md-12"
        }));
        $("fieldset.nf>.form-group .controls").wrap($("<div />", {
            "class": "col-12 col-sm-12 col-md-12"
        }));
        $("fieldset.nf>.form-group>.row").wrap($("<div />", {
            "class": "listing-detail-wrappper"
        }));
        $("fieldset.nf>.form-group input").wrap($("<div />", {
            "class": "list-detail-field-wrapper"
        }));
        $("fieldset.nf>.form-group textarea").wrap($("<div />", {
            "class": "list-detail-field-wrapper"
        }));
        $("fieldset.nf>.form-group select").wrap($("<div />", {
            "class": "list-detail-field-wrapper"
        }));
    }, 1000);
});

jQuery('#super-feature').click();


var isChecked = $('#super-feature').prop('checked');
if (isChecked == true) {
    $(".package-design-preview-wrapper").addClass("full-width-ad");
}

var sp_checkBox = document.getElementById("super-feature");
var spc_checkBox = document.getElementById("super-feature-combo");
var f_checkBox = document.getElementById("feature");
var g_checkBox = document.getElementById("gallery");
var bcheckBox = document.getElementById("basic");

$(".package-btn").click(function () {
    if (sp_checkBox.checked == true) {
        $(".package-design-preview-wrapper").attr('class', 'package-design-preview-wrapper');
        $(".package-design-preview-wrapper").addClass("full-width-ad");

    }
    else if (spc_checkBox.checked == true) {
        $(".package-design-preview-wrapper").attr('class', 'package-design-preview-wrapper');
        $(".package-design-preview-wrapper").addClass("super-feature-combo-ad");
    }
    else if (f_checkBox.checked == true) {
        $(".package-design-preview-wrapper").attr('class', 'package-design-preview-wrapper');
        $(".package-design-preview-wrapper").addClass("feature-ad");
    }
    else if (g_checkBox.checked == true) {
        $(".package-design-preview-wrapper").attr('class', 'package-design-preview-wrapper');
        $(".package-design-preview-wrapper").addClass("gallery-ad");
    }
    else if (bcheckBox.checked == true) {
        $(".package-design-preview-wrapper").attr('class', 'package-design-preview-wrapper');
        $(".package-design-preview-wrapper").addClass("basic-ad");
    }
});
