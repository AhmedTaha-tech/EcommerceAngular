$(".date-of-birth-picker").flatpickr({
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: new Date(),
});
//I added event handler for the file upload control to access the files properties.
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    //add javascript handlers for the file upload event
    document.querySelector("#files").addEventListener("change", handleFileSelect, false);
}
function addInput(divName, cost_field_wrapper) {
    debugger;
    var newdiv = document.createElement('div');
    newdiv.setAttribute('style', "position:relative");
    newdiv.innerHTML = document.getElementById(divName).innerHTML;
    document.getElementById(cost_field_wrapper).appendChild(newdiv);
    newdiv.insertAdjacentHTML('beforeend', '<div id="deleterow">Delete</div>');
    $("div#deleterow").click(function () {
        $(this).parent().remove();
    });
}

$("#catdata").append(' <li class="list-inline-item selectedcat"></li>');
if ('@ViewBag.v' == 'ar') {
    $("body").addClass('arabic');
    if ($("body").hasClass("arabic")) {
        document.write('<script src="../assets/js/localization/messages_ar.js"></sc' + 'ript>');
        $(".wizard > .steps > ul > li").css("float", "right");
        $(".wizard > .actions > ul > li").css("float", "right");
        $(".wizard > .steps .current-info, .tabcontrol > .steps .current-info, .wizard > .content > .title, .tabcontrol > .content > .title").css("left", "0");
        $(".wizard > .steps .current-info, .tabcontrol > .steps .current-info, .wizard > .content > .title, .tabcontrol > .content > .title").css("opacity", "0");

    }
    else if ($("body").hasClass("English")) {

        $(".wizard > .steps > ul > li").css("float", "left");
        $(".wizard > .actions > ul > li").css("left", "0");
        $(".wizard > .steps .current-info, .tabcontrol > .steps .current-info, .wizard > .content > .title, .tabcontrol > .content > .title").css("left", "-999em");
        $(".wizard > .steps .current-info, .tabcontrol > .steps .current-info, .wizard > .content > .title, .tabcontrol > .content > .title").css("opacity", "0");
    }
}

var cat = '@ViewBag.cat-@ViewBag.v';

var FinalSubCat = '';
var dd = [];
var subCatLOne = '';
var subCatLTwo = '';
var subCatLThree = '';
var subCatLFour = '';
var subCatLFive = '';
var subCatLSix = '';
var subCat = '';
var breadcrums = '';
var subCat;
var selectedSubCategoryLevel;
var selectedCategoryData;

var CountryOptions = '';
function GetCity(name) {
    $.ajax({
        headers: requestHeaders(),
        type: 'GET',

        url: eCommerceAPIUrl + '/api/v1/ListNeighborhoodByRegionIdDDL?regionsIds=' + name,
        success: function (data) {

            var CityOptions = data;
            if (data.length != 0) {

                var options = '';
                $.each(CityOptions.data, function (index, value) {
                    options += '<option value="' + value.id + '">' + value.name + '</option>';

                });


                $('#city-field').append(options);
            }
            else {

            }

        },
        error: function () {
        }

    });
}
function GetRegion(name) {
    $.ajax({
        headers: requestHeaders(),
        type: 'GET',
        url: eCommerceAPIUrl + '/api/v1/ListRegionsByCountryIdDDL?countriesIds=' + name,
        success: function (data) {
            CountryOptions = data;
            if (data.length != 0) {

                var options = '';
                $.each(CountryOptions.data, function (index, value) {
                    options += '<option value="' + value.id + '">' + value.name + '</option>';

                });
                $('#region').append(options);
            }
            else {

            }

        },
        error: function () {


        }

    });
}

$("#country").change(function () {
    $("#city-field").empty();
    $("#region").empty();
    GetRegion(this.value);
    var delayInMilliseconds = 800; //1 second

    setTimeout(function () {
        if ($("#region").val != null) {
            $("#city-field").empty();
            var c = $("#region").val();
            GetCity(c);
        }
    }, delayInMilliseconds);
});
$("#region").change(function () {
    $("#city-field").empty();
    GetCity(this.value);
});

var index = [];
// Array starts with 0 but the id start with 0 so push a dummy value
index.push(0);
// Push 1 at index 1 since one child element is already created
index.push(1)
function AppendDataInCheckout(from, to) {
    var data = $(from).val();
    $(to).text(data);
}
function AppendPic() {
    var data = $('input[name="mainPic"]:checked').val();
    $('#prvAdImg').html("<img src=" + data + " />");
    $('#PackImage').attr('src', '' + data + '');
}

function AppendDataInCheckoutDropDown(from, to) {
    var data = $(from).text();
    $(to).text(data);
}

function CheckOutAdditionalPakat() {
    var PackID = $("input[type='radio'][name='PackagesID']:checked").val();

    var formdata = { pakatId: PackID, categoryId: selectedCategoryData.id };

    $.ajax({
        headers: requestHeaders(),
        type: 'GET',
        dataType: 'json',
        data: formdata,
        url: basicAPI + 'v1/CheckOutAdditionalPakat',
        success: function (response) {

            if (response.data) {
                var data = response.data;
                $('#subTotal').text(data.totalPriceBeforeCoupon);
                $('#subTotal').val(data.totalPriceBeforeCoupon);
                $('#totalpriceid').text(data.totalPriceAfterCoupon);
                $('#totalpriceafter').val(data.totalPriceAfterCoupon);
                $('#packagePrice').text(data.pakatPrice);
                $('#packetPriceee').val(data.pakatPrice);
                $('#productPublishPrice').text(data.productPublishPrice);
                $('#productPublishPrice').val(data.productPublishPrice);

                $('#EnableFixedPriceSaleFee').text(data.enableFixedPriceSaleFee);
                $('#EnableAuctionFee').val(data.enableAuctionFee);
                $('#EnableNegotiationFee').val(data.enableNegotiationFee);
            }
        },
        error: function (response) {

        }

    });
}


function AppendToggleData(from, to) {
    var data = $(from).val();
    var IsAuction = selectedCategoryData.enableAuctionFee && $('#Auction').prop('checked');
    var withFixed = selectedCategoryData.enableFixedPriceSaleFee && $('#fixed-price-sale').prop('checked');
    var isNegotiable = selectedCategoryData.enableNegotiationFee && $('#price-is-negotiable').prop('checked');

    if (to === '#isnegotiable') {

        if (isNegotiable == true) {
            $('.priceisnegotiable').css("display", "block");
            $('#isnegotiable').empty();
            $('#isnegotiable').append('<img src="assets/images/checkoutPage/check.svg">');
        } else {
            $('.priceisnegotiable').css("display", "none");
        }
    }
    if (to === '#fixed-price') {
        if (withFixed == true) {
            $('#fixed-price').empty();
            $('#fixed-price').append('<img src="assets/images/checkoutPage/check.svg">');
        }
    }
    if (to === '#auctionvalue') {
        if (IsAuction == true) {
            $('#auctionvalue').empty();
            $('#auctionvalue').append('<img src="assets/images/checkoutPage/check.svg">');
        }
    }

}
function AppendToggleShippingPickupInCheckout() {
    var shippingId = $("input[type='radio'][name='filter-toggle Shipping-Options']:checked").val();

    if (shippingId == 4) {
        $('.integrateShipping').show();
        $('.freeShipping').hide();
        $('.arrangement').hide();
    }
    if (shippingId == 5) {
        $('.integrateShipping').hide();
        $('.arrangement').hide();
        $('.freeShipping').show();
    }
    if (shippingId == 6) {
        $('.integrateShipping').hide();
        $('.freeShipping').hide();
        $('.arrangement').show();
    }
    var pickUpId = $("input[type='radio'][name='filter-toggle PickUps']:checked").val();

    if (pickUpId == 1) {
        $('.MustPickup').show();
        $('.NoPickup').hide();
        $('.PickupAvailable').hide();
    }
    if (pickUpId == 2) {
        $('.MustPickup').hide();
        $('.NoPickup').show();
        $('.PickupAvailable').hide();
    }
    if (pickUpId == 3) {
        $('.PickupAvailable').show();
        $('.MustPickup').hide();
        $('.NoPickup').hide();
    }

}

$('#canceladdid').click(function () {
    document.location = '@Url.Action("Index","Advertisement")';
});


function AppendPriceInCheckout(from, to) {
    var data = $(from).val();
    $(to).text(data + ' S.R');
}

function AppendAddtionalPriceInCheckout(from, to) {
    var IsAuction = selectedCategoryData.enableAuctionFee && $('#Auction').prop('checked');
    var withFixed = selectedCategoryData.enableFixedPriceSaleFee && $('#fixed-price-sale').prop('checked');
    var isNegotiable = selectedCategoryData.enableNegotiationFee && $('#price-is-negotiable').prop('checked');

    if (from > 0) {
        $(to).text(from + ' S.R');
        if (to == '#EnableFixedPriceSaleFee') {
            if (withFixed == true) {
                $('.FixedPriceSaleFee').css('display', 'block');
            }
            else {
                $('.FixedPriceSaleFee').css('display', 'none');
            }
        }
        if (to == '#EnableAuctionFee') {
            if (IsAuction == true) {
                $('.AuctionFee').css('display', 'block');
            } else {
                $('.AuctionFee').css('display', 'none');
            }
        }
        if (to == '#EnableNegotiationFee') {

            if (isNegotiable == true) {
                $('.NegotiationFee').css('display', 'block');
            }
            else {
                $('.NegotiationFee').css("display", "none");
            }

        }
        if (to == '#productPublishPrice') {
            $('.publishPrice').css('display', 'block');
        }
        if (to == '#ExtraProductVidoeFee') {
            $('.extraVidoeFee').css('display', 'block');
        }
        if (to == '#ExtraProductImageFee') {
            $('.extraImageFee').css('display', 'block');
        }
        if (to == '#SubTitleFee') {
            $('.subTitleFee').css('display', 'block');
        }
        if (to == '#packetPriceee') {
            $('.packetPrice').css('display', 'block');
            $('#packagePrice').text(from + ' S.R');
        }

    }
}

function AppendQuantityInCheckout(from, to) {
    var data = $(from).val();
    $(to).text(data);
}

function AppendCinditionInCheckout(from) {
    debugger;
    var data = $(from).val();
    if (data === '') {
        $('#conditionid').text('New');

    }
}

function BackCollapse() {
    debugger;

    $('#col2').css('display', 'none');
    //$('#packagesnextbtn').css('display', 'none');
    $('#col1').css('display', 'block');
    $('#SubmitEdit').css('display', 'block');
}

// Need check
$('.form-wizard.custom-wizard-form fieldset:first').fadeIn('slow');
// Need check
$('.form-wizard.custom-wizard-form .btn-previous').on('click', function () {
    debugger;
    var current_active_step = $(this).parents('.form-wizard.custom-wizard-form').find('.form-wizard-step.active');
    $(this).parents('fieldset').fadeOut(400, function () {
        // current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
        $(this).prev().fadeIn();
    });
    var header_height = $("header").innerHeight();
    scroll({
        top: header_height,
        left: 0,
        behavior: 'smooth'
    });
});

const filterItems = document.querySelectorAll('.filter__item_checkbox');
filterItems.forEach(filter => filter.addEventListener('change', () => filter.classList.toggle('filter__item_is-active')));

$(".upload-image-main-wrapper input[type='radio']").click(function () {
    debugger;
    var dataId = $(this).attr("id");
    $(".upload-image-main-wrapper label.main-images-mark").removeClass("main-theme-color");
    $("label.main-images-mark[for=" + dataId + "]").addClass("main-theme-color");
});

$('#SA-bank').change(function () {
    if ($(this).is(':checked')) {
        //$("#VM-card").prop("checked", false);
        //$(".cash-check").removeClass("filter__item_is-active");
        $.ajax({
            type: 'Get',
            dataType: "json",
            url: '/Advertisement/ListBankTransfers',
            success: function (result) {
                if (result.data) {
                    var html = '';
                    for (var i = 0; i < result.data.length; i++) {
                        var account = result.data[i];
                        html += '<div class="row">' +
                            '<div class="col-lg-12">' +
                            '<div class="acoount-holder-title common-card-list-setting inline-block-list">' +
                            '<ul>' +
                            '<li><label>'+Main_Account_Number+':</label></li>' +
                            '<li><label>' + account.accountNumber + '</label></li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-lg-4">' +
                            '<div class="bank-name common-card-list-setting">' +
                            '<ul>' +
                            '<li><label>' + Main_Bank_Name +' :</label></li>' +
                            '<li><label>' + account.bankName + '</label></li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-lg-4">' +
                            '<div class="card-holder-name common-card-list-setting">' +
                            '<ul>' +
                            '<li><label>' + Main_s_Name +' :</label></li>' +
                            '<li><label>' + account.bankHolderName + '</label></li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-lg-3">' +
                            '<div class="card-holder-name common-card-list-setting">' +
                            '<ul>' +
                            '<li><label>' + Main_IBN_Number +':</label></li>' +
                            '<li><label>' + account.ibanNumber + '</label></li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-lg-1">' +
                            '<div class="check-banl-wrapper">' +
                            '<div class="radio-content selectBank">' +
                            '<input id="' + account.id + '" value="' + account.id + '" type="checkbox"  name="bank-radio" data-name="' + account.bankName + '" />' +
                            '<label for="' + account.id + '"><span></span></label>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                    }

                    $('.banks').html(html);
                    $('#showBanksTransferModal').modal('show');
                }
            },
            error: function (response) {

            }
        });
    }
});



$(".dissmissbtn").click(function () {
    $("#SA-bank").prop("checked", false);
});


$(".auctionTime").hide();
$(".AuctionstartPrice").hide();
$(".MinimumPrice").hide();
$(".Auction").hide();

//$("#price-is-negotiable").click(function () {
//    if ($(this).is(":checked")) {
//        $(".auctionTime").show();
//    } else {
//        $(".auctionTime").hide();
//    }
//});

$("#Auction").click(function () {
    if ($(this).is(":checked")) {
        $(".AuctionstartPrice").show();
        $(".MinimumPrice").show();
        $(".Auction").show();
        $(".auctionTime").show();
    } else {
        $(".AuctionstartPrice").hide();
        $(".MinimumPrice").hide();
        $(".Auction").hide();
        $(".auctionTime").hide();
    }
});
$(".settime-input").flatpickr({
    enableTime: true,
    dateFormat: "Y/m/d H:i",
    wrap: true,
});
var ExtraProductImageCountNeed = 0, ExtraProductVidoeCountNeed = 0;
var ProductImageFee = 0, ProductVidoeFee = 0, TotalVee = 0;
var imagesArray = [];
var videos = [];

$(window).on('load', function () {
    //$("#ownTime").prop("checked", false);
    $("#fixedTime").prop("checked", true);
    var basicAPI = localStorage.getItem("basicAPI");
    var token = localStorage.getItem("jwttoken");
    var providerId = localStorage.getItem("loggedIn");
    var lang = localStorage.getItem("lang");
});

//#region Collabs and expand tabs
var categorySectionDataValid = false;
var photosSectionDataValid = false;
var specificationSectionDataValid = true;
var adDetailsSectionDataValid = false;
var salesDetailsDataValid = false;
var durationAndShippingSectionDataValid = false;
var closeTab = false;
$('.collapse1-1').click(function () {
    if (!categorySectionDataValid)
        return;
    let className = document.getElementById("photoSection").className;
    if (className == "collapse1-1 collapse") {
        $(".collapse1-1").addClass("expand").removeClass("collapse");
        $("#collapse1-1").addClass("collapsed").removeClass("expanded").css("display", "none");
    } else {
        $(".collapse1-1").removeClass("expand").addClass("collapse");
        $("#collapse1-1").removeClass("collapsed").addClass("expanded").css("display", "block");
    }
});
$('.collapse1-2').click(function () {
    if (!photosSectionDataValid || !categorySectionDataValid)
        return;
    let className = document.getElementById("itemDetails").className;
    if (className == "collapse1-2 collapse") {
        $(".collapse1-2").addClass("expand").removeClass("collapse");
        $("#collapse1-2").addClass("collapsed").removeClass("expanded").css("display", "none");
    } else {
        $(".collapse1-2").removeClass("expand").addClass("collapse");
        $("#collapse1-2").removeClass("collapsed").addClass("expanded").css("display", "block");
    }
});
$('.collapse1-3').click(function () {
    if (!specificationSectionDataValid || !categorySectionDataValid)
        return;
    let className = document.getElementById("listingDetails").className;
    if (className == "collapse1-3 collapse") {
        $(".collapse1-3").addClass("expand").removeClass("collapse");
        $("#collapse1-3").addClass("collapsed").removeClass("expanded").css("display", "none");
    } else {
        $(".collapse1-3").removeClass("expand").addClass("collapse");
        $("#collapse1-3").removeClass("collapsed").addClass("expanded").css("display", "block");
    }
});
$('.collapse1-4').click(function () {
    if (!adDetailsSectionDataValid || !categorySectionDataValid)
        return;
    let className = document.getElementById("salesDetails").className;
    if (className == "collapse1-4 collapse") {
        $(".collapse1-4").addClass("expand").removeClass("collapse");
        $("#collapse1-4").addClass("collapsed").removeClass("expanded").css("display", "none");
    } else {
        $(".collapse1-4").removeClass("expand").addClass("collapse");
        $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");
    }
});
$('.collapse1-5').click(function () {
    if (!salesDetailsDataValid || !categorySectionDataValid)
        return;
    let className = document.getElementById("durationandShipping").className;
    if (className == "collapse1-5 collapse") {
        $(".collapse1-5").addClass("expand").removeClass("collapse");
        $("#collapse1-5").addClass("collapsed").removeClass("expanded").css("display", "none");
    } else {
        $(".collapse1-5").removeClass("expand").addClass("collapse");
        $("#collapse1-5").removeClass("collapsed").addClass("expanded").css("display", "block");
    }
});
$('.collapse1-6').click(function () {
    if (!durationAndShippingSectionDataValid || !categorySectionDataValid)
        return;
    let className = document.getElementById("packagess").className;
    if (className == "collapse1-6 collapse") {
        $(".collapse1-6").addClass("expand").removeClass("collapse");
        $("#collapse1-6").addClass("collapsed").removeClass("expanded").css("display", "none");
    } else {
        $(".collapse1-6").removeClass("expand").addClass("collapse");
        $("#collapse1-6").removeClass("collapsed").addClass("expanded").css("display", "block");
    }
});
//#endregion

function ShowSec1() {
    $(".collapse1-1").removeClass("expand").addClass("collapse");
    $("#collapse1-1").removeClass("collapsed").addClass("expanded").css("display", "none");
    $('#search-category').css('display', 'block');
    $('#btnShow1').css('display', 'none');

}
//#region  Categories Section

function RenderCategoriesList(data, subCategoryLevel, levelIndex) {
    // 1- Disable Next Button
    jQuery('#catnextbtn').css('opacity', '0.5');
    $('#catnextbtn').prop('disabled', 'true');

    // 2- Fill the op down list of the next sub category
    $('#' + subCategoryLevel).find('option').remove();
    $.each(data, function (index, item) {
        var itemData = JSON.stringify(item);
        var option = '<option id="category-' + item.id + '" class="categories-list" value=' + item.id + ' >' + item.name + '</option>';
        $('#' + subCategoryLevel).append(option);
        document.getElementById('category-' + item.id).setAttribute('data-categorydata', itemData);
    });
    $('#' + subCategoryLevel).val(null).trigger("chosen:updated");
    $(".chosen-select").chosen();

    // 3 - Show sub category
    $('#subcat' + levelIndex).show();

    // 4- hide blow sub categories
    for (var i = 1; i < 6; i++) {
        $('#subcat' + levelIndex + i).hide();
    }
}
var Specefications = '';
var inArabic = '@ViewBag.v' == 'ar' ? "بالعربية" : "In Arabic";
var inEnglish = '@ViewBag.v' == 'ar' ? "بالانجليزية" : "In English";
function ShowSpecificationHeader(type, isRequired, id, name, nameAr, nameEn) {
    if (type != 2 && type != 3) {
        if (isRequired == 'required')
            Specefications += '<h5 class="sell-common-heading" id="' + id + '" name="Specifications">' + name + '<span style="color:red;"> *</span></h5>';
        else
            Specefications += '<h5 class="sell-common-heading" id="' + id + '" name="Specifications">' + name + '</h5>';
    }
    else {
        if (nameAr != null) {
            if (isRequired == 'required')
                Specefications += '<h5 class="sell-common-heading" id="' + id + '" name="Specifications">' + name + ' ' + inArabic + '<span style="color:red;"> *</span></h5>';
            else
                Specefications += '<h5 class="sell-common-heading" id="' + id + '" name="Specifications">' + name + ' ' + inArabic + '</h5>';
        }
        else {
            Specefications += '<h5 class="sell-common-heading" id="' + id + '" name="Specifications">' + name + ' ' + inEnglish + '</h5>';
        }
    }
}
function GetCategorySpecifications(selectedCategoryId) {
    $.ajax({
        eaders: requestHeaders(),
        type: 'GET',
        url: '/Advertisement/ListAllSpecificationAndSubSpecificationByCatId?categoryId=' + selectedCategoryId,
        success: function (result) {
            Specefications = '';
            var isRequired = false;
            for (var x = 0; x < result.data.length; x++) {
                isRequired = result.data[x].isRequired ? "required" : "";
                if (result.data[x].type != 2 && result.data[x].type != 3)
                    ShowSpecificationHeader(result.data[x].type, isRequired, result.data[x].id, result.data[x].name)
                if (result.data[x].type == 1 || result.data[x].type == 7) {
                    Specefications += '<div class="sell-main-catagory-customdropdown"><select data-id="' + result.data[x].id + '" data-type="' + result.data[x].type + '" id="SubSP' + result.data[x].id + '"'
                        + 'data-placeholder="cars, real estate, animals..." class="chosen-select supSpeci" ' + isRequired + '> ';
                    for (var a = 0; a < result.data[x].subSpecifications.length; a++) {
                        if ('@ViewBag.v' == 'ar') {
                            Specefications += '<option value="' + result.data[x].subSpecifications[a].id + '">' + result.data[x].subSpecifications[a].nameAr + '</option>';
                        }
                        else {
                            Specefications += '<option value="' + result.data[x].subSpecifications[a].id + '">' + result.data[x].subSpecifications[a].nameEn + '</option>';
                        }
                    }
                    Specefications += '</select></div>';
                }
                else if (result.data[x].type == 2) {
                    ShowSpecificationHeader(result.data[x].type, isRequired, result.data[x].id, result.data[x].name, result.data[x].nameAr, null);
                    Specefications += '<input type="text" id="SubSP' + result.data[x].id + '" name="Title" data-type="' + result.data[x].type + '" data-language="Arabic" data-id="' + result.data[x].id + '" class="accord-inner-input supSpeci" placeholder="' + result.data[x].placeHolder + ' ' + inArabic + '"' + isRequired + ' >';

                    ShowSpecificationHeader(result.data[x].type, isRequired, result.data[x].id, result.data[x].name, null, result.data[x].nameEn);
                    Specefications += '<input type="text" id="SubSP' + result.data[x].id + '" name="Title" data-type="' + result.data[x].type + '" data-language="English" data-id="' + result.data[x].id + '" class="accord-inner-input supSpeci" placeholder="' + result.data[x].placeHolder + ' ' + inEnglish + '"' + isRequired + ' >';

                }
                else if (result.data[x].type == 3) {
                    ShowSpecificationHeader(result.data[x].type, isRequired, result.data[x].id, result.data[x].name, result.data[x].nameAr, null);
                    Specefications += '<textarea id="SubSP' + result.data[x].id + '" name="Title" data-type="' + result.data[x].type + '" data-language="Arabic" data-id="' + result.data[x].id + '" class="accord-inner-input supSpeci" placeholder="' + result.data[x].placeHolder + ' ' + inArabic + '"' + isRequired + '></textarea>';

                    ShowSpecificationHeader(result.data[x].type, isRequired, result.data[x].id, result.data[x].name, null, result.data[x].nameEn);
                    Specefications += '<textarea id="SubSP' + result.data[x].id + '" name="Title" data-type="' + result.data[x].type + '" data-language="English" data-id="' + result.data[x].id + '" class="accord-inner-input supSpeci" placeholder="' + result.data[x].placeHolder + ' ' + inEnglish + '"' + isRequired + '></textarea>';
                }
                else if (result.data[x].type == 4) {
                    Specefications += '<input type="number" id="SubSP' + result.data[x].id + '"  data-type="' + result.data[x].type + '" data-id="' + result.data[x].id + '" name="Title" class="accord-inner-input supSpeci number" placeholder="' + result.data[x].placeHolder + '"' + isRequired + '>';
                }
                else if (result.data[x].type == 5) {
                    for (var a = 0; a < result.data[x].subSpecifications.length; a++) {
                        if ('@ViewBag.v' == 'ar') {
                            Specefications += '<lable  for="SubSP' + result.data[x].subSpecifications[a].id + '" >' + result.data[x].subSpecifications[a].nameAr + '</lable>';
                            Specefications += '<input id="SubSP' + result.data[x].subSpecifications[a].id + '" type="radio" data-type="' + result.data[x].type + '" data-subid="' + result.data[x].subSpecifications[a].id + '" data-id="' + result.data[x].id + '" name="SupSpeciRadio_' + result.data[x].id + '" class="ml-10 supSpeci"' + isRequired + '> </br>';
                        }
                        else {
                            Specefications += '<lable  for="SubSP' + result.data[x].subSpecifications[a].id + '" >' + result.data[x].subSpecifications[a].nameEn + '</lable>';
                            Specefications += '<input id="SubSP' + result.data[x].subSpecifications[a].id + '" type="radio" data-type="' + result.data[x].type + '" data-subid="' + result.data[x].subSpecifications[a].id + '" data-id="' + result.data[x].id + '" name="SupSpeciRadio_' + result.data[x].id + '" class="ml-10 supSpeci"' + isRequired + '> </br>';
                        }
                    }
                }
                else if (result.data[x].type == 6) {
                    for (var a = 0; a < result.data[x].subSpecifications.length; a++) {
                        if ('@ViewBag.v' == 'ar') {
                            Specefications += '<lable  for="SubSP' + result.data[x].subSpecifications[a].id + '" >' + result.data[x].subSpecifications[a].nameAr + '</lable>';
                            Specefications += '<input id="SubSP' + result.data[x].subSpecifications[a].id + '" type="checkbox"  data-type="' + result.data[x].type + '" data-subid="' + result.data[x].subSpecifications[a].id + '" data-id="' + result.data[x].id + '" name="SupSpeciCheckbox_' + result.data[x].id + '" class="ml-10 supSpeci"' + isRequired + '> </br>';
                        }
                        else {
                            Specefications += '<lable  for="SubSP' + result.data[x].subSpecifications[a].id + '" >' + result.data[x].subSpecifications[a].nameEn + '</lable>';
                            Specefications += '<input id="SubSP' + result.data[x].subSpecifications[a].id + '" type="checkbox"  data-type="' + result.data[x].type + '" data-subid="' + result.data[x].subSpecifications[a].id + '" data-id="' + result.data[x].id + '" name="SupSpeciCheckbox_' + result.data[x].id + '" class="ml-10 supSpeci"' + isRequired + '> </br>';
                        }
                    }
                }
            }
            $('#SpeAndSubForm').html(Specefications);
            $(".chosen-select").chosen();
        },
        error: function (error) {

        }
    });
}
function GetCategoryAdditionalPakat(selectedCategoryId) {
    $.ajax({
        headers: requestHeaders(),
        type: 'GET',
        url: eCommerceAPIUrl + '/api/v1/GetAllPakatsList?lang=@ViewBag.v&categoryId=' + selectedCategoryId,
        success: function (result) {
            if (result.status_code == 200) {

                var Package = '';
                for (var i = 0; i < result.data.length; i++) {
                    Package += '<div class="col-lg-6"><div class="price-table-single-main-wrapper">' +
                        '<input type="radio" id="Packages' + result.data[i].id + '"name="PackagesID" onclick="SelectPack(' + result.data[i].id + ',' + result.data[i].price + ')" value="' + result.data[i].id + '">' +
                        '<label for="Packages' + result.data[i].id + '"class="price-table-`-style">';
                    if (result.data[i].popular == 1) {
                        Package += '<div class="price-table-main-header with-main-color">';
                    }
                    else {
                        Package += '<div class="price-table-main-header">';
                    }
                    Package += '<div class="price-table-main-placeholder">' +
                        '<div class="package-name"><h6>' + result.data[i].name + '</h6></div>' +
                        '<div class="package-price"><label>' + result.data[i].price + '<span>S.R</span></label></div></div>';
                    if (result.data[i].popular == 1) {
                        Package += '<div class="mostly-buy-plan"><label>common</label></div></div>'
                    }
                    Package += '<div class="package-price-body"><div class="package-price-body-content">' +
                        '<div class="alert alert-danger" role="alert" style="border: none; font-size: 13px;background: #e39292; display:none" id="alert' + result.data[i].id + '">' +
                        'Your Photos Count Is Bigger Than The Package Count!</div></div></div>' +
                        '<ul><li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Number Of Monthes: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].numMonth + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Count of Images: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].countImage + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Count of Videos: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].countVideo + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Product Position: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].productPosition + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Show SupTitle: </label>';
                    if (result.data[i].showSupTitle == true) {
                        Package += '<span style="margin-left: 10px"><i style="color:#16aa16" class="fas fa-check"></i></span>';
                    }
                    else {
                        Package += '<span style="margin-left: 10px"><i style="color:red" class="fas fa-times"></i></span>';
                    }
                    Package += '</div></div></li><li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Show HighLight: </label>';
                    if (result.data[i].showHighLight == true) {
                        Package += '<span style="margin-left: 10px"><i style="color:#16aa16" class="fas fa-check"></i></span>';
                    }
                    else {
                        Package += '<span style="margin-left: 10px"><i style="color:red" class="fas fa-times"></i></span>';
                    }
                    Package += '</div></div></li></ul></label></div></div>';
                }
                $('#PackSection').html(Package);
            }
            else {

            }
        },

    });
}
function GetSelectedCategoryDate() {
    $('#EnableFixedPriceSaleFee').val(selectedCategoryData.enableFixedPriceSaleFee);
    $('#EnableAuctionFee').val(selectedCategoryData.enableAuctionFee);
    $('#EnableNegotiationFee').val(selectedCategoryData.enableNegotiationFee);
    $('#productPublishPrice').val(selectedCategoryData.productPublishPrice);
    if ($('#subtitle-en').val().length > 0 || $('#subtitle-ar').val().length > 0)
        $('#SubTitleFee').val(selectedCategoryData.subTitleFee);
    $('#ExtraProductImageFee').val(selectedCategoryData.extraProductImageFee);
    $('#ExtraProductVidoeFee').val(selectedCategoryData.extraProductVidoeFee);
    $(".auctionClosingTimeFee").text('+ ' + selectedCategoryData.auctionClosingTimeFee + ' S.R');

    if (selectedCategoryData.enableFixedPrice) {
        $('#fixed_price_sale-section').css('display', 'block');
    }
    else
        $('#fixed_price_sale-section').css('display', 'none');
    if (selectedCategoryData.enableNegotiation) {
        $('#price_is_negotiable-section').css('display', 'block');
    }
    else
        $('#price_is_negotiable-section').css('display', 'none');
    if (selectedCategoryData.enableAuction) {
        $('#price_is-auction-section').css('display', 'block');
        $(".auctionClosingTimeFee").text('+ ' + selectedCategoryData.auctionClosingTimeFee + ' SR');
        /* duration option */
        var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
        var lable = '';
        var periods = selectedCategoryData.auctionClosingPeriods.split(",");
        var daysPeriod;
        var periodsButtons = '';
        if (selectedCategoryData.auctionClosingPeriodsUnit == 1) {
            daysPeriod = 1;
            lable = Main_Day;
        }
        else if (selectedCategoryData.auctionClosingPeriodsUnit == 2) {
            daysPeriod = 7;
            lable = Main_week;
        }
        else {
            daysPeriod = 30;
            lable = Main_Month;
        }

        if (periods[0] != null && periods[0] != '' && periods[0] != undefined) {
            oneweek = moment().add(periods[0] * daysPeriod, 'days').format("YYYY-MM-DD HH:mm:ss");
            periodsButtons = periodsButtons + '<div class="button">' +
                '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                '<label class="btn btn-default" for="oneWeek">' + periods[0] + ' ' + lable + ' </label>' +
                '</div>';
        }
        if (periods[1] != null && periods[1] != '' && periods[1] != undefined) {
            twoweek = moment().add(periods[1] * daysPeriod, 'days').format("YYYY-MM-DD HH:mm:ss");
            periodsButtons = periodsButtons + '<div class="button">' +
                '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                '<label class="btn btn-default" for="twoWeek">' + periods[1] + ' ' + lable + ' </label>' +
                '</div>';
        }
        if (periods[2] != null && periods[2] != '' && periods[2] != undefined) {
            threeweek = moment().add(periods[2] * daysPeriod, 'days').format("YYYY-MM-DD HH:mm:ss");
            periodsButtons = periodsButtons + '<div class="button">' +
                '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                '<label class="btn btn-default" for="threeWeek">' + periods[2] + ' ' + lable + '</label>' +
                '</div>'
        }
        if (periods[3] != null && periods[3] != '' && periods[2] != undefined) {
            fourweek = moment().add(periods[0] * daysPeriod, 'days').format("YYYY-MM-DD HH:mm:ss");
            periodsButtons = periodsButtons + '<div class="button">' +
                '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                '<label class="btn btn-default" for="fourWeek">' + periods[3] + ' ' + lable + '</label>' +
                '</div>';
        }

        var duration = '';
        duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
            '<div style="margin-top:-35px;display:flex;">' +
            periodsButtons
        '</div>' +
            '</div>';

        $('.list_duration_weeks').html(duration);
    }
    else
        $('#price_is-auction-section').css('display', 'none');

}
$('#subcat1').hide();
$('#subcat2').hide();
$('#subcat3').hide();
$('#subcat4').hide();
$('#subcat5').hide();
$('#subcat6').hide();
$('#CategorirsList').hide();
$('#categoryMain').show();
$(".chosen-select").chosen();
//$('#maincat').select2();
//AppendCinditionInCheckout('#conditionid');


//$('#search-category-itemdetails').hide();

$("#maincat option:selected").prop("selected", false);
$("#maincat option:first").prop("selected", "selected");
$('#catnextbtn').prop('disabled', 'true');

jQuery('#catnextbtn').css('opacity', '0.6');

$('#maincat').on('change', function () {
    categorySectionDataValid = false;
    selectedSubCategoryLevel = "maincat";
    $('#catnextbtn').prop('disabled', 'true');
    jQuery('#catnextbtn').css('opacity', '0.6');
    var catID = $(this).val();
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    FinalSubCat = this.value;
    $('#SubcatTitle').html(FinalSubCat);
    subCatLOne = FinalSubCat;
    var subCatLOneKey = subCatLOne.split("-");
    breadcrums = subCatLOneKey[0];
    $.ajax({
        headers: requestHeaders(),
        type: 'GET',
        url: '/Advertisement/GetSubCategoryByCategoryId?id=' + FinalSubCat,
        success: function (html) {
            if (html.data.length > 0) {
                RenderCategoriesList(html.data, "subcatlevel1", 1);
                $(".chosen-select").chosen();
            }
            else {
                $("#catnextbtn").removeAttr('disabled');
                jQuery('#catnextbtn').css('opacity', '1');
                $('#subcat1').hide();
                $('#subcat1').hide();
                $('#subcat2').hide();
                $('#subcat3').hide();
                $('#subcat4').hide();
                $('#subcat5').hide();
                $('#subcat6').hide();
            }

        }
    });
});

$('#subcatlevel1').on('change', function () {
    categorySectionDataValid = false;
    selectedSubCategoryLevel = "subcatlevel1";
    var subcatID = $(this).val();
    var valueSelected = this.value;

    FinalSubCat = this.value;
    subCat = FinalSubCat;

    if (subcatID) {
        $.ajax(
            {
                headers: requestHeaders(),
                type: 'GET',
                url: '/Advertisement/GetSubCategoryByCategoryId?id=' + FinalSubCat,
                success: function (html) {
                    if (html.data.length > 0) {
                        RenderCategoriesList(html.data, "subcatlevel2", 2);
                    }
                    else {
                        $("#catnextbtn").removeAttr('disabled');
                        jQuery('#catnextbtn').css('opacity', '1');
                        $('#subcat1').show();
                        $('#subcat2').hide();
                        $('#subcat3').hide();
                        $('#subcat4').hide();
                        $('#subcat5').hide();
                        $('#subcat6').hide();
                    }

                }
            }
        );
    }

});

$('#subcatlevel2').on('change', function () {
    categorySectionDataValid = false;
    selectedSubCategoryLevel = "subcatlevel2";
    var subcatID = $(this).val();
    var valueSelected = this.value;
    FinalSubCat = this.value;
    subCat = FinalSubCat;
    $.ajax(
        {
            headers: requestHeaders(),
            type: 'GET',
            url: '/Advertisement/GetSubCategoryByCategoryId?id=' + FinalSubCat,
            success: function (html) {
                if (html.data.length > 0) {
                    RenderCategoriesList(html.data, "subcatlevel3", 3);
                }
                else {
                    $("#catnextbtn").removeAttr('disabled');
                    jQuery('#catnextbtn').css('opacity', '1');
                    $('#subcat1').show();
                    $('#subcat2').show();
                    $('#subcat3').hide();
                    $('#subcat4').hide();
                    $('#subcat5').hide();
                    $('#subcat6').hide();
                }

            }
        }
    );


});

$('#subcatlevel3').on('change', function () {
    categorySectionDataValid = false;
    selectedSubCategoryLevel = "subcatlevel3";
    var subcatID = $(this).val();
    var valueSelected = this.value;
    FinalSubCat = this.value;
    subCat = FinalSubCat;
    $.ajax(
        {
            headers: requestHeaders(),
            type: 'GET',
            url: '/Advertisement/GetSubCategoryByCategoryId?id=' + FinalSubCat,
            success: function (html) {
                if (html.data.length > 0) {
                    RenderCategoriesList(html.data, "subcatlevel4", 4);
                }
                else {
                    $("#catnextbtn").removeAttr('disabled');
                    jQuery('#catnextbtn').css('opacity', '1');
                    $('#subcat4').hide();
                    $('#subcat5').hide();
                    $('#subcat6').hide();
                }
            }
        });
});

$('#subcatlevel4').on('change', function () {
    categorySectionDataValid = false;
    selectedSubCategoryLevel = "subcatlevel4";
    var subcatID = $(this).val();
    var valueSelected = this.value;
    FinalSubCat = this.value;
    subCat = FinalSubCat;

    $.ajax(
        {
            headers: requestHeaders(),
            type: 'GET',
            url: '/Advertisement/GetSubCategoryByCategoryId?id=' + FinalSubCat,
            success: function (html) {
                if (html.data.length > 0) {
                    RenderCategoriesList(html.data, "subcatlevel5", 5);
                }
                else {
                    $("#catnextbtn").removeAttr('disabled');
                    jQuery('#catnextbtn').css('opacity', '1');
                    $('#subcat5').hide();
                    $('#subcat6').hide();
                }
            }
        }
    );
});

$('#subcatlevel5').on('change', function () {
    categorySectionDataValid = false;
    selectedSubCategoryLevel = "subcatlevel5";
    var subcatID = $(this).val();
    var valueSelected = this.value;
    FinalSubCat = this.value;
    subCat = FinalSubCat;
    if (subcatID) {
        $.ajax(
            {
                headers: requestHeaders(),
                type: 'GET',
                url: '/Advertisement/GetSubCategoryByCategoryId?id=' + FinalSubCat,
                success: function (html) {
                    if (html.data.length > 0) {
                        RenderCategoriesList(html.data, "subcatlevel6", 6);
                    }
                    else {
                        $("#catnextbtn").removeAttr('disabled');
                        jQuery('#catnextbtn').css('opacity', '1');
                        $('#subcat6').hide();
                    }
                }
            }
        );
    }

});

$('#subcatlevel6').on('change', function () {
    categorySectionDataValid = false;
    selectedSubCategoryLevel = "subcatlevel6";
    var subcatID = $(this).val();
    var valueSelected = this.value;
    FinalSubCat = this.value;
    subCat = FinalSubCat;
    if (subcatID) {
        $.ajax(
            {
                headers: requestHeaders(),
                type: 'GET',
                url: '/Advertisement/GetSubCategoryByCategoryId?id=' + FinalSubCat,
                success: function (html) {
                    if (html.data.length > 0) {
                    }
                    else {
                        $("#catnextbtn").removeAttr('disabled');
                        jQuery('#catnextbtn').css('opacity', '1');
                    }
                }
            }
        );
    }

});
function hideSec1() {
    $('#search-category').css('display', 'none');
    $('#btnShow1').css('display', 'block');
}
$("#catnextbtn").click(function () {
    categorySectionDataValid = true;
    selectedCategoryData = JSON.parse($('#' + selectedSubCategoryLevel + ' option[value="' + FinalSubCat + '"]').attr('data-categorydata'));
    $(".collapse1-1").removeClass("expand").addClass("collapse");
    $("#collapse1-1").removeClass("collapsed").addClass("expanded").css("display", "block");
    GetSelectedCategoryDate();
    GetCategoryAdditionalPakat(selectedCategoryData.id);
    GetCategorySpecifications(selectedCategoryData.id);
});
//#endregion

//#region 1- Photos Section 
$("#addphotonextbtn").click(function (e) {
    e.preventDefault();

    var isMain = $("input[type='radio'][name='mainPic']:checked").val();
    if (isMain == undefined) {
        $('.custome-file').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#imageFiles").offset().top
        }, 500);
        $("#CheckOnMainImageModal").modal("show");
    }
    else {
        photosSectionDataValid = true;
        $(".collapse1-2").removeClass("expand").addClass("collapse");
        $("#collapse1-2").removeClass("collapsed").addClass("expanded").css("display", "block");
        closeTab = true;
        CloseTabs('my-next-btn');
    }


    //extra images and vedio
    var htmlExtraPicVedio = '';

    videos = [], ExtraProductImageCountNeed = 0, ExtraProductVidoeCountNeed = 0;
    for (var i = 1; i < index.length; i++) {
        var value = $('input[name=child_' + i + ']').val();
        if (value != '') {
            videos.push(value);
        }
    }

    ExtraProductImageCountNeed = imageArr.length - selectedCategoryData.freeProductImagesCount;
    ExtraProductVidoeCountNeed = videos.length - selectedCategoryData.freeProductVidoesCount;

    if (ExtraProductImageCountNeed < 0) {
        ExtraProductImageCountNeed = 0;
    }
    if (ExtraProductVidoeCountNeed < 0) {
        ExtraProductVidoeCountNeed = 0;
    }

    ProductImageFee = ExtraProductImageCountNeed * selectedCategoryData.extraProductImageFee;
    ProductVidoeFee = ExtraProductVidoeCountNeed * selectedCategoryData.extraProductVidoeFee;
    TotalVee = ProductImageFee + ProductVidoeFee;


    htmlExtraPicVedio += '<div class="col-lg-6"><div class="price-table-single-main-wrapper">' +
        '<label for="Packages' + 0 + '"class="price-table-common-style">';

    htmlExtraPicVedio += '<div class="price-table-main-header with-main-color">';

    htmlExtraPicVedio += '<div class="price-table-main-placeholder">' +
        '<div class="package-name"><h6>Extra Package </h6></div>' +
        '<div class="package-price"><label>' + TotalVee + '<span> S.R</span></label></div></div>';

    htmlExtraPicVedio += '<div class="mostly-buy-plan"><label>ExtraFee</label></div></div>';
    htmlExtraPicVedio += '<ul>' +
        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
        '<label>Extra Product Image Count: <span style="margin-left: 10px; font-weight:bold;">' + ExtraProductImageCountNeed + '</span></label></div></div></li>' +
        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
        '<label>Extra Product Vidoe Count: <span style="margin-left: 10px; font-weight:bold;">' + ExtraProductVidoeCountNeed + '</span></label></div></div></li>' +

        '</ul></label></div></div>';

    if (ExtraProductImageCountNeed > 0 || ExtraProductVidoeCountNeed > 0) {
        $('#ExtraPackage').css("display", "block");
        $('#ExtraPackageSection').html(htmlExtraPicVedio);
    }

});

//#region Upload photos
//To save an array of attachments
var AttachmentArray = [];

var _class = "";
//counter for attachment array
var arrCounter = 0;
var counter = 0;
//to make sure the error message for number of files will be shown only one time.
var filesCounterAlertStatus = false;

//un ordered list to keep attachments thumbnails
var ul = document.createElement("ul");
ul.className = "thumb-Images";
ul.id = "imgList";

var ull = document.createElement("ul");
ull.className = "thumb-Images";
ull.id = "imageList";


//the handler for file upload event
function handleFileSelect(e) {
    if (counter < 11) {
        counter += 1;
        //to make sure the user select file/files
        if (!e.target.files) return;

        //To obtaine a File reference
        var files = e.target.files;

        // Loop through the FileList and then to render image files as thumbnails.
        for (var i = 0, f; (f = files[i]), i < files.length; i++) {
            //instantiate a FileReader object to read its contents into memory
            var fileReader = new FileReader();

            // Closure to capture the file information and apply validation.
            fileReader.onload = (function (readerEvt) {
                return function (e) {
                    //Apply the validation rules for attachments upload
                    if (ApplyFileValidationRules(readerEvt) == true) {
                        //Render attachments thumbnails.
                        RenderThumbnail(e, readerEvt);
                        RenderImage(e, readerEvt);
                        checkFirstImage();
                        //Fill the array of attachment
                        FillAttachmentArray(e, readerEvt);
                    }



                };
            })(f);

            // Read in the image file as a data URL.
            // readAsDataURL: The result property will contain the file/blob's data encoded as a data URL.
            // More info about Data URI scheme https://en.wikipedia.org/wiki/Data_URI_scheme
            fileReader.readAsDataURL(f);
        }
        document.getElementById("files").addEventListener("change", handleFileSelect, false);
        e.target.value = '';

    }
    else {
        $('#ImagesList').css('display', 'none');
    }
}

//To remove attachment once user click on x button
jQuery(function ($) {
    $("div").on("click", ".img-wrap .remove-img", function () {
        var id = $(this)
            .closest(".img-wrap")
            .find("img")
            .data("id");


        //to remove the deleted item from array
        var elementPos = AttachmentArray.map(function (x) {
            return x.FileName;
        }).indexOf(id);

        if (elementPos !== -1) {
            AttachmentArray.splice(elementPos, 1);
            imageArr.splice(elementPos, 1);
        }


        //to remove image tag
        $(this).parent().find("img").not().remove();

        //to remove div tag that contain the image
        $(this)
            .parent()
            .find("div")
            .not()
            .remove();

        //to remove div tag that contain caption name
        $(this)
            .parent()
            .parent()
            .find("div")
            .not()
            .remove();

        //to remove li tag
        var lis = document.querySelectorAll("#imgList");
        for (var i = 0; (li = lis[i]); i++) {
            if (li.innerHTML == "") {
                document.getElementById("Preview/" + id + "").remove();
            }
        }

        var liss = document.querySelectorAll("#imageList");
        for (var i = 0; (li = liss[i]); i++) {
            document.getElementById("Image/" + id + "").remove();
        }

        counter -= 1;

        if (counter <= 10) {
            $('#ImagesList').css('display', 'block');
        }
    });

    $(document).on("click", ".img-wrap .showImage", function () {
        var image = $(this)
            .closest(".img-wrap")
            .find("img")
            .attr("data-image");
        $('#showImageModal').modal('show');
        $('#imgZoom').attr('src', image);

    });
});

var fileName = "";
//Apply the validation rules for attachments upload
function ApplyFileValidationRules(readerEvt) {
    //To check file type according to upload conditions
    if (CheckFileType(readerEvt.type) == false) {
        fileName = readerEvt.name;
        $("#CheckFileTypeModal").modal("show");

        return false;
    } else {
        return true;
    }

    //To check file Size according to upload conditions
    if (CheckFileSize(readerEvt.size) == false) {
        alert(
            "The file (" +
            readerEvt.name +
            ") does not match the upload conditions, The maximum file size for uploads should not exceed 300 KB"
        );
        return false;
    } else {
        return true;
    }

    //To check files count according to upload conditions
    if (CheckFilesCount(AttachmentArray) == false) {
        if (!filesCounterAlertStatus) {
            filesCounterAlertStatus = true;
            alert(
                "You have added more than 10 files. According to upload conditions you can upload 10 files maximum"
            );
        }
        return false;
    } else {
        return true;
    }
}

//To check file type according to upload conditions
function CheckFileType(fileType) {
    if (fileType == "image/jpeg") {
        return true;
    } else if (fileType == "image/png") {
        return true;
    } else if (fileType == "image/gif") {
        return true;
    } else {
        return false;
    }
    return true;
}

//To check file Size according to upload conditions
function CheckFileSize(fileSize) {
    debugger;
    if (fileSize < 300000) {
        return true;
    } else {
        return false;
    }
    return true;
}

//To check files count according to upload conditions
function CheckFilesCount(AttachmentArray) {
    debugger;
    //Since AttachmentArray.length return the next available index in the array,
    //I have used the loop to get the real length
    var len = 0;
    for (var i = 0; i < AttachmentArray.length; i++) {
        if (AttachmentArray[i] !== undefined) {
            len++;
        }
    }

    //To check the length does not exceed 10 files maximum
    if (len > 9) {
        return false;
    } else {
        return true;
    }
}
//<span style="cursor:pointer;display:flex;" class="close">&times;</span>
//Render attachments thumbnails.
function RenderThumbnail(e, readerEvt) {
    var li = document.createElement("li");
    ul.appendChild(li);
    var Image =
        '<div class="col-lg-2 mt-3" id="Preview/' + readerEvt.name + '"><div class="custome-file"id="imgList"><div class="img-wrap" style="margin-top: -25px;"><i class="fa remove-img" style="cursor:pointer;display:flex;">&#xf00d;</i>' +
        '<img style ="width: 100%; max-width: 160px; height:140px; margin-right:-10px;" name="PicsList" data-image="' + e.target.result + '" class="thumb showImage" src="' +
        e.target.result +
        '" title="' +
        escape(readerEvt.name) +
        '" data-id="' +
        readerEvt.name +
        '"/><div class="row" style="margin-left: 0px;height: 31px;width: 100%;background: #ee6c4d;max-width: 160px;">' +
        '<div class="col-lg-10"><label style="color: white;margin-top: 0px; float: left">'  + Main_Picture + '</label></div>' +
        '<div class="col-lg-2"><input id="Preview/' + readerEvt.name + '" type="radio" class="mainPic" name="mainPic" value="' + e.target.result + '" style="margin-top: 8px;"></div>' +
        '</div></div></div></div>';

    var div = document.createElement("div");
    div.className = "FileNameCaptionStyle";
    li.appendChild(div);
    div.innerHTML = [readerEvt.name].join("");
    $('#ImagesList').before(Image)
}
function checkFirstImage() {
    document.getElementsByName('mainPic')[0].checked = true;
}

function RenderImage(e, readerEvt) {
    var li = document.createElement("li");
    ull.appendChild(li);
    var Image =
        '<div class="col-lg-2 mt-3" id="Image/' + readerEvt.name + '"><div class="custome-file" id="imageList"><div class="img-wrap">' +
        '<img name="PicsList" style="height: 100px;width: 100px;"  data-image="' + e.target.result + '" class="thumb showImage" src="' +
        e.target.result +
        '" title="' +
        escape(readerEvt.name) +
        '" data-id="' +
        readerEvt.name +
        '"/>' +
        '</div></div></div>';

    var div = document.createElement("div");
    div.className = "FileNameCaptionStyle";
    li.appendChild(div);
    div.innerHTML = [readerEvt.name].join("");
    $('#ImagesListSecond').before(Image)
}


//Fill the array of attachment
function FillAttachmentArray(e, readerEvt) {
    AttachmentArray[arrCounter] = {
        AttachmentType: 1,
        ObjectType: 1,
        FileName: readerEvt.name,
        FileDescription: "Attachment",
        NoteText: "",
        MimeType: readerEvt.type,
        Content: e.target.result.split("base64,")[1],
        FileSizeInBytes: readerEvt.size
    };
    arrCounter = arrCounter + 1;
}
//#endregion

var count = 1;
function addkid() {
    var value = $('input[name=child_' + count + ']').val();

    if (value != '' && value != undefined) {
        var id = getID();
        var div = document.createElement('div');
        // Set this attritube id so that we can access this element using Id
        div.setAttribute("id", "Div_" + id);
        
        div.innerHTML = '<div class="row">' +
            '<div class="col-md-6 col-sm-6">' +
            '<input type="text" name="child_' + id + '" class="accord-inner-input"  placeholder="' + Main_vedio_link +'"/>' +
            '</div>' +
            '<div class="col-md-6 col-sm-6 mt-2">' +
            '<input type="button" id="add_kid()_' + id + '" onclick="addkid()" value="+" style="width: 40px;height: 30px; "/>' +
            '<input type="button" id="rem_kid()_' + id + '" onclick="remkid(' + id + ')" value="-" style="width: 40px;height: 30px; "/>' +
            '</div>' +
            '</div><br />';
        // inside of passing this parameter in remkid we pass id number
        document.getElementById('kids').appendChild(div);
        $('input[name=child_' + count + ']').css('border-color', 'gray');
        count++;

    } else {
        $('input[name=child_' + count + ']').css('border-color', 'red');
    }

}

function remkid(id) {
    // use the id arugment to get the div element using unique id set in addkid
    try {
        var element = document.getElementById("Div_" + id)
        element.parentNode.removeChild(element);
        index[id] = -1;
        count--;
        //id number is = index of the array so we set to -1 to indicate its empty
    }
    catch (err) {
    }
}

function getID() {
    var emptyIndex = index.indexOf(-1);
    if (emptyIndex != -1) {
        index[emptyIndex] = emptyIndex

        return emptyIndex
    } else {
        emptyIndex = index.length
        index.push(emptyIndex)
        return emptyIndex
    }
}
//#endregion

//#region 2- Specifications Section
$("#itemdetailsnextbtn").click(function () {
    specificationSectionDataValid = true;
    var IDValues = [], IDSubSpec = [];
    var TextValues = [];

    $("h5[name='Specifications']").each(function () {
        IDValues.push($(this).prop('id'))
        TextValues.push($(this).text())
    });
    $(".supSpeci").each(function () {
        var type = $(this).attr('data-type');
        var id = $(this).data('id');
        IDSubSpec.push($(this).prop('id'));
    });
    var required;
    for (var x = 0; x < IDValues.length; x++) {
        var specific = $('.supSpeci[data-id=' + IDValues[x] + ']');


        var type = specific.attr('data-type');
        //var id = IDValues[x];
        var id = specific.attr('data-id');
        required = specific.attr('required');
        var Spe = TextValues[x];

        if (type == 1) {
            var Sup = specific.find(":selected").text();
            var SupId = specific.find(":selected").val();
            if (required == "required" && (SupId == '' || SupId == null || SupId == undefined))
                specificationSectionDataValid = false;
        }
        else if (type == 2 || type == 3 || type == 4) {
            var input = specific.val();
            if (required == "required" && (input == '' || input == null || input == undefined))
                specificationSectionDataValid = false;
        }
        else if (type == 5) {
            var radioId = $("input[type='radio'][name='SupSpeciRadio_" + id + "']:checked").attr("data-subid");
            var radioChecked = $("input[type='radio'][name='SupSpeciRadio_" + id + "']:checked").val();

            if (required == "required" && (radioChecked == false || radioChecked == '' || radioChecked == null || radioChecked == undefined))
                specificationSectionDataValid = false;
        }
        else if (type == 6) {
            var checkboxId = $("input[type='checkbox'][name='SupSpeciCheckbox_" + id + "']:checked").attr("data-subid");
            var checkboxChecked = $("input[type='checkbox'][name='SupSpeciCheckbox_" + id + "']:checked").val();
            if (required == "required" && (checkboxId == false || checkboxId == '' || checkboxId == null || checkboxId == undefined))
                specificationSectionDataValid = false;
        }
    }

    if (specificationSectionDataValid) {
        $(".collapse1-3").addClass("expand").removeClass("collapse");
        $("#collapse1-3").addClass("collapsed").removeClass("expanded").css("display", "none");

        $("#collapse1-2").removeClass("collapsed").addClass("expanded").css("display", "block");
        $(".collapse1-2").removeClass("expand").addClass("collapse");
        closeTab = true;
    }
    else {
        specificationSectionDataValid = false;
        $('html, body').animate({
            scrollTop: $("#imageFiles").offset().top
        }, 500);
        $('#CheckSpecificationModal').modal("show");
        $("#collapse1-2").trigger("click");
    }
});
//#endregion

//#region 3- Ad Details Section
$("#listingdetailsnxtbtn").click(function (event) {
    event.preventDefault();
    $('#product-name-required-error').hide();
    $('#quantity-required-error').hide();
    $('#country-required-error').hide();
    $('#region-required-error').hide();
    $('#city-required-error').hide();
    $('#product-status-required-error').hide();

    adDetailsSectionDataValid = true;
    var countryID = $('#country').val();
    var regionID = $('#region').val();
    var cityID = $('#city-field').val();
    var qty = $('.qtyValue').val();
    var statusId = $("input[type='radio'][name='brand_new_item']:checked").val();

    if ($('#recheck-title-feild-ar').val() == "") {

        $('#recheck-title-feild-ar').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#product-name-required-error').show();
        adDetailsSectionDataValid = false;
    }

    if (qty <= 0) {
        $('#qtyValue').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#quantity-required-error').show();
        adDetailsSectionDataValid = false;
    }
    if ($('#country').val() == "0") {
        $('#country').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#country-required-error').show();
        adDetailsSectionDataValid = false;

    }
    if ($('#region').val() == null) {
        $('#region').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#region-required-error').show();
        adDetailsSectionDataValid = false;
    }
    if ($('#city-field').val() == null) {
        $('#city-field').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#city-required-error').show();
        adDetailsSectionDataValid = false;
    }
    if (statusId == undefined) {
        $("input[type='radio'][name='brand_new_item']:unchecked").css('border-color', 'red');

        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#product-status-required-error').show();
        adDetailsSectionDataValid = false;
    }

    if (!adDetailsSectionDataValid)
        $('#product-details-errors-modal').modal("show");
    else {
        adDetailsSectionDataValid = true;
        $(".collapse1-4").removeClass("expand").addClass("collapse");
        $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");
        closeTab = true;
        CloseTabs('my-next');
    }
});
function AddEnglishInfo() {
    var chckBoxValue = ($("#addEnglishInfobtn").is(":checked") ? true : false);
    if (chckBoxValue == true) {
        $('#titlesEnglishModal').modal("show");
        $('#editenglishinfobtn').show();
    } else {
        $('#titlesEnglishModal').modal("hide");
        $('#editenglishinfobtn').hide();
    }
}
$("#increase-add-product-quantity").on('click', function () {
    var $parentElm = $(this).parents(".quantity-content-wrapper");
    $(this).addClass("clicked");
    setTimeout(function () {
        $(".clicked").removeClass("clicked");
    }, 100);
    var value = $parentElm.find(".qtyValue").val();
    value++;
    $parentElm.find(".qtyValue").val(value);
    $(".qtyValue").val(value);
    $('#productqty').text(value);
});
$("#decrease-add-product-quantity").on('click', function () {
    var $parentElm = $(this).parents(".quantity-content-wrapper");
    $(this).addClass("clicked");
    setTimeout(function () {
        $(".clicked").removeClass("clicked");
    }, 100);
    var value = $parentElm.find(".qtyValue").val();
    if (value > 1) {
        value--;
    }
    $parentElm.find(".qtyValue").val(value);
    $(".qtyValue").val(value);
    $('#productqty').text(value);
});
$("#add-product-new").click(function () {
    $('#conditionidNew').show();
});
$("#add-product-used").click(function () {
    $('#conditionidUsed').show();
});
//#endregion

//#region 4- Sales Details
$("#paymentshippingnextbtn").click(function (event) {
    event.preventDefault();
    salesDetailsDataValid = false;
    var IsAuction = selectedCategoryData.enableAuction && $('#Auction').prop('checked');
    var withFixed = selectedCategoryData.enableFixedPrice && $('#fixed-price-sale').prop('checked');
    var isNegotiable = selectedCategoryData.enableNegotiation && $('#price-is-negotiable').prop('checked');
    var fixedPriceDataIsValid = true;
    var auctionDataIsValid = true;
    if (withFixed == true) {
        var Price = $('#purchasingPrice').val();
        if (Price == "") {
            fixedPriceDataIsValid = false;
            $('#purchasingPrice').css('border-color', 'red');
            $('html, body').animate({
                scrollTop: $("#number3acc").offset().top
            }, 500);
            $('#purchasingPrice').focus();
            $('#CheckPriceModal').modal('show');
            return;
        }
    }
    if (IsAuction == true) {
        auctionDataIsValid = true;
        var StartPrice = $('#auctionstartPrice').val();
        var LessPrice = $('#minimumPrice').val();
        if (StartPrice == "" || LessPrice == "") {
            $('#auctionstartPrice').css('border-color', 'red');
            $('html, body').animate({
                scrollTop: $("#number3acc").offset().top
            }, 500);
            $('#auctionstartPrice').focus();
            $('#minimumPrice').focus();
            $('#CheckPriceModal').modal('show');
            return;
        }
    }
    if (!fixedPriceDataIsValid || !auctionDataIsValid) {
        return;
    }
    else {
        salesDetailsDataValid = true;
        $(".collapse1-4").addClass("expand").removeClass("collapse");
        $("#collapse1-4").addClass("collapsed").removeClass("expanded").css("display", "none");
        $(".collapse1-5").removeClass("expand").addClass("collapse");
        $("#collapse1-5").removeClass("collapsed").addClass("expanded").css("display", "block");
        closeTab = true;
        CloseTabs('my-next-btn');
    }
});
function AddNewBank() {
    if (checkForm($('#addBankForm'))) {

        var bankName = $('#bankName').val();
        var accountNumber = $('#accountNo').val();
        var bankHolderName = $('#accountHolder').val();
        var ibanNumber = $('#ibnNo').val();
        var swiftCode = $('#swiftCode').val();
        var expiaryDate = $('#expiryDate').val();
        var savedLater = $('#later-use').prop('checked');

        var formData = new FormData();
        formData.append('bankName', bankName);
        formData.append('accountNumber', accountNumber);
        formData.append('SaveForLaterUse', savedLater);
        formData.append('bankHolderName', bankHolderName);
        formData.append('ibanNumber', ibanNumber);
        formData.append('swiftCode', swiftCode);
        formData.append('expiaryDate', expiaryDate);

        $.ajax({
            type: 'POST',
            url: '/Advertisement/AddBankTransfer',
            contentType: false,
            processData: false,
            data: formData,
            success: function (result) {
                if (result != null) {
                    var jsonResult = JSON.parse(result);
                    if (jsonResult.status_code) {
                        $('#addNewBankModal').modal('hide');
                        $.ajax({
                            type: 'Get',
                            dataType: "json",
                            url: '/Advertisement/ListBankTransfers',
                            success: function (result) {
                                if (result.data) {
                                    var html = '';
                                    for (var i = 0; i < result.data.length; i++) {
                                        var account = result.data[i];
                                        html += '<div class="row">' +
                                            '<div class="col-lg-12">' +
                                            '<div class="acoount-holder-title common-card-list-setting inline-block-list">' +
                                            '<ul>' +
                                            '<li><label>' + Main_Account_Number +' :</label></li>' +
                                            '<li><label>' + account.accountNumber + '</label></li>' +
                                            '</ul>' +
                                            '</div>' +
                                            '</div>' +
                                            '<div class="col-lg-4">' +
                                            '<div class="bank-name common-card-list-setting">' +
                                            '<ul>' +
                                            '<li><label>' + Main_Bank_Name + ' :</label></li>' +
                                            '<li><label>' + account.bankName + '</label></li>' +
                                            '</ul>' +
                                            '</div>' +
                                            '</div>' +
                                            '<div class="col-lg-4">' +
                                            '<div class="card-holder-name common-card-list-setting">' +
                                            '<ul>' +
                                            '<li><label> ' + Main_s_Name +' :</label></li>' +
                                            '<li><label>' + account.bankHolderName + '</label></li>' +
                                            '</ul>' +
                                            '</div>' +
                                            '</div>' +
                                            '<div class="col-lg-3">' +
                                            '<div class="card-holder-name common-card-list-setting">' +
                                            '<ul>' +
                                            '<li><label>' + Main_IBN_Number +' :</label></li>' +
                                            '<li><label>' + account.ibanNumber + '</label></li>' +
                                            '</ul>' +
                                            '</div>' +
                                            '</div>' +
                                            '<div class="col-lg-1">' +
                                            '<div class="check-banl-wrapper">' +
                                            '<div class="radio-content selectBank">' +
                                            '<input id="' + account.id + '" value="' + account.id + '" type="checkbox" name="bank-radio" />' +
                                            '<label for="' + account.id + '"><span></span></label>' +
                                            '</div>' +
                                            '</div>' +
                                            '</div>' +
                                            '</div>';

                                    }

                                    $('.banks').html(html);
                                    $('#showBanksTransferModal').modal('show');
                                }
                            },
                            error: function (response) {

                            }

                        });
                    }
                }
                else {

                }
            },
            error: function (response) {

            }

        });
    }

}
var BankAccountId = 0;
var BankSelected = [];
function chooseMoreBanks() {
    BankSelected = [];
    $('.selectBank input:checked').each(function () {
        BankSelected.push($(this).val());
    });
}

$("#fixed-price-sale").click(function () {
    if ($(this).is(":checked")) {
        $(".purchasing-Price").show();
        $('#pricetogglebtnid').css('border-color', 'red');
    }
    else {
        $(".purchasing-Price").hide();
        $('#pricetogglebtnid').css('border-color', '');
    }
});
//#endregion

//#region 5- Duration And Shipping Section
var duration = "";
$("#durationshippingnextbtn").click(function () {
    durationAndShippingSectionDataValid = false;
    var fixedTime = $('#fixedTime').prop('checked');
    var ownTime = $('#ownTime').prop('checked');
    var duration = "";
    if (fixedTime == true) {
        duration = $("input[type='radio'][name='duration']:checked").val();
    }
    if (ownTime == true) {
        duration = $('.endtime').val();
    }
    var IsAuction = $('#Auction').prop('checked');
    if (IsAuction == true && (duration == undefined || duration == "")) {
        $('#CheckClosingDateModal').modal('show');
        return;
    }
    else {
        durationAndShippingSectionDataValid = true;
        $(".collapse1-6").removeClass("expand").addClass("collapse");
        $("#collapse1-6").removeClass("collapsed").addClass("expanded").css("display", "block");
        closeTab = true;
        CloseTabs('my-next-btn');
    }

});
$('#fixedTime').change(function () {
    $("#ownTime").prop("checked", false);
    $("#ChooseEndTime").removeClass("auction-color");
    $("#fixed-rate-auction").addClass("auction-color");
});
$('#ownTime').change(function () {
    $("#fixedTime").prop("checked", false);
    $("#fixed-rate-auction").removeClass("auction-color");
    $("#ChooseEndTime").addClass("auction-color");
});
$(document).on('change', 'input[name=duration]:radio:checked', function () {
    var duration = $(this).val();
    $("#ownTime").prop("checked", false);
    $("#fixedTime").prop("checked", true);
    $("#ChooseEndTime").removeClass("auction-color");
    $("#fixed-rate-auction").addClass("auction-color");
    $('.endtime').val('');

});
$(document).on('change', 'input[name=endtime]', function () {
    $("#fixedTime").prop("checked", false);
    $("#ownTime").prop("checked", true);
    $("#fixed-rate-auction").removeClass("auction-color");
    $("#ChooseEndTime").addClass("auction-color");
    $("input[type='radio'][name='duration']").prop("checked", false);

});
$(".pickup").click(function () {
    var value = $(this).val();
    if (value == 1) {
        $(".shippingoptions").hide();
    } else {
        $(".shippingoptions").show();
    }
});
$("#mustPickUp").click(function () {
    if ($(this).is(":checked")) {
        $(".shippingoptions").hide();

    } else {
        $(".shippingoptions").show();

    }
});
$("#noPickUp,#pickUpAvailable").click(function () {
    var val = $(this).val();
    if ($(this).is(":checked")) {
        $(".shippingoptions").show();
    } else {
        $(".shippingoptions").hide();
    }
});
//#endregion

//#region 6- Packages Section
$("#packagesnextbtn").on('click', function () {
    debugger;
    var IsAuction = selectedCategoryData.enableAuction && $('#Auction').prop('checked');
    var withFixed = selectedCategoryData.enableFixedPrice && $('#fixed-price-sale').prop('checked');
    var isNegotiable = selectedCategoryData.enableNegotiation && $('#price-is-negotiable').prop('checked');
    if ($("body").hasClass("arabic")) {
        AppendDataInCheckout('#recheck-title-feild-ar', '#rechecktitlefeildid-ar');
        AppendDataInCheckout('#subtitle-ar', '#subtitlee-ar');
        AppendDataInCheckout('#cat-description-field-ar', '#catdescriptionfieldid-ar');
    } else {

        if ($('#recheck-title-feild-en').val() == '' || $('#cat-description-field-en').val() == '' || $('#subtitle-en').val() == '') {
            AppendDataInCheckout('#recheck-title-feild-ar', '#rechecktitlefeildid-ar');
            AppendDataInCheckout('#subtitle-ar', '#subtitlee-ar');
            AppendDataInCheckout('#cat-description-field-ar', '#catdescriptionfieldid-ar');
        } else {
            AppendDataInCheckout('#recheck-title-feild-en', '#rechecktitlefeildid-en');
            AppendDataInCheckout('#cat-description-field-en', '#catdescriptionfieldid-en');
            AppendDataInCheckout('#subtitle-en', '#subtitlee-en');
        };

      
    }
    AppendPic();
    AppendDataInCheckoutDropDown('#country option:selected', '#checkoutcountry');

    AppendDataInCheckoutDropDown('#city-field option:selected', '#cityfield');
    AppendDataInCheckoutDropDown('#country option:selected', '#checkoutcountry_textbox');

    AppendToggleData('#fixed-price-sale', '#fixed-price');
    AppendToggleData('#Auction', '#auctionvalue');
    AppendToggleData('#price-is-negotiable', '#isnegotiable');


    var isBank = $('#SA-bank').prop('checked');
    var isCash = $('#VM-card').prop('checked');
    var creditCard = $('#creditcard').prop('checked');
    var mada = $('#mada').prop('checked');

    if (isCash == true) {
        $('#paymentCash').show();
    } else {
        $('#paymentCash').hide();
    }
    if (isBank == true) {
        $('#paymentVisa').show();
    } else {
        $('#paymentVisa').hide();
    }
    if (creditCard == true) {
        $('#paymentcreditCard').show();
    } else {
        $('#paymentcreditCard').hide();
    }
    if (mada == true) {
        $('#paymentMada').show();
    } else {
        $('#paymentMada').hide();
    }


    AppendPriceInCheckout('#auctionstartPrice', '#auctionstartpriceid');
    AppendPriceInCheckout('#purchasingPrice', '#purchasePrice');
    AppendPriceInCheckout('#minimumPrice', '#minimum-Price');
    var packagePrice = $('#packetPriceee').val();
    if (packagePrice == '') {
        packagePrice = 0;
    }
    var total = 0;



    AppendAddtionalPriceInCheckout((isNaN(selectedCategoryData.enableFixedPriceSaleFee)) ? 0.0 : selectedCategoryData.enableFixedPriceSaleFee, '#EnableFixedPriceSaleFee');
    AppendAddtionalPriceInCheckout((isNaN(selectedCategoryData.enableAuctionFee)) ? 0.0 : selectedCategoryData.enableAuctionFee, '#EnableAuctionFee');
    AppendAddtionalPriceInCheckout((isNaN(selectedCategoryData.enableNegotiationFee)) ? 0.0 : selectedCategoryData.enableNegotiationFee, '#EnableNegotiationFee');
    AppendAddtionalPriceInCheckout((isNaN(selectedCategoryData.productPublishPrice)) ? 0.0 : selectedCategoryData.productPublishPrice, '#productPublishPrice');
    AppendAddtionalPriceInCheckout((isNaN(ProductImageFee)) ? 0.0 : selectedCategoryData.extraProductImageFee, '#ExtraProductImageFee');
    AppendAddtionalPriceInCheckout((isNaN(ProductVidoeFee)) ? 0.0 : selectedCategoryData.extraProductVidoeFee, '#ExtraProductVidoeFee');
    AppendAddtionalPriceInCheckout((isNaN(packagePrice)) ? 0.0 : packagePrice, '#packetPriceee');

    var subTitleFee = 0;
    if ($('#subtitle-en').val().length > 0 || $('#subtitle-ar').val().length > 0) {
        subTitleFee = selectedCategoryData.subTitleFee;
        AppendAddtionalPriceInCheckout((isNaN(subTitleFee)) ? 0.0 : subTitleFee, '#SubTitleFee');
    }
    if (withFixed == false) {
        EnableFixedPriceSaleFee = 0;
    }
    if ($('#EnableFixedPriceSaleFee').val() > 0 && $('#fixed-price-sale').prop('checked')) {
        EnableFixedPriceSaleFee = $('#EnableFixedPriceSaleFee').val()
    }
    if (IsAuction == false) {
        selectedCategoryData.enableAuctionFee = 0;
    }
    if (isNegotiable == false) {
        selectedCategoryData.enableNegotiationFee = 0;
    }

    total = parseFloat(EnableFixedPriceSaleFee) +
        parseFloat(selectedCategoryData.enableAuctionFee) +
        parseFloat(selectedCategoryData.enableNegotiationFee) +
        parseFloat(selectedCategoryData.extraProductImageFee) +
        parseFloat(selectedCategoryData.extraProductVidoeFee) +
        parseFloat(subTitleFee) +
        parseFloat(selectedCategoryData.productPublishPrice) +
        parseFloat(packagePrice);

    total = (isNaN(total)) ? 0 : total;
    $('#totalpriceid').text(total);
    $('#totalpriceid').val(total);
    $('#totalpriceafter').val(total);


    var fixedTime = $('#fixedTime').prop('checked');
    var ownTime = $('#ownTime').prop('checked');
    var duration = "";
    if (fixedTime == true) {
        duration = $("input[type='radio'][name='duration']:checked").val();
    }
    if (ownTime == true) {
        duration = $('.endtime').val();
    }

    if (IsAuction == true) {
        if (duration == undefined || duration == "") {
            $(".auctionTime").hide();
        }
        else {
            $('.auctionClosingTime').text(duration);
        }
    }


    AppendQuantityInCheckout('.qtyValue', '#productqty');
    AppendToggleShippingPickupInCheckout();

    var statusId = $("input[type='radio'][name='brand_new_item']:checked").val();
    if (statusId == 1) {
        $('#conditionidNew').show();
        $('#conditionidUsed').hide();
    }
    else if (statusId == 2) {
        $('#conditionidUsed').show();
        $('#conditionidNew').hide();
    }


    var parent_fieldset = $(this).parents('fieldset');
    var next_step = true;
    var current_active_step = $(this).parents('.form-wizard.custom-wizard-form').find('.form-wizard-step.active');
    if (next_step) {
        parent_fieldset.fadeOut(400, function () {
            // current_active_step.removeClass('active').addClass('activated').next().addClass('active');
            $(this).next().fadeIn();
        });
        var header_height = $("header").innerHeight();
        scroll({
            top: header_height,
            left: 0,
            behavior: 'smooth'
        });
    }

    event.preventDefault();
    const current_accordion = $(this).closest('.card');
    current_accordion.find('.card-header').addClass("completed");
    current_accordion.find('.card-header a').removeClass("collapse").addClass("expand");
    current_accordion.find('.card-body').removeClass("expanded").addClass("collapsed").css("display", "none");
    const next_accordion = current_accordion.next();
    next_accordion.find('.card-header a').removeClass("expand").addClass("collapse");
    next_accordion.find('.card-body').removeClass("collapsed").addClass("expanded").css("display", "block");
    $('html, body').animate({
        //scrollTop: $(next_accordion).offset().top - 100
    }, 1000);
    closeTab = true;
    CloseTabs('my-next-btn');
});
$("#small-ads").click(function () {
    debugger;
    $("#small-ads-wrapper").addClass("selct-ads-style");
    $("#big-ads-wrapper").removeClass("selct-ads-style");
});
$("#big-ads").click(function () {
    debugger;
    $("#small-ads-wrapper").removeClass("selct-ads-style");
    $("#big-ads-wrapper").addClass("selct-ads-style");
});
//#endregion

//#region Checkout button Section
function AddProduct() {

    var categoryId = FinalSubCat;

    var ShippingId = $("input[type='radio'][name='filter-toggle Shipping-Options']:checked").val();
    var PickId = $("input[type='radio'][name='filter-toggle PickUps']:checked").val();

    var shipIds = [];
    shipIds.push(ShippingId);
    shipIds.push(PickId);
    var videos = [];
    for (var i = 1; i < index.length; i++) {
        var value = $('input[name=child_' + i + ']').val();
        if (value != '') {
            videos.push(value);
        }
    }

    var nameEn = $('#recheck-title-feild-en').val();
    var nameAr = $('#recheck-title-feild-ar').val();
    var descriptionEn = $('#cat-description-field-en').val();
    var descriptionAr = $('#cat-description-field-ar').val();
    var subtitleEn = $('#subtitle-en').val();
    var subtitleAr = $('#subtitle-ar').val();


    var Qty = $('.qtyValue').val();

    var countryID = $('#country').val();
    var regionID = $('#region').val();
    var cityID = $('#city-field').val();
    var countryCode = $('#countryCode').val();
    var street = $('#street').val();

    var appointment = $('#address').val();
    var PackID = $("input[type='radio'][name='PackagesID']:checked").val();


    var isCashEnabled = false;
    var paymentOptions = [];
    var isBank = $('#SA-bank').prop('checked');
    var isCash = $('#VM-card').prop('checked');
    var creditCard = $('#creditcard').prop('checked');
    var mada = $('#mada').prop('checked');

    if (isCash == true) {
        isCashEnabled = true;
        paymentOptions.push(1);
    }
    if (isBank == true) {
        paymentOptions.push(2);
    }
    if (creditCard == true) {
        paymentOptions.push(3);
    }
    if (mada == true) {
        paymentOptions.push(4);
    }

    var IsAuction = selectedCategoryData.enableAuctionFee && $('#Auction').prop('checked');
    var withFixed = selectedCategoryData.enableFixedPriceSaleFee && $('#fixed-price-sale').prop('checked');
    var isNegotiable = selectedCategoryData.enableNegotiationFee && $('#price-is-negotiable').prop('checked');

    var isNegotiationOff = $('#price-is-negotiable').prop('checked');
    var AQuestion = false; //$('#AQuestion').prop('checked');
    var isFixedPriceEnabled = false;
    var isSendOffer = false;
    var isNegotiationEnabled = false;
    var isAuctionEnabled = false;
    var StartPrice = 0;
    var LessPrice = 0;
    var NegotiatePrice = 0;
    var Price = 0;
    if (isNegotiationOff == true) {
        isNegotiationEnabled = true;
    }
    else {
        isNegotiationEnabled = false;
    }

    if (withFixed == true) {
        Price = $('#purchasingPrice').val();
        isFixedPriceEnabled = true;
    }
    else {
        isFixedPriceEnabled = false;
        Price = 0;
    }

    if (IsAuction == true) {
        StartPrice = $('#auctionstartPrice').val();
        LessPrice = $('#minimumPrice').val();
        NegotiatePrice = $('#auctionstartPrice').val();
        isAuctionEnabled = true;
    }
    else {
        isAuctionEnabled = false;
    }

    var Status = "";
    if ($('#add-product-new').is(':checked')) {
        Status = "1"
    }
    else if ($('#add-product-used').is(':checked')) {
        Status = "2";
    }
    BankSelected = [];
    $('.selectBank input:checked').each(function () {
        BankSelected.push($(this).val());
    });

    var imagesArray = [];
    var ImageList = [];
    var IDValues = [], IDSubSpec = [];
    var TextValues = [];
    var fileData = new FormData();

    $("[name=PicsList]").each(function () {
        imagesArray.push($(this).attr('src'));

    });
    //var fileUpload = $('#files').get(0);

    for (var i = 0; i < imageArr.length; i++) {
        fileData.append('listImageFile', imageArr[i]);
    }
    var isMain = $("input[type='radio'][name='mainPic']:checked").val();

    let isMainIndex = imagesArray.indexOf(isMain);

    $("h5[name='Specifications']").each(function () {
        IDValues.push($(this).prop('id'))
        TextValues.push($(this).text())
    });
    $(".supSpeci").each(function () {
        var type = $(this).attr('data-type');
        IDSubSpec.push($(this));
    });
    var fixedTime = $('#fixedTime').prop('checked');
    var ownTime = $('#ownTime').prop('checked');

    if (fixedTime == true) {
        duration = $("input[type='radio'][name='duration']:checked").val();
    }
    else if (ownTime == true) {
        duration = $('.endtime').val();
    } else {
        duration = new Date();
    }


    if (duration == undefined) {
        duration = null;
    }
    var pakatPrice = $('#packetPriceee').val();
    var total = $('#totalpriceafter').val();
    var couponId = $('#coupon-id').val();
    //if(couponId == 0 || couponId == undefined){
    //    couponId = null;
    //}
    var couponDiscount = $('#coupon-discount').val();
    var totalBefore = $('#totalBefore').val();
    if (totalBefore == 0 || totalBefore == undefined || totalBefore == '') {
        totalBefore = 0;
    }
    if (couponDiscount == 0 || couponDiscount == undefined || couponDiscount == '') {
        couponDiscount = 0;
    }
    var SubData = new FormData();
    IDValues = Array.from(new Set(IDValues)); // get distinct specification Ids
    for (var x = 0; x < IDValues.length; x++) {
        var specific = $('.supSpeci[data-id=' + IDValues[x] + ']');
        var type = specific.attr('data-type');
        var id = specific.attr('data-id');
        var Spe = TextValues[x];

        if (type == 1) {
            var Sup = specific.find(":selected").text();
            var SupId = specific.find(":selected").val();
            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', SupId);
            fileData.append('productSep[' + x + '].ValueSpeEn', SupId);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 2) {
            var inputs = specific.map(function () {
                return $(this).val();
            }).get();

            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', inputs[0]);
            fileData.append('productSep[' + x + '].ValueSpeEn', inputs[1]);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 3) {
            var longInputs = specific.map(function () {
                return $(this).val();
            }).get();

            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', longInputs[0]);
            fileData.append('productSep[' + x + '].ValueSpeEn', longInputs[1]);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 4) {
            var numberId = specific.val();

            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', numberId);
            fileData.append('productSep[' + x + '].ValueSpeEn', numberId);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 5) {

            var radioId = $("input[type='radio'][name='SupSpeciRadio_" + id + "']:checked").attr("data-subid");
            var radioChecked = $("input[type='radio'][name='SupSpeciRadio_" + id + "']:checked").val();
            if (radioChecked == 'on') {
                if (Spe != undefined) {
                    fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
                    fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
                    fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
                    fileData.append('productSep[' + x + '].ValueSpeAr', radioId);
                    fileData.append('productSep[' + x + '].ValueSpeEn', radioId);
                    fileData.append('productSep[' + x + '].Type', type);
                    fileData.append('productSep[' + x + '].SpecificationId', id);
                }

            }

        }
        else if (type == 6) {
            // var checkboxId = $("input[type='checkbox'][name='SupSpeciCheckbox_" + id + "']:checked").attr("data-subid");
            // var checkboxChecked = $("input[type='checkbox'][name='SupSpeciCheckbox_" + id + "']:checked").val();
            var checkboxId = $("input[type='checkbox'][name='SupSpeciCheckbox_" + id + "']").attr("data-subid");
            var checkboxChecked = $("input[type='checkbox'][name='SupSpeciCheckbox_" + id + "']").val();
            if (checkboxChecked == 'on') {
                if (Spe != undefined) {
                    fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
                    fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
                    fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
                    fileData.append('productSep[' + x + '].ValueSpeAr', checkboxId);
                    fileData.append('productSep[' + x + '].ValueSpeEn', checkboxId);
                    fileData.append('productSep[' + x + '].Type', type);
                    fileData.append('productSep[' + x + '].SpecificationId', id);
                }

            }

        }

    }
    fileData.append('nameAr', nameAr);
    fileData.append('nameEn', nameEn);
    fileData.append('acceptQuestion', AQuestion);
    fileData.append('subTitleAr', subtitleAr);
    fileData.append('isNegotiationOffers', isNegotiationOff);
    fileData.append('withFixedPrice', withFixed);
    fileData.append('isMazad', IsAuction);
    fileData.append('isSendOfferForMazad', isSendOffer);
    fileData.append('subTitleEn', subtitleEn);
    fileData.append('descriptionAr', descriptionAr);
    fileData.append('descriptionEn', descriptionEn);
    fileData.append('qty', Qty);
    fileData.append('price', Price);
    fileData.append('priceDisc', "0");
    fileData.append('streetName', street);
    fileData.append('codeRegion', countryCode);
    fileData.append('startPriceMazad', StartPrice);
    fileData.append('lessPriceMazad', LessPrice);
    fileData.append('mazadNegotiatePrice', NegotiatePrice);
    fileData.append('appointment', appointment);
    fileData.append('status', Status);
    fileData.append('categoryId', categoryId);
    fileData.append('countryId', countryID);
    fileData.append('regionId', regionID);
    fileData.append('neighborhoodId', cityID);
    fileData.append('pakatId', PackID);
    fileData.append('MainImageIndex', isMainIndex);
    fileData.append('mazadNegotiateForWhom', 1);
    fileData.append('ShippingOptions', shipIds);//JSON.stringify(shipIds)
    fileData.append('videoUrl', videos);
    fileData.append('PaymentOptions', paymentOptions);
    fileData.append('BankAccountId', BankAccountId);
    fileData.append('IsCashEnabled', isCashEnabled);
    fileData.append('IsNegotiationEnabled', isNegotiationEnabled);
    fileData.append('IsFixedPriceEnabled', isFixedPriceEnabled);
    fileData.append('AuctionClosingTime', duration);
    fileData.append('AuctionNegotiatePrice', NegotiatePrice);
    fileData.append('IsAuctionEnabled', isAuctionEnabled);

    fileData.append('ProductPublishPrice', selectedCategoryData.productPublishPrice);
    fileData.append('EnableFixedPriceSaleFee', EnableFixedPriceSaleFee);
    fileData.append('EnableAuctionFee', EnableAuctionFee);
    fileData.append('EnableNegotiationFee', selectedCategoryData.enableNegotiationFee);
    fileData.append('ExtraProductImageFee', selectedCategoryData.extraProductImageFee);
    fileData.append('ExtraProductVidoeFee', selectedCategoryData.extraProductVidoeFee);
    fileData.append('SubTitleFee', selectedCategoryData.subTitleFee);
    fileData.append('typePay', 1);
    fileData.append('TotalAmountBeforeCoupon', totalBefore);
    fileData.append('TotalAmountAfterCoupon', total);
    fileData.append('CouponDiscountValue', couponDiscount);
    fileData.append('CouponId', couponId);
    fileData.append('ProductBankAccounts', BankSelected);

    $.ajax({
        type: 'Post',
        url: '/Advertisement/AddToSell',
        contentType: false,
        processData: false,
        data: fileData,
        success: function (response) {
            if (response != "") {
                var jsonResult = JSON.parse(response);
                $('#productId').val(jsonResult.data);
                setCookie("ProductId", jsonResult.data, 90);
                $('#AddedProductSuccessfullyModal').modal('show');
                //window.location.href = '@Url.Action("Selling","User")';
            }
        },
        error: function (result) {

            if (result.status_code == 200) {

            }

        }
    });
}
//#endregion

//#region View the product in popup after adding checkout
$(".btn-product-details").click(function () {
    var id = getCookie("ProductId");
    window.location.href = '/Home/GetProductById?id=' + id + '&CurrentPageName=Index';
    setCookie("ProductId", '', 90);
});
//#endregion

const imageArr = [];
const fileInput = document.querySelector("#files");
fileInput.addEventListener("change", () => {
    for (const file of fileInput.files) {
        imageArr.push(file);
    }
});


function CloseTabs(className) {

    $('body').on('click', '.' + className, function (event) {
        if (closeTab == true) {
            event.preventDefault();
            const current_accordion = $(this).closest('.card');
            current_accordion.find('.card-header').addClass("completed");
            current_accordion.find('.card-header a').removeClass("collapse").addClass("expand");
            current_accordion.find('.card-body').removeClass("expanded").addClass("collapsed").css("display", "none");
            const next_accordion = current_accordion.next();
            next_accordion.find('.card-header a').removeClass("expand").addClass("collapse");
            next_accordion.find('.card-body').removeClass("collapsed").addClass("expanded").css("display", "block");
            closeTab = false;
        }
    })
}

$(document).ready(function () {
    GetConfigurationByName();
    var uid = localStorage.getItem("loggedIn");
    $("#listingtitle").focusout(function () {
        debugger;
        var get_tiltle = $("#listingtitle").val();
        $("#recheck-title-field:text").val(get_tiltle);
    });
    if ($("#radiofixprice").prop("checked", true)) {
        $("#fixed-rate-auction").addClass("auction-color");
    }
});

function SelectPack(id, price) {
    var header = {
        'Authorization': 'Bearer ' + token,
        'Provider-Id': providerId,
        'User-Language': lang,
        'Application-Source': "Website"
    };
    $.ajax({
        headers: header,
        type: 'GET',
        url: eCommerceAPIUrl + '/api/v1/GetPakaById?Pakatid=' + id + '&lang=' + lang,
        success: function (result) {
            $('#packetPriceee').val(price);
            $('#packagePrice').text(price);
            var data = $('input[name="mainPic"]:checked').val();
            if (result.status_code == 200) {
                if (ExtraProductImageCountNeed > 0 || ExtraProductVidoeCountNeed > 0) {

                    var ExtraProductImageCountWithPacket = 0, ExtraProductVidoeCountWithPacket = 0;

                    ExtraProductImageCountWithPacket = result.data.countImage - ExtraProductImageCountNeed;
                    ExtraProductVidoeCountWithPacket = result.data.countVideo - ExtraProductVidoeCountNeed;

                    if (ExtraProductImageCountWithPacket < 0) {
                        ExtraProductImageCountWithPacket = ExtraProductImageCountWithPacket * -1;
                    }
                    if (ExtraProductVidoeCountWithPacket < 0) {
                        ExtraProductVidoeCountWithPacket = ExtraProductVidoeCountWithPacket * -1;
                    }
                    ProductImageFee = ExtraProductImageCountWithPacket * selectedCategoryData.extraProductImageFee;
                    ProductVidoeFee = ExtraProductVidoeCountWithPacket * selectedCategoryData.extraProductVidoeFee;
                    TotalVee = ProductImageFee + ProductVidoeFee;

                    var Package = '';

                    Package += '<div class="col-lg-6"><div class="price-table-single-main-wrapper">' +
                        '<label for="Packages' + 0 + '"class="price-table-common-style">';

                    Package += '<div class="price-table-main-header with-main-color">';

                    Package += '<div class="price-table-main-placeholder">' +
                        '<div class="package-name"><h6>Extra Package </h6></div>' +
                        '<div class="package-price"><label>' + TotalVee + '<span> S.R</span></label></div></div>';

                    Package += '<div class="mostly-buy-plan"><label>ExtraFee</label></div></div>';
                    Package += '<ul>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Extra Product Image Count: <span style="margin-left: 10px; font-weight:bold;">' + ExtraProductImageCountWithPacket + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Extra Product Vidoe Count: <span style="margin-left: 10px; font-weight:bold;">' + ExtraProductVidoeCountWithPacket + '</span></label></div></div></li>' +

                        '</ul></label></div></div>';

                    $('#ExtraPackage').css("display", "block");
                    $('#ExtraPackageSection').html(Package);
                }

                if (result.data.countImage < imageArr.length) {
                    $('#alert' + id + '').show().delay().fadeOut(5000);
                    $('#Packages' + id + '').prop('checked', false);
                    $('#PackageEff').css("display", "none");

                }
                else {
                    var Size = "";
                    if (result.data.productSze == 1) {
                        Size = "ads-card-main-wrapper small-scale-ads";
                        var FontSize = "0 % Bigger"
                        $('#AdsChanges').html(FontSize);
                        $("#big-ads-wrapper").attr('class', 'ads-card-main-wrapper small-scale-ads');
                        $('#PackImage1').attr('src', '' + data + '');
                        $('#PackImage2').attr('src', '' + data + '');
                        $('#PackName1').html($('#recheck-title-feild-en').val())
                        $('#PackName2').html($('#recheck-title-feild-en').val())
                        $('#PackCountry1').html($("#region option:selected").text())
                        $('#PackCountry2').html($("#region option:selected").text())
                        $('#PackPrice1').html($('#purchasingPrice').val() + " S.R");
                        $('#PackTot1').html($('#purchasingPrice').val() + " S.R");
                        $('#PackTot2').html($('#purchasingPrice').val() + " S.R");
                        $('#PackPrice2').html($('#purchasingPrice').val() + " S.R");

                    }
                    else {
                        Size = "ads-card-main-wrapper big-scale-ads";
                        var FontSize = "50 % Bigger";
                        $("#big-ads-wrapper").attr('class', 'ads-card-main-wrapper big-scale-ads');
                        $('#PackImage1').attr('src', '' + data + '');
                        $('#PackImage2').attr('src', '' + data + '');
                        $('#PackName1').html($('#recheck-title-feild-en').val())
                        $('#PackName2').html($('#recheck-title-feild-en').val())
                        $('#PackCountry1').html($("#region option:selected").text())
                        $('#PackCountry2').html($("#region option:selected").text())
                        $('#PackPrice1').html($('#purchasingPrice').val() + " S.R");
                        $('#PackPrice2').html($('#purchasingPrice').val() + " S.R");
                        $('#PackTot1').html($('#purchasingPrice').val() + " S.R");
                        $('#PackTot2').html($('#purchasingPrice').val() + " S.R");

                    }
                    $('#PackageEff').css("display", "block");
                }
            }
        },
        error: function (result) {

        }
    });
}

$("#maincatsearchbtn").click(function () {

    ValidateTextBox('#listingtitle');
    var Name = $('#listingtitle').val();
    if (Name == "") {
        $('#CategorirsList').hide();
        $('#categoryMain').show();
        $('#subcat1').hide();
        $('#subcat2').hide();
        $('#subcat3').hide();
        $('#subcat4').hide();
        $('#subcat5').hide();
        $('#subcat6').hide();
    }
    else {
        $.ajax({
            type: 'GET',
            headers: requestHeaders(),
            url: eCommerceAPIUrl + '/api/v1/GetListCategoriesByProductName?productName=' + Name + '&lang=' + lang,
            success: function (result) {

                var categories = '';
                $.each(result.data, function (index, item) {
                    categories += '<div class="edit-profile-menuSingle" style="padding:0px 40px 0px 25px;">' +
                        '<div class="edit-profile-item">' +
                        '<label>' + item.category + '</label>' +
                        '</div>' +
                        '<div class="edit-profile-value">' +
                        '<div class="editprofile-radio">' +
                        '<label>' +
                        '<input type="radio" name="SuggestedCat" value="' + item.productCategoryId + '" id="' + item.productCategoryId + '" data-name="' + item.category + '" class="radio-btn"  />' +
                        '<span class="rdo"></span>' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<br />';

                });
                $('#CategorirsList').html(categories);

                $('#CategorirsList').show();
                $('#categoryMain').hide();
                $('#subcat1').hide();
                $('#subcat2').hide();
                $('#subcat3').hide();
                $('#subcat4').hide();
                $('#subcat5').hide();
                $('#subcat6').hide();

            },
            error: function (result) {

                if (result.status_code == 200) {

                }

            }
        });
    }

});

function SearchCategory() {
    jQuery('#catnextbtn').css('opacity', '0.5');
    $('#catnextbtn').prop('disabled', 'true');
    var Name = $('#listingtitle').val();
    if (Name == "") {
        $('#CategorirsList').hide();
        $('#categoryMain').show();
        $('#subcat1').hide();
        $('#subcat2').hide();
        $('#subcat3').hide();
        $('#subcat4').hide();
        $('#subcat5').hide();
        $('#subcat6').hide();
    }
    else {
        $.ajax({
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + $('#token').val(),
                'Provider-Id': providerId,
                'User-Language': lang,
                'Application-Source': "Website"
            },
            url: eCommerceAPIUrl + '/api/v1/GetListCategoriesByProductName?productName=' + Name + '&lang=@ViewBag.v',
            success: function (result) {

                var categories = '';
                $.each(result.data, function (index, item) {
                    categories += '<div class="edit-profile-menuSingle" style="padding:0px 40px 0px 25px;">' +
                        '<div class="edit-profile-item">' +
                        '<label>' + item.category + '</label>' +
                        '</div>' +
                        '<div class="edit-profile-value">' +
                        '<div class="editprofile-radio">' +
                        '<label>' +
                        '<input type="radio" name="SuggestedCat" value="' + item.productCategoryId + '" id="' + item.productCategoryId + '" data-name="' + item.category + '" class="radio-btn"  />' +
                        '<span class="rdo"></span>' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<br />';

                });
                $('#CategorirsList').html(categories);

                $('#CategorirsList').show();
                $('#categoryMain').hide();
                $('#subcat1').hide();
                $('#subcat2').hide();
                $('#subcat3').hide();
                $('#subcat4').hide();
                $('#subcat5').hide();
                $('#subcat6').hide();

            },
            error: function (result) {

                if (result.status_code == 200) {

                }

            }
        });
    }
}
function GetConfigurationByName() {
    $.ajax({
        type: 'Get',
        dataType: "json",
        url: '/Advertisement/GetConfigurationByName?key=ShowProductQuantityInAddProduct',
        success: function (result) {
            if (result.data) {
                if (result.data.configValue == "1") {
                    $("#Quanti").show();
                } else {
                    $("#Quanti").hide();
                }
            }
            else {
                $("#Quanti").hide();
            }
        },
        error: function (response) {

        }

    });
}
function GetCouponByCode() {
    var code = $('#coupon-code').val();
    if (code == '') {
        $("#invalid-coupon-code").text("Please enter coupon code").show();
        return;
    }
    $.ajax({
        type: 'Get',
        dataType: "json",
        url: '/Advertisement/GetCouponByCode?couponCode=' + code + '&couponScreen=1',
        success: function (result) {

            if (result.data) {
                var data = result.data;
                var html = '', totalBefor = 0;
                $("#invalid-coupon-code").hide();
                $("#total-price-for-cart-before-discount").show();
                var total = $('#totalpriceid').val();
                totalBefor = total;
                if (data.discountTypeID == "FixedAmount") {
                    total = total - data.discountValue;
                }
                else {
                    total = total - (total * data.discountValue / 100);
                }

                //$('#totalpriceid').text(total);
                $('#totalpriceid').val(total);
                $('#coupon-id').val(data.id);
                $('#coupon-discount').val(data.discountValue);
                $('#totalBefore').val(totalBefor);
                html = '<div class="row color-setting">' +
                    '<div class="col-lg-6 color-setting">' +
                    '<label class="color-setting mt-5" style="text-decoration: line-through;" id="totalBefore">' + totalBefor + Main_SR +' </label>' +
                    '</div>' +
                    '<div class="col-lg-6 color-setting">' +
                    '<label class="color-setting mt-5" id="totalpriceid">' + total + '   @MalqaaWebApp.Resources.Resources.SR</label>' +
                    '<input id="totalpriceafter" type="hidden"  value="' + total + '"/> ' +
                    '</div>' +
                    '</div>';

                $('.totalAfter').empty().html(html);
                showAlert('Success', 'Coupon Apply Successfully', 'success');
                $('.applyCoupon').prop('disabled', 'true');

            }
            else {
                showAlert("Coupon", result.message, "error");
            }
        },
        error: function (response) {

        }

    });
}
function ValidateTextBox(id) {
    debugger;
    if ($(id).val() == '')
        $(id).css('border-color', 'red');
    else
        $(id).css('border-color', '');
}
function ValidateTextBox(id) {
    debugger;
    if ($(id).val() == '')
        $(id).css('border-color', 'red');
    else
        $(id).css('border-color', '');
}
function ValidateToggleBtn(id) {
    if ($(id).attr('class') == 'filter__item_checkbox')
        $(id).css('border-color', 'red');
    else
        $(id).css('border-color', '');
}
function RemoveValidationBorderColor(id) {
    $(id).css('border-color', '');
}
$('#purchasingPrice').on('keypress', function () {
    if ($(this).val().length > 0)
        RemoveValidationBorderColor('#purchasingPrice');
});
$('#shippingtimeid').on('keypress', function () {
    if ($(this).val().length > 0)
        RemoveValidationBorderColor('#shippingtimeid');
});
$('#recheck-title-feild-en').on('keypress', function () {
    if ($(this).val().length > 0)
        RemoveValidationBorderColor('#recheck-title-feild-en');
});
$('#recheck-title-feild-ar').on('keypress', function () {
    if ($(this).val().length > 0)
        RemoveValidationBorderColor('#recheck-title-feild-ar');
});
$('#list_duration').on('change', function () {
    $('#list_duration').css('border-color', '');
});
$('#shippingtimeid').on('change', function () {
    $('#shippingtimeid').css('border-color', '');
});
