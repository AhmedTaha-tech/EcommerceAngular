 

var basicAPI = localStorage.getItem("basicAPI");
var token = localStorage.getItem("jwttoken");
var providerId = localStorage.getItem("loggedIn");
var lang = localStorage.getItem("lang");
var isAr = false;

function BackToEdit() {
    $('#product-confirmation').hide();
    $('#edit-product').show();
}
var isMainIndex = 0;
$(window).on('load', function () {
   
    if (lang == "ar") {
        isAr = true;
    } else {
        isAr = false;
    }
    isMainIndex = $("input[type='radio'][name='mainPic']").index();

    $(".date-of-birth-picker").flatpickr({
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: new Date(),
    });

    if (isAuctionEnabled == "True") {
        $(".auctionTime").show();
        $(".AuctionstartPrice").show();
        $(".MinimumPrice").show();
        $(".Auction").show();
    } else {
        $(".auctionTime").hide();
        $(".AuctionstartPrice").hide();
        $(".MinimumPrice").hide();
        $(".Auction").hide();
    }
    if (isFixedPriceEnabled == "True" || isNegotiationEnabled == "True") {
        $(".purchasing-Price").show();
    } else {
        $(".purchasing-Price").hide();
    }
    if (shippingOptionId > 3) {
        $(".shippingoptions").show();
    } else {
        $(".shippingoptions").hide();
    }
    $("#maincat option:selected").prop("selected", false);
    $("#maincat option:first").prop("selected", "selected");
    $(".chosen-select").chosen();
    $('#subcat1').hide();
    $('#subcat2').hide();
    $('#subcat3').hide();
    $('#subcat4').hide();
    $('#subcat5').hide();
    $('#subcat6').hide();
    //$(".settime-input").flatpickr({
    //    enableTime: true,
    //    dateFormat: "Y/m/d H:i",
    //    wrap: true,
    //});
    GetConfigurationByName();
    GetPackages(cateId);
    getDuration();

    if (editOrRepost == 1) {
        $("#search-category").css('display', 'none');
        $(".auctionTime").css('display', 'none');
        $(".pactSection").css('display', 'none');

        $('#fixed-price-sale').prop('disabled', 'true');
        $('#Auction').prop('disabled', 'true');
        $('#price-is-negotiable').prop('disabled', 'true');

        if (subTitleEn == "") {
            $('#subtitle-en').prop('disabled', 'true');
        } else {
            $("#subtitle-en").removeAttr('disabled');
        }
        if (subTitleAr == "") {
            $('#subtitle-ar').prop('disabled', 'true');
        } else {
            $("#subtitle-ar").removeAttr('disabled');
        }

    } else {        
        $("#fixed-price-sale").removeAttr('disabled');
        $("#Auction").removeAttr('disabled');
        $("#price-is-negotiable").removeAttr('disabled');
        $("#subtitle-en").removeAttr('disabled');
        $("#subtitle-ar").removeAttr('disabled');
    }

    AppendToggleShippingPickupInCheckout();


});

//I added event handler for the file upload control to access the files properties.
document.addEventListener("DOMContentLoaded", init, false);

//To save an array of attachments
var AttachmentArray = [];
var DeletedImagesArray = [];

//counter for attachment array
var arrCounter = 0;
var counter = 0;
//to make sure the error message for number of files will be shown only one time.
var filesCounterAlertStatus = false;

//un ordered list to keep attachments thumbnails
var ul = document.createElement("ul");
ul.className = "thumb-Images";
ul.id = "imgList";

function init() {

    //add javascript handlers for the file upload event
    document
        .querySelector("#files")
        .addEventListener("change", handleFileSelect, false);
}

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
    $(document).on("click", ".img-wrap .closeOld", function () {
        var oldId = $(this).attr('data-id');
        var oldPic = $(this).attr('data-old');
        DeletedImagesArray.push(oldId);
        $(this).hide();
        $(this).parent().find("img").not().hide();
        $('#oldImage-' + oldId).remove();
        //$('#oldImage-' + oldId).css('display', 'none');
        $('.list-photo .mainPic ')[0].checked = true
    });

    $(document).on("click", ".removeVedio", function () {
        var vedioId = $(this).attr('data-id');

        DeletedImagesArray.push(vedioId);
        $(this).hide();
        $('.oldVedio_' + vedioId).css('display', 'none');
    });

    $("div").on("click", ".img-wrap .close", function () {
        var id = $(this).attr('data-id');
        //var id = $(this)
        //    .closest(".img-wrap")
        //    .find("img")
        //    .data("id");

        $(this).hide();
        $(this).parent().find("img").not().hide();
        document.getElementById("Preview/" + id + "").remove();

        //to remove the deleted item from array
        //var elementPos = AttachmentArray.map(function (x) {
        //    return x.FileName;
        //}).indexOf(id);

        //if (elementPos !== -1) {
        //    AttachmentArray.splice(elementPos, 1);
        //    imageArr.splice(elementPos, 1);
        //}

        ////to remove image tag
        //$(this).parent().find("img").not().remove();

        ////to remove div tag that contain the image
        //$(this)
        //    .parent()
        //    .find("div")
        //    .not()
        //    .remove();

        ////to remove div tag that contain caption name
        //$(this)
        //    .parent()
        //    .parent()
        //    .find("div")
        //    .not()
        //    .remove();

        ////to remove li tag
        //var lis = document.querySelectorAll("#imgList");
        //for (var i = 0; (li = lis[i]); i++) {
        //    if (li.innerHTML == "") {
        //        document.getElementById("Preview/" + id + "").remove();
        //    }
        //}

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
    if (fileSize < 300000) {
        return true;
    } else {
        return false;
    }
    return true;
}

//To check files count according to upload conditions
function CheckFilesCount(AttachmentArray) {
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

//Render attachments thumbnails.
function RenderThumbnail(e, readerEvt) {
    var li = document.createElement("li");
    ul.appendChild(li);
    var mainPic = (isAr) ? 'الصورة الرئيسية' : 'Main Picture';
    var Image =
        '<div class="col-lg-2 mt-3"  id="Preview/' + readerEvt.name + '"><div class="custome-file" id="imgList"><div class="img-wrap"><span class="close" data-id="' + readerEvt.name + '" style="cursor:pointer;display:flex;width: 30px;"><img src="/assets/images/sellPage/close.svg"></span>' +
        '<img style ="width: 100%; max-width: 175px; height:140px; margin-right:-10px;" name="PicsList" data-image="' + e.target.result + '" class="thumb showImage" src="' +
        e.target.result +
        '" title="' +
        escape(readerEvt.name) +
        '" data-id="' +
        readerEvt.name +
        '"/><div class="row" style="margin-left: 0px;height: 31px;width: 100%;background: #ee6c4d;max-width: 175px;">' +
        '<div class="col-lg-10"><label style="color: white;margin-top: 0px; float: left;">' + mainPic +'</label></div>' +
        '<div class="col-lg-2"><input data-id="Preview/' + readerEvt.name + '" id="Preview/' + readerEvt.name + '" type="radio" class="mainPic" name="mainPic" value="' + e.target.result + '" style="margin-top: 8px;"></div>' +
        '</div></div></div></div>';

    //var Image =
    //    '<div class="col-lg-2 mt-3" id="Preview/' + readerEvt.name + '"><div class="custome-file"id="imgList"><div class="img-wrap" style="margin-top: -25px;"><i class="fa remove-img" style="cursor:pointer;display:flex;">&#xf00d;</i>' +
    //    '<img style ="height:140px;width:171px;" name="PicsList" data-image="' + e.target.result + '" class="thumb showImage" src="' +
    //    e.target.result +
    //    '" title="' +
    //    escape(readerEvt.name) +
    //    '" data-id="' +
    //    readerEvt.name +
    //    '"/><div class="row" style="margin-left: 0px;height: 31px;max-width: 171px;width: 100%;background: #ee6c4d;">' +
    //    '<div class="col-lg-9"><label style="color: white;margin-top: 0px; float: left">Main Picture</label></div>' +
    //    '<div class="col-lg-3"><input id="Preview/' + readerEvt.name + '" type="radio" class="mainPic" name="mainPic" value="' + e.target.result + '" style="margin-top: 8px;"></div>' +
    //    '</div></div></div></div>';

    var div = document.createElement("div");
    div.className = "FileNameCaptionStyle";
    li.appendChild(div);
    div.innerHTML = [readerEvt.name].join("");
    $('#ImagesList').before(Image)
    //document.getElementById("ImagesList").insertBefore(li, null);
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

function checkFiles(files) {
    if (files.length > 10) {
        alert("length exceeded; files have been truncated");

        let list = new DataTransfer;
        for (let i = 0; i < 10; i++)
            list.items.add(files[i])

        document.getElementById('files').files = list.files
    }
}

var index = [];
// Array starts with 0 but the id start with 0 so push a dummy value
index.push(0);
// Push 1 at index 1 since one child element is already created
index.push(1)

function addkid() {
    var value = $('input[name=child_' + count + ']').val();
    if (value != '' && value != undefined) {
        var id = getID();
        var div = document.createElement('div');
        // Set this attritube id so that we can access this element using Id
        div.setAttribute("id", "Div_" + id);

        div.innerHTML = '<div class="row">' +
            '<div class="col-md-6 col-sm-6">' +
            '<input type="text" name="child_' + id + '" class="accord-inner-input"  placeholder="Please enter a vedio link"/>' +
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

var className = '';
function hideSec1() {
    $('#search-category').css('display', 'none');
    $('#btnShow1').css('display', 'block');
}

function ShowSec1() {
    $(".collapse1-1").removeClass("expand").addClass("collapse");
    $("#collapse1-1").removeClass("collapsed").addClass("expanded").css("display", "none");
    $('#search-category').css('display', 'block');
    $('#btnShow1').css('display', 'none');
}
$("#catnextbtn").click(function () {
    $(".collapse1-1").removeClass("expand").addClass("collapse");
    $("#collapse1-1").removeClass("collapsed").addClass("expanded").css("display", "block");
});
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

$(document).on('change', 'input[name=SuggestedCat]:radio:checked', function () {
    var catID = $(this).val();
    var searchKey = $("#listingtitle").val(); //$(this).attr('data-name');//listingtitle
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    FinalSubCat = this.value;
    $('#SubcatTitle').html(FinalSubCat);
    $('#listProductSep').hide();
    subCatLOne = FinalSubCat;
    var subCatLOneKey = subCatLOne.split("-");
    $('input[name="subCatOne"]').val(subCatLOneKey[0]);
    $('input[name="subCatOneKey"]').val(subCatLOne);
    $('#recheck-title-feild-en').val(searchKey);
    $('#recheck-title-feild-en').text(searchKey);
    breadcrums = subCatLOneKey[0];
    if (catID) {
        $.ajax({
            headers:
            {
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: '/Advertisement/GetSubCategoryByCategoryId?id=' + catID,
            success: function (html) {

                $("#catnextbtn").removeAttr('disabled');
                jQuery('#catnextbtn').css('opacity', '1');
                if ((html.data.length > 0) || (html.subdata.length > 0)) {

                    if (html.data.length > 0) {
                        FreeProductImagesCount = html.data[0].freeProductImagesCount;
                        FreeProductVidoesCount = html.data[0].freeProductVidoesCount;
                        ExtraProductImageFee = html.data[0].extraProductImageFee;
                        ExtraProductVidoeFee = html.data[0].extraProductVidoeFee;
                        EnableAuction = html.data[0].enableAuction;
                        EnableNegotiation = html.data[0].enableNegotiation;
                        MinimumBidValue = html.data[0].minimumBidValue;
                        SubTitleFee = html.data[0].subTitleFee;
                        AuctionClosingPeriods = html.data[0].auctionClosingPeriods;
                        AuctionClosingPeriodsUnit = html.data[0].auctionClosingPeriodsUnit;
                        EnableFixedPriceSaleFee = html.data[0].enableFixedPriceSaleFee;
                        EnableAuctionFee = html.data[0].enableAuctionFee;
                        EnableNegotiationFee = html.data[0].enableNegotiationFee;
                        productPublishPrice = html.data[0].productPublishPrice;
                        $('#EnableFixedPriceSaleFee').text(html.data[0].enableFixedPriceSaleFee);
                        $('#EnableAuctionFee').val(html.data[0].enableAuctionFee);
                        $('#EnableNegotiationFee').val(html.data[0].enableNegotiationFee);
                        $('#productPublishPrice').val(html.data[0].productPublishPrice);
                        $('#SubTitleFee').val(html.data[0].subTitleFee);
                        $('#ExtraProductImageFee').val(html.data[0].extraProductImageFee);
                        $('#ExtraProductVidoeFee').val(html.data[0].extraProductVidoeFee);

                        $(".auctionClosingTimeFee").text('+ ' + html.data[0].auctionClosingTimeFee + ' SR');
                        /* duration option */
                        var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
                        var lable = '';
                        if (html.data[0].auctionClosingPeriodsUnit == 1) {
                            oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Day';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 2) {
                            oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Week';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 3) {
                            oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Month';
                        }


                        var duration = '';
                        duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
                            '<div style="margin-top:-35px;display:flex;">' +
                            '<div class="button">' +
                            '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                            '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                            '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                            '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                            '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.list_duration_weeks').append(duration);
                    }
                    $('#listProductSep').empty();
                    var Specefications = '';
                    for (var x = 0; x < html.subdata.length; x++) {

                        Specefications += '<h5 class="sell-common-heading" id="' + html.subdata[x].id + '" name="Specifications">' + html.subdata[x].name + '</h5>';

                        if (html.subdata[x].type == 1 || html.subdata[x].type == 7) {
                            Specefications += '<div class="sell-main-catagory-customdropdown"><select data-id="' + html.subdata[x].id + '" data-type="' + html.subdata[x].type + '" id="SubSP' + html.subdata[x].id + '"'
                                + 'data-placeholder="cars, real estate, animals..." class="chosen-select">';
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<option value="' + html.subdata[x].subSpecifications[a].id + '">' + html.subdata[x].subSpecifications[a].nameEn + '</option>';
                            }
                            Specefications += '</select></div>';

                        }
                        else if (html.subdata[x].type == 2) {
                            Specefications += '<input type="text" id="' + html.subdata[x].id + '" name="Title" data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" class="accord-inner-input supSpeci" placeholder="Type the ' + html.subdata[x].name + ' Name" required="">';
                        }
                        else if (html.subdata[x].type == 3) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<textarea id="' + html.subdata[x].subSpecifications[a].id + '" name="Title" data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" class="accord-inner-input supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required=""></textarea>';
                            }
                        }
                        else if (html.subdata[x].type == 4) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<input id="' + html.subdata[x].subSpecifications[a].id + '" type="number"  data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" name="Title" class="accord-inner-input supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required="">';
                            }
                        }
                        else if (html.subdata[x].type == 5) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<lable  for="' + html.subdata[x].subSpecifications[a].id + '" >' + html.subdata[x].subSpecifications[a].nameEn + '</lable>';
                                Specefications += '<input id="' + html.subdata[x].subSpecifications[a].id + '" type="radio"  data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" name="SupSpeciRadio" class="ml-10 supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required=""> </br>';

                            }
                        }
                        else if (html.subdata[x].type == 6) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<lable  for="' + html.subdata[x].subSpecifications[a].id + '" >' + html.subdata[x].subSpecifications[a].nameEn + '</lable>';
                                Specefications += '<input id="' + html.subdata[x].subSpecifications[a].id + '" type="checkbox"  data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" name="SupSpeciCheckbox" class="ml-10 supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required=""> </br>';

                            }
                        }
                    }
                    $('#SpeAndSubForm').html(Specefications);
                    $(".chosen-select").chosen();

                }
                else {
                    PopulateTemplate(valueSelected);
                    $('#subcat1').hide();
                    $('#subcat2').hide();
                    $('#subcat3').hide();
                    $('#subcat4').hide();
                    $('#subcat5').hide();
                    $('#subcat6').hide();
                }

            }
        });

        GetPackages(catID);

    }

});
$('.collapse1-1').click(function () {
    var categoryId = $("input[name=SuggestedCat]:radio:checked").val();
    if (categoryId == "" || categoryId == null || categoryId == undefined) {
        if ($('#SuggestedCat').val() == "" || $('#SuggestedCat').val() == null) {
            categoryId = $('#subcatlevel6').val();
        }
        if ($('#subcatlevel6').val() == "" || $('#subcatlevel6').val() == null) {
            categoryId = $('#subcatlevel5').val();
        }
        if ($('#subcatlevel5').val() == "" || $('#subcatlevel5').val() == null) {
            categoryId = $('#subcatlevel4').val();
        }
        if ($('#subcatlevel4').val() == "" || $('#subcatlevel4').val() == null) {
            categoryId = $('#subcatlevel3').val();
        }
        if ($('#subcatlevel3').val() == "" || $('#subcatlevel3').val() == null) {
            categoryId = $('#subcatlevel2').val();
        }
        if ($('#subcatlevel2').val() == "" || $('#subcatlevel2').val() == null) {
            categoryId = $('#subcatlevel1').val();
        }
        if ($('#subcatlevel1').val() == "" || $('#subcatlevel1').val() == null) {
            categoryId = $('#maincat').val();
        }
    }

    if (categoryId == "" || categoryId == null || categoryId == undefined) {
        $("#CheckCategoryModal").modal("show");
    }
    else {

        let className = document.getElementById("photoSection").className;
        if (className == "collapse1-1 collapse") {
            $(".collapse1-1").addClass("expand").removeClass("collapse");
            $("#collapse1-1").addClass("collapsed").removeClass("expanded").css("display", "none");
        } else {
            $(".collapse1-1").removeClass("expand").addClass("collapse");
            $("#collapse1-1").removeClass("collapsed").addClass("expanded").css("display", "block");
        }
    }

});
$('.collapse1-2').click(function () {
    var isMain = $("input[type='radio'][name='mainPic']:checked").val();
    if (isMain == undefined) {
        $('.custome-file').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#imageFiles").offset().top
        }, 500);

        $("#CheckOnMainImageModal").modal("show");
    }
    else {
        let className = document.getElementById("itemDetails").className;
        if (className == "collapse1-2 collapse") {
            $(".collapse1-2").addClass("expand").removeClass("collapse");
            $("#collapse1-2").addClass("collapsed").removeClass("expanded").css("display", "none");
        } else {
            $(".collapse1-2").removeClass("expand").addClass("collapse");
            $("#collapse1-2").removeClass("collapsed").addClass("expanded").css("display", "block");
        }
    }



});
$('.collapse1-3').click(function () {

    var IDValues = [];
    var TextValues = [];
    $("h5[name='Specifications']").each(function () {
        IDValues.push($(this).prop('id'))
        TextValues.push($(this).text())
    });

    if (IDValues.length > 0 && TextValues.length > 0) {

        let className = document.getElementById("listingDetails").className;
        if (className == "collapse1-3 collapse") {
            $(".collapse1-3").addClass("expand").removeClass("collapse");
            $("#collapse1-3").addClass("collapsed").removeClass("expanded").css("display", "none");
        } else {
            $(".collapse1-3").removeClass("expand").addClass("collapse");
            $("#collapse1-3").removeClass("collapsed").addClass("expanded").css("display", "block");
        }

    } else {
        $('#CheckSpecificationModal').modal("show");
    }


});

$('.collapse1-4').click(function () {

    var countryID = $('#country').val();
    var regionID = $('#region').val();
    var cityID = $('#city-field').val();
    var qty = $('.qtyValue').val();
     
    if ($('#recheck-title-feild-ar').val() == "") {

        $('#recheck-title-feild-ar').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckProductNameModal').modal("show");
    }
    if (qty <= 0) {
        $('#qtyValue').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckQtyModal').modal("show");
    }
    else if ($('#country').val() == "0") {
        $('#country').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckCountryModal').modal("show");

    }
    else if ($('#region').val() == null) {
        $('#region').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckRegionModal').modal("show");
    }
    else if ($('#city-field').val() == null) {
        $('#city-field').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckCityModal').modal("show");
    } else {
        let className = document.getElementById("salesDetails").className;
        if (className == "collapse1-4 collapse") {
            $(".collapse1-4").addClass("expand").removeClass("collapse");
            $("#collapse1-4").addClass("collapsed").removeClass("expanded").css("display", "none");
        } else {
            $(".collapse1-4").removeClass("expand").addClass("collapse");
            $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");
        }
    }


});
$('.collapse1-5').click(function () {
    var IsAuction = $('#Auction').prop('checked');
    var withFixed = $('#fixed-price-sale').prop('checked');
    var isNegotiable = $('#price-is-negotiable').prop('checked');

    if (withFixed == true) {
        var Price = $('#purchasingPrice').val();
        if (Price == "") {
            $('#CheckPriceModal').modal('show');
        }
        else {
            let className = document.getElementById("durationandShipping").className;
            if (className == "collapse1-5 collapse") {
                $(".collapse1-5").addClass("expand").removeClass("collapse");
                $("#collapse1-5").addClass("collapsed").removeClass("expanded").css("display", "none");
            } else {
                $(".collapse1-5").removeClass("expand").addClass("collapse");
                $("#collapse1-5").removeClass("collapsed").addClass("expanded").css("display", "block");
            }
        }
    }
    else if (IsAuction == true) {
        var StartPrice = $('#auctionstartPrice').val();
        var LessPrice = $('#minimumPrice').val();
        if (StartPrice == "" && LessPrice == "") {
            $('#CheckPriceModal').modal('show');
        } else {
            let className = document.getElementById("durationandShipping").className;
            if (className == "collapse1-5 collapse") {
                $(".collapse1-5").addClass("expand").removeClass("collapse");
                $("#collapse1-5").addClass("collapsed").removeClass("expanded").css("display", "none");
            } else {
                $(".collapse1-5").removeClass("expand").addClass("collapse");
                $("#collapse1-5").removeClass("collapsed").addClass("expanded").css("display", "block");
            }
        }
    }
    else {

        $(".collapse1-4").removeClass("expand").addClass("collapse");
        $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");
        $('#purchasingPrice').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number3acc").offset().top
        }, 500);
        $('#CheckPriceModal').modal('show');
    }
});

$('.collapse1-6').click(function () {
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

    if (IsAuction == true) {
        if (duration == undefined || duration == "") {
            $('#CheckClosingDateModal').modal('show');
        }
        else {
            let className = document.getElementById("packagess").className;
            if (className == "collapse1-6 collapse") {
                $(".collapse1-6").addClass("expand").removeClass("collapse");
                $("#collapse1-6").addClass("collapsed").removeClass("expanded").css("display", "none");
            } else {
                $(".collapse1-6").removeClass("expand").addClass("collapse");
                $("#collapse1-6").removeClass("collapsed").addClass("expanded").css("display", "block");
            }
        }
    }
    else {
        let className = document.getElementById("packagess").className;
        if (className == "collapse1-6 collapse") {
            $(".collapse1-6").addClass("expand").removeClass("collapse");
            $("#collapse1-6").addClass("collapsed").removeClass("expanded").css("display", "none");
        } else {
            $(".collapse1-6").removeClass("expand").addClass("collapse");
            $("#collapse1-6").removeClass("collapsed").addClass("expanded").css("display", "block");
        }
    }


});

var BankAccountId = 0;
var BankSelected = [];
function chooseMoreBanks() {
    BankSelected = [];
    $('.selectBank input:checked').each(function () {
        BankSelected.push($(this).val());
    });
}

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

var ExtraProductImageCountNeed = 0, ExtraProductVidoeCountNeed = 0;
var ProductImageFee = 0, ProductVidoeFee = 0, TotalVee = 0;
var imagesArray = [];
var videos = [];
$("#addphotonextbtn").click(function (e) {
    e.preventDefault();

    var isMain = $("input[type='radio'][name='mainPic']:checked").val();
    if (isMain == undefined) {
        $('.custome-file').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#imageFiles").offset().top
        }, 500);

        $(".collapse1-2").addClass("expand").removeClass("collapse");
        $("#collapse1-2").addClass("collapsed").removeClass("expanded").css("display", "none");
        $(".collapse1-1").removeClass("expand").addClass("collapse");
        $("#collapse1-1").removeClass("collapsed").addClass("expanded").css("display", "block");
        CloseTabs('my-next-btn');
        $("#CheckOnMainImageModal").modal("show");
    }
    else {
        $(".collapse1-2").removeClass("expand").addClass("collapse");
        $("#collapse1-2").removeClass("collapsed").addClass("expanded").css("display", "block");
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

    ExtraProductImageCountNeed = imageArr.length - FreeProductImagesCount;
    ExtraProductVidoeCountNeed = videos.length - FreeProductVidoesCount;

    if (ExtraProductImageCountNeed < 0) {
        ExtraProductImageCountNeed = 0;
    }
    if (ExtraProductVidoeCountNeed < 0) {
        ExtraProductVidoeCountNeed = 0;
    }

    ProductImageFee = ExtraProductImageCountNeed * ExtraProductImageFee;
    ProductVidoeFee = ExtraProductVidoeCountNeed * ExtraProductVidoeFee;
    TotalVee = ProductImageFee + ProductVidoeFee;


    htmlExtraPicVedio += '<div class="col-lg-6"><div class="price-table-single-main-wrapper">' +
        '<label for="Packages' + 0 + '"class="price-table-common-style">';

    htmlExtraPicVedio += '<div class="price-table-main-header with-main-color">';

    htmlExtraPicVedio += '<div class="price-table-main-placeholder">' +
        '<div class="package-name"><h6>Extra Package </h6></div>' +
        '<div class="package-price"><label>' + TotalVee + '<span> L.E</span></label></div></div>';

    htmlExtraPicVedio += '<div class="mostly-buy-plan"><label>ExtraFee</label></div></div>';
    htmlExtraPicVedio += '<ul>' +
        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
        '<label>Extra Product Image Count: <span style="margin-left: 10px; font-weight:bold;">' + ExtraProductImageCountNeed + '</span></label></div></div></li>' +
        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
        '<label>Extra Product Vidoe Count: <span style="margin-left: 10px; font-weight:bold;">' + ExtraProductVidoeCountNeed + '</span></label></div></div></li>' +

        '</ul></label></div></div>';

    if (ExtraProductImageCountNeed > 0 || ExtraProductVidoeCountNeed > 0) {
        $('#ExtraPackage').css("display", "block");
        $('#ExtraPackageSection').html(htmlExtraPicVedio);
    }

});

$("#itemdetailsnextbtn").click(function () {
    var IDValues = [];
    var TextValues = [];
    var IDSubSpec = [];
    $("h5[name='Specifications']").each(function () {
        IDValues.push($(this).prop('id'))
        TextValues.push($(this).text())
    });
    $(".supSpeci").each(function () {
        IDSubSpec.push($(this).prop('id'))
    });
    for (var x = 0; x < IDSubSpec.length; x++) {
        var type = $('#' + IDSubSpec[x] + '').attr('data-type');
        var id = $('#' + IDSubSpec[x] + '').attr('data-id');
        var Spe = TextValues[x];

        if (type == 1) {
            var Sup = $('#SubSP' + IDValues[x] + '').find(":selected").text();
            var SupId = $('#SubSP' + IDValues[x] + '').find(":selected").val();

            selectedSpec.push(SupId);
        }
        else if (type == 2) {
            var input = $('#' + IDValues[x] + '').val();
            selectedSpec.push(input);
        }
        else if (type == 3) {
            var longText = $('#' + IDSubSpec[x] + '').val();

            selectedSpec.push(longText);
        }
        else if (type == 4) {
            var numberId = $('#' + IDSubSpec[x] + '').val();

            selectedSpec.push(numberId);
        }
        else if (type == 5) {

            var radioId = $("input[type='radio'][name='SupSpeciRadio']:checked").attr("id");
            var radioChecked = $("input[type='radio'][name='SupSpeciRadio']:checked").val();
            if (radioChecked == 'on') {
                if (Spe != undefined) {
                    selectedSpec.push(radioId);
                }

            }

        }
        else if (type == 6) {
            var checkboxId = $("input[type='checkbox'][name='SupSpeciCheckbox']:checked").attr("id");
            var checkboxChecked = $("input[type='checkbox'][name='SupSpeciCheckbox']:checked").val();
            if (checkboxChecked == 'on') {
                if (Spe != undefined) {
                    selectedSpec.push(checkboxId);
                }

            }

        }

    }

    if (IDSubSpec.length > 0) {
        $("#collapse1-3").removeClass("collapsed").addClass("expanded").css("display", "block");
        $(".collapse1-3").removeClass("expand").addClass("collapse");
        CloseTabs('my-next-btn');
    }
    else {

        $(".collapse1-3").addClass("expand").removeClass("collapse");
        $("#collapse1-3").addClass("collapsed").removeClass("expanded").css("display", "none");

        $("#collapse1-2").removeClass("collapsed").addClass("expanded").css("display", "block");
        $(".collapse1-2").removeClass("expand").addClass("collapse");
        $('#CheckSpecificationModal').modal("show");
    }


});

$("#listingdetailsnxtbtn").click(function (event) {
    event.preventDefault();

    var countryID = $('#country').val();
    var regionID = $('#region').val();
    var cityID = $('#city-field').val();
    var qty = $('.qtyValue').val();
    if ($('#recheck-title-feild-en').val() == "") {

        $('#recheck-title-feild-en').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckProductNameModal').modal("show");
    }
    if ($('#recheck-title-feild-ar').val() == "") {

        $('#recheck-title-feild-ar').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckProductNameModal').modal("show");
    }
    if (qty <= 0) {
        $('#qtyValue').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckQtyModal').modal("show");
    }
    else if ($('#country').val() == "0") {
        $('#country').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckCountryModal').modal("show");

    }
    else if ($('#region').val() == null) {
        $('#region').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckRegionModal').modal("show");
    }
    else if ($('#city-field').val() == null) {
        $('#city-field').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number2acc").offset().top
        }, 500);
        $('#CheckCityModal').modal("show");
    }
    else {
        $(".collapse1-4").removeClass("expand").addClass("collapse");
        $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");

        CloseTabs('my-next');
    }

});

$("#paymentshippingnextbtn").click(function (event) {
    event.preventDefault();

    var IsAuction = $('#Auction').prop('checked');
    var withFixed = $('#fixed-price-sale').prop('checked');
    var isNegotiable = $('#price-is-negotiable').prop('checked');

  
  
    if (withFixed == true) {
        
        var Price = $('#purchasingPrice').val();
        if (Price == "") {
            $('#purchasingPrice').css('border-color', 'red');
            $('html, body').animate({
                scrollTop: $("#number3acc").offset().top
            }, 500);
            $('#purchasingPrice').focus();
            $('#CheckPriceModal').modal('show');

            $(".collapse1-4").removeClass("expand").addClass("collapse");
            $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");

        }
        else {
            $(".collapse1-5").removeClass("expand").addClass("collapse");
            $("#collapse1-5").removeClass("collapsed").addClass("expanded").css("display", "block");

            CloseTabs('my-next-btn');
        }
    }
    else if (IsAuction == true) {
        
        var StartPrice = $('#auctionstartPrice').val();
        var LessPrice = $('#minimumPrice').val();
        if (StartPrice == "" && LessPrice == "") {
            $('#auctionstartPrice').css('border-color', 'red');
            $('html, body').animate({
                scrollTop: $("#number3acc").offset().top
            }, 500);
            $('#auctionstartPrice').focus();
            $('#minimumPrice').focus();
            $('#CheckPriceModal').modal('show');

            $(".collapse1-4").removeClass("expand").addClass("collapse");
            $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");
        }
        else {
            $(".collapse1-5").removeClass("expand").addClass("collapse");
            $("#collapse1-5").removeClass("collapsed").addClass("expanded").css("display", "block");

            CloseTabs('my-next-btn');
        }
    }
    else { 
        $(".collapse1-4").removeClass("expand").addClass("collapse");
        $("#collapse1-4").removeClass("collapsed").addClass("expanded").css("display", "block");
        $('#purchasingPrice').css('border-color', 'red');
        $('html, body').animate({
            scrollTop: $("#number3acc").offset().top
        }, 500);

        $('#CheckPriceModal').modal('show');
    }


});


$("#durationnextbtn").click(function () {

    var option = $('#list_duration').find(":selected").text();
    if (option == ' Select Duration ') {
        $('#list_duration').css('border-color', 'red');
    }
    if ($('#shippingtimeid').val() == '') {
        ValidateTextBox('#shippingtimeid');
    }
    if ($('#shippingtimeid').val() != '' && option != ' Select Duration ') {

        $('html, body').animate({
            scrollTop: $(".Shipping-options-chose-wrapper").offset().top
        }, 500);
    }
});

var duration = "";
$("#durationshippingnextbtn").click(function () {

    if (editOrRepost == 2) {
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
        if (IsAuction == true) {
            if (duration == undefined || duration == "") {

                $(".collapse1-5").removeClass("expand").addClass("collapse");
                $("#collapse1-5").removeClass("collapsed").addClass("expanded").css("display", "block");

                $(".collapse1-6").addClass("expand").removeClass("collapse");
                $("#collapse1-6").addClass("collapsed").removeClass("expanded").css("display", "none");
                $('#CheckClosingDateModal').modal('show');
            }
            else {
                $(".collapse1-6").removeClass("expand").addClass("collapse");
                $("#collapse1-6").removeClass("collapsed").addClass("expanded").css("display", "block");
                CloseTabs('my-next-btn');
            }
        }
        else {
            $(".collapse1-6").removeClass("expand").addClass("collapse");
            $("#collapse1-6").removeClass("collapsed").addClass("expanded").css("display", "block");
            CloseTabs('my-next-btn');
        }
    } else {
        $(".collapse1-7").removeClass("expand").addClass("collapse");
        $("#collapse1-7").removeClass("collapsed").addClass("expanded").css("display", "block");
        CloseTabs('my-next-btn');
        ConfirmProduct();
    }


});

$("#packagesnextbtn").click(function () {
    $(".collapse1-7").removeClass("expand").addClass("collapse");
    $("#collapse1-7").removeClass("collapsed").addClass("expanded").css("display", "block");
    CloseTabs('my-next-btn');
    ConfirmProduct();
});

$(".btn-product-details").click(function () {
    var id = getCookie("ProductId");
    window.location.href = '/Home/GetProductById?id=' + id + '&CurrentPageName=Index';
    setCookie("ProductId", '', 90);
});

const imageArr = [];
const fileInput = document.querySelector("#files");
fileInput.addEventListener("change", () => {
    for (const file of fileInput.files) {
        imageArr.push(file);
    }
});

function CloseTabs(className) {

    $('body').on('click', '.' + className, function (event) {
        event.preventDefault();
        const current_accordion = $(this).closest('.card');
        current_accordion.find('.card-header').addClass("completed");
        current_accordion.find('.card-header a').removeClass("collapse").addClass("expand");
        current_accordion.find('.card-body').removeClass("expanded").addClass("collapsed").css("display", "none");
        const next_accordion = current_accordion.next();
        next_accordion.find('.card-header a').removeClass("expand").addClass("collapse");
        next_accordion.find('.card-body').removeClass("collapsed").addClass("expanded").css("display", "block");

    })
}
$('body').on('click', '.btn-next', function (event) {
    event.preventDefault();
    const current_accordion = $(this).closest('.card');
    current_accordion.find('.card-header').addClass("completed");
    current_accordion.find('.card-header a').removeClass("collapse").addClass("expand");
    current_accordion.find('.card-body').removeClass("expanded").addClass("collapsed").css("display", "none");
    const next_accordion = current_accordion.next();
    next_accordion.find('.card-header a').removeClass("expand").addClass("collapse");
    next_accordion.find('.card-body').removeClass("collapsed").addClass("expanded").css("display", "block");
    $('html, body').animate({
    }, 1000);
});


$('#maincat').on('change', function () {
    //ValidateTextBox('#listingtitle');
    $('.list_duration_weeks').empty();
    var catID = $(this).val();
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    FinalSubCat = this.value;
    $('#SubcatTitle').html(FinalSubCat);
    $('#listProductSep').hide();
    subCatLOne = FinalSubCat;
    var subCatLOneKey = subCatLOne.split("-");
    $('input[name="subCatOne"]').val(subCatLOneKey[0]);
    $('input[name="subCatOneKey"]').val(subCatLOne);
    breadcrums = subCatLOneKey[0];
    if (catID) {
        $.ajax({
            headers:
            {
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: '/Advertisement/GetSubCategoryByCategoryId?id=' + catID,

            success: function (html) {

                $("#catnextbtn").removeAttr('disabled');
                jQuery('#catnextbtn').css('opacity', '1');
                $('#subcatlevel1').find('option').empty();
                if (html.data.length == 0) {
                    $('#subcat1').hide();
                }
                if ((html.data.length > 0) || (html.subdata.length > 0)) {

                    $('#subcat2,#subcat3,#subcat4,#subcat5,#subcat6').hide();
                    if (html.data.length > 0) {
                        FreeProductImagesCount = html.data[0].freeProductImagesCount;
                        FreeProductVidoesCount = html.data[0].freeProductVidoesCount;
                        ExtraProductImageFee = html.data[0].extraProductImageFee;
                        ExtraProductVidoeFee = html.data[0].extraProductVidoeFee;
                        EnableAuction = html.data[0].enableAuction;
                        EnableNegotiation = html.data[0].enableNegotiation;
                        MinimumBidValue = html.data[0].minimumBidValue;
                        SubTitleFee = html.data[0].subTitleFee;
                        AuctionClosingPeriods = html.data[0].auctionClosingPeriods;
                        AuctionClosingPeriodsUnit = html.data[0].auctionClosingPeriodsUnit;
                        EnableFixedPriceSaleFee = html.data[0].enableFixedPriceSaleFee;
                        EnableAuctionFee = html.data[0].enableAuctionFee;
                        EnableNegotiationFee = html.data[0].enableNegotiationFee;
                        productPublishPrice = html.data[0].productPublishPrice;
                        $('#EnableFixedPriceSaleFee').text(html.data[0].enableFixedPriceSaleFee);
                        $('#EnableAuctionFee').val(html.data[0].enableAuctionFee);
                        $('#EnableNegotiationFee').val(html.data[0].enableNegotiationFee);
                        $('#productPublishPrice').val(html.data[0].productPublishPrice);
                        $('#SubTitleFee').val(html.data[0].subTitleFee);
                        $('#ExtraProductImageFee').val(html.data[0].extraProductImageFee);
                        $('#ExtraProductVidoeFee').val(html.data[0].extraProductVidoeFee);
                        $(".auctionClosingTimeFee").text('+ ' + html.data[0].auctionClosingTimeFee + ' SR');


                        /* duration option */
                        var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
                        var lable = '';
                        if (html.data[0].auctionClosingPeriodsUnit == 1) {
                            oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Day';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 2) {
                            oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Week';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 3) {
                            oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Month';
                        }

                        var duration = '';
                        duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
                            '<div style="margin-top:-35px;display:flex;">' +
                            '<div class="button">' +
                            '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                            '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                            '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                            '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                            '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.list_duration_weeks').append(duration);
                    }


                    var options = '';
                    $.each(html.data, function (index, item) {

                        options += '<option value="' + item.id + '">' + item.name + '</option>';
                    });
                    $('#subcatlevel1').html(options);
                    $('#listProductSep').empty();
                    var Specefications = '';
                    for (var x = 0; x < html.subdata.length; x++) {

                        Specefications += '<h5 class="sell-common-heading" id="' + html.subdata[x].id + '" name="Specifications">' + html.subdata[x].name + '</h5>';

                        if (html.subdata[x].type == 1 || html.subdata[x].type == 7) {
                            Specefications += '<div class="sell-main-catagory-customdropdown"><select data-id="' + html.subdata[x].id + '" data-type="' + html.subdata[x].type + '" id="SubSP' + html.subdata[x].id + '"'
                                + 'data-placeholder="cars, real estate, animals..." class="chosen-select">';
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<option value="' + html.subdata[x].subSpecifications[a].id + '">' + html.subdata[x].subSpecifications[a].nameEn + '</option>';
                            }
                            Specefications += '</select></div>';

                        }
                        else if (html.subdata[x].type == 2) {
                            Specefications += '<input type="text" id="' + html.subdata[x].id + '" name="Title" data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" class="accord-inner-input supSpeci" placeholder="Type the ' + html.subdata[x].name + ' Name" required="">';
                        }
                        else if (html.subdata[x].type == 3) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<textarea id="' + html.subdata[x].subSpecifications[a].id + '" name="Title" data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" class="accord-inner-input supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required=""></textarea>';
                            }
                        }
                        else if (html.subdata[x].type == 4) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<input id="' + html.subdata[x].subSpecifications[a].id + '" type="number"  data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" name="Title" class="accord-inner-input supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required="">';
                            }
                        }
                        else if (html.subdata[x].type == 5) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<lable  for="' + html.subdata[x].subSpecifications[a].id + '" >' + html.subdata[x].subSpecifications[a].nameEn + '</lable>';
                                Specefications += '<input id="' + html.subdata[x].subSpecifications[a].id + '" type="radio"  data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" name="SupSpeciRadio" class="ml-10 supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required=""> </br>';

                            }
                        }
                        else if (html.subdata[x].type == 6) {
                            for (var a = 0; a < html.subdata[x].subSpecifications.length; a++) {
                                Specefications += '<lable  for="' + html.subdata[x].subSpecifications[a].id + '" >' + html.subdata[x].subSpecifications[a].nameEn + '</lable>';
                                Specefications += '<input id="' + html.subdata[x].subSpecifications[a].id + '" type="checkbox"  data-type="' + html.subdata[x].type + '" data-id="' + html.subdata[x].id + '" name="SupSpeciCheckbox" class="ml-10 supSpeci" placeholder="Type the ' + html.subdata[x].subSpecifications[a].nameEn + ' Name" required=""> </br>';

                            }
                        }
                    }

                    $('#SpeAndSubForm').html(Specefications);
                    $(".chosen-select").chosen();
                    var str_array = options.split(',');
                    for (var i = 0; i < str_array.length; i++) {
                        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                    }
                    $("#subcatlevel1").val(str_array).trigger("chosen:updated");
                    if (html.data.length == 0) {
                        $('#subcat1').hide();
                    } else {
                        $('#subcat1').show();
                    }

                }
                else {
                    PopulateTemplate(valueSelected);
                    $('#subcat1').hide();
                    $('#subcat2').hide();
                    $('#subcat3').hide();
                    $('#subcat4').hide();
                    $('#subcat5').hide();
                    $('#subcat6').hide();
                }

            }
        });

        GetPackages(catID);
    }

});

$('#subcatlevel1').on('change', function () {

    //ValidateTextBox('#listingtitle');

    var subcatID = $(this).val();
    var valueSelected = this.value;

    FinalSubCat = this.value;
    subCat = FinalSubCat;

    if (subcatID) {
        $.ajax(
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Provider-Id': providerId,
                    'User-Language': lang,
                    'Application-Source': 'Website',
                },
                type: 'GET',
                url: eCommerceAPIUrl + '/api/v1/GetSubCategoryByMainCategory?id=' + subcatID + '&lang=' + lang,
                success: function (html) {

                    $("#catnextbtn").removeAttr('disabled');
                    jQuery('#catnextbtn').css('opacity', '1');
                    if (html.data.length > 0) {
                        $('#subcatlevel2')
                            .find('option')
                            .remove();
                        $('#subcat3').hide();
                        $('#subcat4').hide();
                        $('#subcat5').hide();
                        $('#subcat6').hide();
                        var options = '';
                        $.each(html.data, function (index, item) {

                            options += '<option value="' + item.id + '">' + item.name + '</option>';
                        });

                        FreeProductImagesCount = html.data[0].freeProductImagesCount;
                        FreeProductVidoesCount = html.data[0].freeProductVidoesCount;
                        ExtraProductImageFee = html.data[0].extraProductImageFee;
                        ExtraProductVidoeFee = html.data[0].extraProductVidoeFee;
                        EnableAuction = html.data[0].enableAuction;
                        EnableNegotiation = html.data[0].enableNegotiation;
                        MinimumBidValue = html.data[0].minimumBidValue;
                        SubTitleFee = html.data[0].subTitleFee;
                        AuctionClosingPeriods = html.data[0].auctionClosingPeriods;
                        AuctionClosingPeriodsUnit = html.data[0].auctionClosingPeriodsUnit;
                        EnableFixedPriceSaleFee = html.data[0].enableFixedPriceSaleFee;
                        EnableAuctionFee = html.data[0].enableAuctionFee;
                        EnableNegotiationFee = html.data[0].enableNegotiationFee;
                        productPublishPrice = html.data[0].productPublishPrice;
                        $('#EnableFixedPriceSaleFee').text(html.data[0].enableFixedPriceSaleFee);
                        $('#EnableAuctionFee').val(html.data[0].enableAuctionFee);
                        $('#EnableNegotiationFee').val(html.data[0].enableNegotiationFee);
                        $('#productPublishPrice').val(html.data[0].productPublishPrice);
                        $('#SubTitleFee').val(html.data[0].subTitleFee);
                        $('#ExtraProductImageFee').val(html.data[0].extraProductImageFee);
                        $('#ExtraProductVidoeFee').val(html.data[0].extraProductVidoeFee);

                        $(".auctionClosingTimeFee").text('+ ' + html.data[0].auctionClosingTimeFee + ' SR');
                        /* duration option */
                        var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
                        var lable = '';
                        if (html.data[0].auctionClosingPeriodsUnit == 1) {
                            oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Day';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 2) {
                            oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Week';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 3) {
                            oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Month';
                        }

                        var duration = '';
                        duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
                            '<div style="margin-top:-35px;display:flex;">' +
                            '<div class="button">' +
                            '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                            '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                            '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                            '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                            '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.list_duration_weeks').append(duration);

                        $('#subcatlevel2').append(options);
                        var Specefications = '';

                        $(".chosen-select").chosen();
                        var str_array = options.split(',');
                        for (var i = 0; i < str_array.length; i++) {
                            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                        }
                        $("#subcatlevel2").val(str_array).trigger("chosen:updated");
                        $('#subcat2').show();
                    }
                    else {
                        PopulateTemplate(valueSelected);
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

    //ValidateTextBox('#listingtitle');
    var subcatID = $(this).val();
    $.ajax(
        {
            headers:
            {
                'Content-Type': 'application/json',
                'Provider-Id': providerId,
                'User-Language': lang,
                'Application-Source': 'Website',
            },
            type: 'GET',
            url:  eCommerceAPIUrl + '/api/v1/GetSubCategoryByMainCategory?id=' + subcatID + lang,
            success: function (html) {

                $("#catnextbtn").removeAttr('disabled');
                jQuery('#catnextbtn').css('opacity', '1');
                if (html.data.length > 0) {
                    $('#subcatlevel3')
                        .find('option')
                        .remove();
                    $('#subcat4').hide();
                    $('#subcat5').hide();
                    $('#subcat6').hide();
                    var options = '';
                    $.each(html.data, function (index, item) {

                        options += '<option value="' + item.id + '">' + item.name + '</option>';
                    });

                    FreeProductImagesCount = html.data[0].freeProductImagesCount;
                    FreeProductVidoesCount = html.data[0].freeProductVidoesCount;
                    ExtraProductImageFee = html.data[0].extraProductImageFee;
                    ExtraProductVidoeFee = html.data[0].extraProductVidoeFee;
                    EnableAuction = html.data[0].enableAuction;
                    EnableNegotiation = html.data[0].enableNegotiation;
                    MinimumBidValue = html.data[0].minimumBidValue;
                    SubTitleFee = html.data[0].subTitleFee;
                    AuctionClosingPeriods = html.data[0].auctionClosingPeriods;
                    AuctionClosingPeriodsUnit = html.data[0].auctionClosingPeriodsUnit;
                    EnableFixedPriceSaleFee = html.data[0].enableFixedPriceSaleFee;
                    EnableAuctionFee = html.data[0].enableAuctionFee;
                    EnableNegotiationFee = html.data[0].enableNegotiationFee;
                    productPublishPrice = html.data[0].productPublishPrice;
                    $('#EnableFixedPriceSaleFee').text(html.data[0].enableFixedPriceSaleFee);
                    $('#EnableAuctionFee').val(html.data[0].enableAuctionFee);
                    $('#EnableNegotiationFee').val(html.data[0].enableNegotiationFee);
                    $('#productPublishPrice').val(html.data[0].productPublishPrice);
                    $('#SubTitleFee').val(html.data[0].subTitleFee);
                    $('#ExtraProductImageFee').val(html.data[0].extraProductImageFee);
                    $('#ExtraProductVidoeFee').val(html.data[0].extraProductVidoeFee);

                    $(".auctionClosingTimeFee").text('+ ' + html.data[0].auctionClosingTimeFee + ' SR');
                    /* duration option */
                    var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
                    var lable = '';
                    if (html.data[0].auctionClosingPeriodsUnit == 1) {
                        oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                        twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
                        threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
                        fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
                        lable = 'Day';
                    }

                    if (html.data[0].auctionClosingPeriodsUnit == 2) {
                        oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
                        twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
                        threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
                        fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
                        lable = 'Week';
                    }

                    if (html.data[0].auctionClosingPeriodsUnit == 3) {
                        oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
                        twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
                        threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
                        fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
                        lable = 'Month';
                    }

                    var duration = '';
                    duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
                        '<div style="margin-top:-35px;display:flex;">' +
                        '<div class="button">' +
                        '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                        '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
                        '</div>' +
                        '<div class="button">' +
                        '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                        '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
                        '</div>' +
                        '<div class="button">' +
                        '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                        '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
                        '</div>' +
                        '<div class="button">' +
                        '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                        '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    $('.list_duration_weeks').append(duration);

                    $('#subcatlevel3').append(options);
                    var Specefications = '';

                    $(".chosen-select").chosen();
                    var str_array = options.split(',');
                    for (var i = 0; i < str_array.length; i++) {
                        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                    }
                    $("#subcatlevel3").val(str_array).trigger("chosen:updated");
                    $('#subcat3').show();
                }
                else {
                    PopulateTemplate(valueSelected);
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
    ValidateTextBox('#listingtitle');
    var subcatID = $(this).val();
    var valueSelected = this.value;


    FinalSubCat = this.value;
    subCat = FinalSubCat;
    //alert(subCat + '  thre?');
    $('input[name="testing"]').val('' + subCat);
    var as = $('#subcathidden').val();
    subCatLFour = subCat;
    //$('input[name="subCatFour"]').val(subCatLFour);

    var subCatLFourKey = subCatLFour.split("-");
    $('input[name="subCatFour"]').val(subCatLFourKey[0]);
    $('input[name="subCatFourKey"]').val(subCatLFour);

    //alert(as);
    $('#SubcatTitle').html(FinalSubCat);

    breadcrums = breadcrums + " > " + subCatLFourKey[0];

    if (subcatID) {
        $.ajax(
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Provider-Id': providerId,
                    'User-Language': lang,
                    'Application-Source': 'Website',
                },
                type: 'GET',
                url: siteurl + '/v1/Category/getAllCategoryByTemplateName?categoryKey=' + this.value + '&culture=' + lang,
                success: function (html) {
                    htmlOptions = html;
                    if (html.count > 0) {
                        $('#subcatlevel4')
                            .find('option')
                            .remove();
                        $('#subcat4').hide();
                        $('#subcat5').hide();
                        var options = '';
                        $.each(html.data, function (index, value) {
                            options += '<option value="' + value.categoryKey + '">' + value.categoryName + '</option>';

                        });

                        FreeProductImagesCount = html.data[0].freeProductImagesCount;
                        FreeProductVidoesCount = html.data[0].freeProductVidoesCount;
                        ExtraProductImageFee = html.data[0].extraProductImageFee;
                        ExtraProductVidoeFee = html.data[0].extraProductVidoeFee;
                        EnableAuction = html.data[0].enableAuction;
                        EnableNegotiation = html.data[0].enableNegotiation;
                        MinimumBidValue = html.data[0].minimumBidValue;
                        SubTitleFee = html.data[0].subTitleFee;
                        AuctionClosingPeriods = html.data[0].auctionClosingPeriods;
                        AuctionClosingPeriodsUnit = html.data[0].auctionClosingPeriodsUnit;
                        EnableFixedPriceSaleFee = html.data[0].enableFixedPriceSaleFee;
                        EnableAuctionFee = html.data[0].enableAuctionFee;
                        EnableNegotiationFee = html.data[0].enableNegotiationFee;
                        productPublishPrice = html.data[0].productPublishPrice;
                        $('#EnableFixedPriceSaleFee').text(html.data[0].enableFixedPriceSaleFee);
                        $('#EnableAuctionFee').val(html.data[0].enableAuctionFee);
                        $('#EnableNegotiationFee').val(html.data[0].enableNegotiationFee);
                        $('#productPublishPrice').val(html.data[0].productPublishPrice);
                        $('#SubTitleFee').val(html.data[0].subTitleFee);
                        $('#ExtraProductImageFee').val(html.data[0].extraProductImageFee);
                        $('#ExtraProductVidoeFee').val(html.data[0].extraProductVidoeFee);

                        $(".auctionClosingTimeFee").text('+ ' + html.data[0].auctionClosingTimeFee + ' SR');
                        /* duration option */
                        var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
                        var lable = '';
                        if (html.data[0].auctionClosingPeriodsUnit == 1) {
                            oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Day';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 2) {
                            oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Week';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 3) {
                            oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Month';
                        }

                        var duration = '';
                        duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
                            '<div style="margin-top:-35px;display:flex;">' +
                            '<div class="button">' +
                            '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                            '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                            '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                            '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                            '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.list_duration_weeks').append(duration);

                        $('#subcatlevel4').append(options);
                        var str_array = options.split(',');
                        for (var i = 0; i < str_array.length; i++) {
                            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                        }
                        $("#subcatlevel4").val(str_array).trigger("chosen:updated");
                        $('#subcat4').show();
                    }
                    else {
                        PopulateTemplate(FinalSubCat);
                        $('#subcat4').hide();
                        $('#subcat5').hide();
                        $('#subcat6').hide();
                    }
                }
            });
    }

});

$('#subcatlevel4').on('change', function () {
    ValidateTextBox('#listingtitle');
    var subcatID = $(this).val();
    var valueSelected = this.value;

    FinalSubCat = this.value;
    subCat = FinalSubCat;
    //alert(subCat + '  thre?');
    $('input[name="testing"]').val('' + subCat);
    var as = $('#subcathidden').val();
    subCatLFive = subCat;
    //$('input[name="subCatFive"]').val(subCatLFive);

    var subCatLFiveKey = subCatLFive.split("-");
    $('input[name="subCatFive"]').val(subCatLFiveKey[0]);
    $('input[name="subCatFiveKey"]').val(subCatLFive);

    //alert(as);
    $('#SubcatTitle').html(FinalSubCat);

    breadcrums = breadcrums + " > " + subCatLFiveKey[0];


    if (subcatID) {
        $.ajax(
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Provider-Id': providerId,
                    'User-Language': lang,
                    'Application-Source': 'Website',
                },
                type: 'GET',
                url: siteurl + '/v1/Category/getAllCategoryByTemplateName?categoryKey=' + this.value + '&culture=' + lang,
                success: function (html) {
                    htmlOptions = html;
                    if (html.count > 0) {
                        $('#subcatlevel5')
                            .find('option')
                            .remove();
                        var options = '';
                        $.each(html.data, function (index, value) {
                            options += '<option value="' + value.categoryKey + '">' + value.categoryName + '</option>';

                        });
                        FreeProductImagesCount = html.data[0].freeProductImagesCount;
                        FreeProductVidoesCount = html.data[0].freeProductVidoesCount;
                        ExtraProductImageFee = html.data[0].extraProductImageFee;
                        ExtraProductVidoeFee = html.data[0].extraProductVidoeFee;
                        EnableAuction = html.data[0].enableAuction;
                        EnableNegotiation = html.data[0].enableNegotiation;
                        MinimumBidValue = html.data[0].minimumBidValue;
                        SubTitleFee = html.data[0].subTitleFee;
                        AuctionClosingPeriods = html.data[0].auctionClosingPeriods;
                        AuctionClosingPeriodsUnit = html.data[0].auctionClosingPeriodsUnit;
                        EnableFixedPriceSaleFee = html.data[0].enableFixedPriceSaleFee;
                        EnableAuctionFee = html.data[0].enableAuctionFee;
                        EnableNegotiationFee = html.data[0].enableNegotiationFee;
                        productPublishPrice = html.data[0].productPublishPrice;
                        $('#EnableFixedPriceSaleFee').text(html.data[0].enableFixedPriceSaleFee);
                        $('#EnableAuctionFee').val(html.data[0].enableAuctionFee);
                        $('#EnableNegotiationFee').val(html.data[0].enableNegotiationFee);
                        $('#productPublishPrice').val(html.data[0].productPublishPrice);
                        $('#SubTitleFee').val(html.data[0].subTitleFee);
                        $('#ExtraProductImageFee').val(html.data[0].extraProductImageFee);
                        $('#ExtraProductVidoeFee').val(html.data[0].extraProductVidoeFee);

                        $(".auctionClosingTimeFee").text('+ ' + html.data[0].auctionClosingTimeFee + ' SR');
                        /* duration option */
                        var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
                        var lable = '';
                        if (html.data[0].auctionClosingPeriodsUnit == 1) {
                            oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Day';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 2) {
                            oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Week';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 3) {
                            oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Month';
                        }


                        var duration = '';
                        duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
                            '<div style="margin-top:-35px;display:flex;">' +
                            '<div class="button">' +
                            '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                            '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                            '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                            '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                            '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.list_duration_weeks').append(duration);

                        $('#subcatlevel5').append(options);
                        var str_array = options.split(',');
                        for (var i = 0; i < str_array.length; i++) {
                            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                        }
                        $("#subcatlevel5").val(str_array).trigger("chosen:updated");
                        $('#subcat5').show();
                    }
                    else {
                        PopulateTemplate(FinalSubCat);
                        $('#subcat5').hide();
                        $('#subcat6').hide();
                    }
                }
            }
        );
    }

});

$('#subcatlevel5').on('change', function () {
    ValidateTextBox('#listingtitle');
    var subcatID = $(this).val();
    var valueSelected = this.value;

    FinalSubCat = this.value;
    subCat = FinalSubCat;
    //alert(subCat + '  thre?');
    $('input[name="testing"]').val('' + subCat);
    var as = $('#subcathidden').val();
    //alert(as);
    $('#SubcatTitle').html(FinalSubCat);
    subCatLSix = subCat;
    //$('input[name="subCatSix"]').val(subCatLSix);

    var subCatLSixKey = subCatLFive.split("-");
    $('input[name="subCatSix"]').val(subCatLSixKey[0]);
    $('input[name="subCatSixKey"]').val(subCatLSix);


    breadcrums = breadcrums + " > " + subCatLSixKey[0];

    $("#catdata").html(breadcrums);

    if (subcatID) {
        $.ajax(
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Provider-Id': providerId,
                    'User-Language': lang,
                    'Application-Source': 'Website',
                },
                type: 'GET',
                url: siteurl + '/v1/Category/getAllCategoryByTemplateName?categoryKey=' + this.value + '&culture=' + lang,
                success: function (html) {
                    htmlOptions = html;
                    if (html.count > 0) {
                        $('#subcatlevel6')
                            .find('option')
                            .remove();
                        var options = '';
                        $.each(html.data, function (index, value) {
                            options += '<option value="' + value.categoryKey + '">' + value.categoryName + '</option>';

                        });
                        FreeProductImagesCount = html.data[0].freeProductImagesCount;
                        FreeProductVidoesCount = html.data[0].freeProductVidoesCount;
                        ExtraProductImageFee = html.data[0].extraProductImageFee;
                        ExtraProductVidoeFee = html.data[0].extraProductVidoeFee;
                        EnableAuction = html.data[0].enableAuction;
                        EnableNegotiation = html.data[0].enableNegotiation;
                        MinimumBidValue = html.data[0].minimumBidValue;
                        SubTitleFee = html.data[0].subTitleFee;
                        AuctionClosingPeriods = html.data[0].auctionClosingPeriods;
                        AuctionClosingPeriodsUnit = html.data[0].auctionClosingPeriodsUnit;
                        EnableFixedPriceSaleFee = html.data[0].enableFixedPriceSaleFee;
                        EnableAuctionFee = html.data[0].enableAuctionFee;
                        EnableNegotiationFee = html.data[0].enableNegotiationFee;
                        productPublishPrice = html.data[0].productPublishPrice;
                        $('#EnableFixedPriceSaleFee').text(html.data[0].enableFixedPriceSaleFee);
                        $('#EnableAuctionFee').val(html.data[0].enableAuctionFee);
                        $('#EnableNegotiationFee').val(html.data[0].enableNegotiationFee);
                        $('#productPublishPrice').val(html.data[0].productPublishPrice);
                        $('#SubTitleFee').val(html.data[0].subTitleFee);
                        $('#ExtraProductImageFee').val(html.data[0].extraProductImageFee);
                        $('#ExtraProductVidoeFee').val(html.data[0].extraProductVidoeFee);

                        $(".auctionClosingTimeFee").text('+ ' + html.data[0].auctionClosingTimeFee + ' SR');
                        /* duration option */
                        var oneweek = '', twoweek = '', threeweek = '', fourweek = '';
                        var lable = '';
                        if (html.data[0].auctionClosingPeriodsUnit == 1) {
                            oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Day';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 2) {
                            oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Week';
                        }

                        if (html.data[0].auctionClosingPeriodsUnit == 3) {
                            oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
                            twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
                            threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
                            fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
                            lable = 'Month';
                        }


                        var duration = '';
                        duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
                            '<div style="margin-top:-35px;display:flex;">' +
                            '<div class="button">' +
                            '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '"/>' +
                            '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '"/>' +
                            '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '"/>' +
                            '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
                            '</div>' +
                            '<div class="button">' +
                            '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '"/>' +
                            '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.list_duration_weeks').append(duration);

                        $('#subcatlevel6').append(options);
                        var str_array = options.split(',');
                        for (var i = 0; i < str_array.length; i++) {
                            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                        }
                        $("#subcatlevel6").val(str_array).trigger("chosen:updated");
                        $('#subcat6').show();
                    }
                    else {
                        PopulateTemplate(FinalSubCat);
                    }
                }
            }
        );
    }

});
function PopulateTemplate(valueSelected) {

    var tempValue = valueSelected.split("-");
    $("#templateName").val(tempValue[0]);
    $('.selected-cat-listing').text(tempValue[0]);
}
$(".increaseQty").on('click', function () {
    var qty = $('.qtyValue').val();
    qty = parseFloat(qty);
    qty = (isNaN(qty)) ? 0 : qty;
    qty++;
    $(".qtyValue").val(qty);
});
$(".decreaseQty").on('click', function () {
    var qty = $('.qtyValue').val();
    qty = parseFloat(qty);
    qty = (isNaN(qty)) ? 0 : qty;
    if (qty > 1) {
        qty--;
    }

    $(".qtyValue").val(qty);
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

$("#fixed-price-sale").click(function () {
    if ($(this).is(":checked")) {
        $(".purchasing-Price").show();
        $('#pricetogglebtnid').css('border-color', 'red');
    }
    else {
        var isNegotiable = $("#price-is-negotiable").is(":checked");
        if (isNegotiable) {
            $(".purchasing-Price").show();
            $('#pricetogglebtnid').css('border-color', 'red');
        } else {
            $(".purchasing-Price").hide();
            $('#pricetogglebtnid').css('border-color', '');
        }
    }
});
//$("#price-is-negotiable").click(function () {
//    if ($(this).is(":checked")) {
//        $(".purchasing-Price").show();
//        $('#pricetogglebtnid').css('border-color', 'red');
//    }
//    else {
//        var isFixed = $("#fixed-price-sale").is(":checked");
//        if (isFixed) {
//            $(".purchasing-Price").show();
//            $('#pricetogglebtnid').css('border-color', 'red');
//        } else {
//            $(".purchasing-Price").hide();
//            $('#pricetogglebtnid').css('border-color', '');
//        }
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

function SelectPack(id, price) {
    var header = {
        'Authorization': 'Bearer ' + token,
        'Provider-Id': providerId,
        'User-Language': lang,
        'Application-Source': 'Website',
    };
    $.ajax({
        headers: header,
        type: 'GET',
        url:  eCommerceAPIUrl + '/api/v1/GetPakaById?Pakatid=' + id + '&lang=@ViewBag.v',
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
                    ProductImageFee = ExtraProductImageCountWithPacket * ExtraProductImageFee;
                    ProductVidoeFee = ExtraProductVidoeCountWithPacket * ExtraProductVidoeFee;
                    TotalVee = ProductImageFee + ProductVidoeFee;

                    var Package = '';

                    Package += '<div class="col-lg-6"><div class="price-table-single-main-wrapper">' +
                        '<label for="Packages' + 0 + '"class="price-table-common-style">';

                    Package += '<div class="price-table-main-header with-main-color">';

                    Package += '<div class="price-table-main-placeholder">' +
                        '<div class="package-name"><h6>Extra Package </h6></div>' +
                        '<div class="package-price"><label>' + TotalVee + '<span> L.E</span></label></div></div>';

                    Package += '<div class="mostly-buy-plan"><label>ExtraFee</label></div></div>';
                    Package += '<ul>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Extra Product Image Count: <span style="margin-left: 10px; font-weight:bold;">' + ExtraProductImageCountWithPacket + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
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
                        $('#PackPrice1').html($('#purchasingPrice').val() + " L.E");
                        $('#PackTot1').html($('#purchasingPrice').val() + " L.E");
                        $('#PackTot2').html($('#purchasingPrice').val() + " L.E");
                        $('#PackPrice2').html($('#purchasingPrice').val() + " L.E");

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
                        $('#PackPrice1').html($('#purchasingPrice').val() + " L.E");
                        $('#PackPrice2').html($('#purchasingPrice').val() + " L.E");
                        $('#PackTot1').html($('#purchasingPrice').val() + " L.E");
                        $('#PackTot2').html($('#purchasingPrice').val() + " L.E");

                    }
                    $('#PackageEff').css("display", "block");
                }
            }
        },
        error: function (result) {

        }
    });
}

var CountryOptions = '';
function GetCity(name) {
    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            'Provider-Id': providerId,
            'User-Language': lang,
            'Application-Source': 'Website',
        },
        type: 'GET',

        url:  eCommerceAPIUrl + '/api/v1/ListNeighborhoodByRegionIdDDL?regionsIds=' + name,
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
        headers: {
            'Content-Type': 'application/json',
            'Provider-Id': providerId,
            'User-Language': lang,
            'Application-Source': 'Website',
        },
        type: 'GET',
        url:  eCommerceAPIUrl + '/api/v1/ListRegionsByCountryIdDDL?countriesIds=' + name,
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

});

function GetPackages(catID) {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + $('#token').val(),
            'Provider-Id': providerId,
            'User-Language': lang,
            'Application-Source': 'Website',
        },
        type: 'GET',
        url:  eCommerceAPIUrl + '/api/v1/GetAllPakatsList?lang=@ViewBag.v&categoryId=' + catID,
        success: function (result) {
            if (result.status_code == 200) {

                var Package = '';
                for (var i = 0; i < result.data.length; i++) {
                    Package += '<div class="col-lg-6"><div class="price-table-single-main-wrapper">' +
                        '<input type="radio" id="Packages' + result.data[i].id + '"name="PackagesID" onclick="SelectPack(' + result.data[i].id + ',' + result.data[i].price + ')" value="' + result.data[i].id + '">' +
                        '<label for="Packages' + result.data[i].id + '"class="price-table-common-style">';
                    if (result.data[i].popular == 1) {
                        Package += '<div class="price-table-main-header with-main-color">';
                    }
                    else {
                        Package += '<div class="price-table-main-header">';
                    }
                    Package += '<div class="price-table-main-placeholder">' +
                        '<div class="package-name"><h6>' + result.data[i].name + '</h6></div>' +
                        '<div class="package-price"><label>' + result.data[i].price + '<span> L.E</span></label></div></div>';
                    if (result.data[i].popular == 1) {
                        Package += '<div class="mostly-buy-plan"><label>common</label></div></div>'
                    }
                    Package += '<div class="package-price-body"><div class="package-price-body-content">' +
                        '<div class="alert alert-danger" role="alert" style="border: none; font-size: 13px;background: #e39292; display:none" id="alert' + result.data[i].id + '">' +
                        'Your Photos Count Is Bigger Than The Package Count!</div></div></div>' +
                        '<ul><li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Number Of Monthes: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].numMonth + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Count of Images: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].countImage + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Count of Videos: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].countVideo + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Product Position: <span style="margin-left: 10px; font-weight:bold;">' + result.data[i].productPosition + '</span></label></div></div></li>' +
                        '<li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
                        '<label>Show SupTitle: </label>';
                    if (result.data[i].showSupTitle == true) {
                        Package += '<span style="margin-left: 10px"><i style="color:#16aa16" class="fas fa-check"></i></span>';
                    }
                    else {
                        Package += '<span style="margin-left: 10px"><i style="color:red" class="fas fa-times"></i></span>';
                    }
                    Package += '</div></div></li><li type="none"><div class="package-price-single-list"><div class="package-price-single-list-icon">' +
                        '<img src="/new/images/sellPage/star.svg"></div><div class="package-price-single-list-desc">' +
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

function GetCouponByCode() {
    var code = $('#coupon-code').val();
    if (code == '') {
        $("#invalid-coupon-code").text("Please enter coupon code").show();
        return;
    }
    $.ajax({
        type: 'Get',
        dataType: "json",
        url: '/Advertisement/GetCouponByCode?couponCode=' + code,
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
                    '<label class="color-setting mt-5" style="text-decoration: line-through;" id="totalBefore">' + totalBefor + ' LE</label>' +
                    '</div>' +
                    '<div class="col-lg-6 color-setting">' +
                    '<label class="color-setting mt-5" id="totalpriceid">' + total + ' LE</label>' +
                    '<input id="totalpriceafter" type="hidden"  value="' + total + '"/> ' +
                    '</div>' +
                    '</div>';

                $('.totalAfter').empty().html(html);
                showAlert('Success', 'Coupon Apply Successfully', 'success');
                $('.applyCoupon').prop('disabled', 'true');

            }
        },
        error: function (response) {

        }

    });
}

function ConfirmProduct() {


    AppendDataInCheckout('#recheck-title-feild-en', '#rechecktitlefeildid-en');
    AppendDataInCheckout('#recheck-title-feild-ar', '#rechecktitlefeildid-ar');
    AppendDataInCheckout('#subtitle-en', '#subtitlee-en');
    AppendDataInCheckout('#subtitle-ar', '#subtitlee-ar');
    AppendPic();
    AppendDataInCheckoutDropDown('#country option:selected', '#checkoutcountry');
    AppendDataInCheckout('#cat-description-field-en', '#catdescriptionfieldid-en');
    AppendDataInCheckout('#cat-description-field-ar', '#catdescriptionfieldid-ar');

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
    var total = 0.0;
    EnableFixedPriceSaleFee = (isNaN(EnableFixedPriceSaleFee)) ? 0.0 : EnableFixedPriceSaleFee;
    EnableAuctionFee = (isNaN(EnableAuctionFee)) ? 0.0 : EnableAuctionFee;
    EnableNegotiationFee = (isNaN(EnableNegotiationFee)) ? 0.0 : EnableNegotiationFee;
    ProductImageFee = (isNaN(ProductImageFee)) ? 0.0 : ProductImageFee;
    ProductVidoeFee = (isNaN(ProductVidoeFee)) ? 0.0 : ProductVidoeFee;
    SubTitleFee = (isNaN(SubTitleFee)) ? 0.0 : SubTitleFee;
    productPublishPrice = (isNaN(productPublishPrice)) ? 0.0 : productPublishPrice;
    packagePrice = (isNaN(packagePrice)) ? 0.0 : packagePrice;


    AppendAddtionalPriceInCheckout(EnableFixedPriceSaleFee, '#EnableFixedPriceSaleFee');
    AppendAddtionalPriceInCheckout(EnableAuctionFee, '#EnableAuctionFee');
    AppendAddtionalPriceInCheckout(EnableNegotiationFee, '#EnableNegotiationFee');
    AppendAddtionalPriceInCheckout(productPublishPrice, '#productPublishPrice');
    AppendAddtionalPriceInCheckout(ProductImageFee, '#ExtraProductImageFee');
    AppendAddtionalPriceInCheckout(ProductVidoeFee, '#ExtraProductVidoeFee');
    AppendAddtionalPriceInCheckout(SubTitleFee, '#SubTitleFee');
    AppendAddtionalPriceInCheckout(packagePrice, '#packetPriceee');

    total = parseFloat(EnableFixedPriceSaleFee) + parseFloat(EnableAuctionFee) + parseFloat(EnableNegotiationFee) +
        parseFloat(ProductImageFee) + parseFloat(ProductVidoeFee) +
        parseFloat(SubTitleFee) + parseFloat(productPublishPrice) + parseFloat(packagePrice);

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
    var IsAuction = $('#Auction').prop('checked');

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

    $('#product-confirmation').show();
    $('#edit-product').hide();

}

function AppendPriceInCheckout(from, to) {
    var data = $(from).val();
    $(to).text(data + ' L.E');
}

function AppendAddtionalPriceInCheckout(from, to) {

    var IsAuction = $('#Auction').prop('checked');
    var withFixed = $('#fixed-price-sale').prop('checked');
    var isNegotiable = $('#price-is-negotiable').prop('checked');


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
        }

    }
}

function AppendQuantityInCheckout(from, to) {
    var data = $(from).val();
    $(to).text(data);
}

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


function AppendToggleData(from, to) {
    var data = $(from).val();
    var IsAuction = $('#Auction').prop('checked');
    var withFixed = $('#fixed-price-sale').prop('checked');
    var isNegotiable = $('#price-is-negotiable').prop('checked');

    if (to === '#isnegotiable') {
        if (isNegotiable == true) {
            $('.priceisnegotiable').css("display", "block");
            $('#isnegotiable').empty();
            $('#isnegotiable').append('<img src="/assets/images/checkoutPage/check.svg">');
        } else {
            $('.priceisnegotiable').css("display", "none");
        }
    }
    if (to === '#fixed-price') {
        if (withFixed == true) {
            $('#fixed-price').empty();
            $('#fixed-price').append('<img src="/assets/images/checkoutPage/check.svg">');
        }
    }
    if (to === '#auctionvalue') {
        if (IsAuction == true) {
            $('#auctionvalue').empty();
            $('#auctionvalue').append('<img src="/assets/images/checkoutPage/check.svg">');
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

function EditProduct() {

    var categoryId = $("input[name=SuggestedCat]:radio:checked").val();
    if (categoryId == "" || categoryId == null || categoryId == undefined) {
        if ($('#SuggestedCat').val() == "" || $('#SuggestedCat').val() == null) {
            categoryId = $('#subcatlevel6').val();
        }
        if ($('#subcatlevel6').val() == "" || $('#subcatlevel6').val() == null) {
            categoryId = $('#subcatlevel5').val();
        }
        if ($('#subcatlevel5').val() == "" || $('#subcatlevel5').val() == null) {
            categoryId = $('#subcatlevel4').val();
        }
        if ($('#subcatlevel4').val() == "" || $('#subcatlevel4').val() == null) {
            categoryId = $('#subcatlevel3').val();
        }
        if ($('#subcatlevel3').val() == "" || $('#subcatlevel3').val() == null) {
            categoryId = $('#subcatlevel2').val();
        }
        if ($('#subcatlevel2').val() == "" || $('#subcatlevel2').val() == null) {
            categoryId = $('#subcatlevel1').val();
        }
        if ($('#subcatlevel1').val() == "" || $('#subcatlevel1').val() == null) {
            categoryId = $('#maincat').val();
        }
    }

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

    var IsAuction = $('#Auction').prop('checked');
    var isNegotiationOff = $('#price-is-negotiable').prop('checked');
    var AQuestion = false; //$('#AQuestion').prop('checked');
    var withFixed = $('#fixed-price-sale').prop('checked');
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
        Price = $('#purchasingPrice').val();
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
    }
    if (IsAuction == true) {
        StartPrice = $('#auctionstartPrice').val();
        LessPrice = $('#minimumPrice').val();
        NegotiatePrice = $('#auctionstartPricee').val();
        isAuctionEnabled = true;
    }
    else {
        isAuctionEnabled = false;
    }

    var Status = "";
    if ($('#control_01').is(':checked')) {
        Status = "1"
    }
    else if ($('#control_02').is(':checked')) {
        Status = "2";
    }
    BankSelected = [];
    $('.selectBank input:checked').each(function () {
        BankSelected.push($(this).val());
    });

    var imagesArray = [];
    var ImageList = [];
    var IDValues = [];
    var IDSubSpec = [];
    var TextValues = [];
    var fileData = new FormData();

    $("[name=PicsList]").each(function () {
        imagesArray.push($(this).attr('src'));

    });
    //var fileUpload = $('#files').get(0);

    for (var i = 0; i < imageArr.length; i++) {
        fileData.append('listImageFile', imageArr[i]);
    }

    $("h5[name='Specifications']").each(function () {
        IDValues.push($(this).prop('id'))
        TextValues.push($(this).text())
    });
    $(".supSpeci").each(function () {
        IDSubSpec.push($(this).prop('id'))
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
    var productPublishPrice = $('#productPublishPrice').val();
    var SubTitleFee = $('#SubTitleFee').val();
    var ExtraProductImageFee = $('#ExtraProductImageFee').val();
    var ExtraProductVidoeFee = $('#ExtraProductVidoeFee').val();
    var EnableAuctionFee = $('#EnableAuctionFee').val();
    var EnableNegotiationFee = $('#EnableNegotiationFee').val();
    var EnableFixedPriceSaleFee = $('#EnableFixedPriceSaleFee').val();
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
    for (var x = 0; x < IDSubSpec.length; x++) {
        var type = $('#' + IDSubSpec[x] + '').attr('data-type');
        var id = $('#' + IDSubSpec[x] + '').attr('data-id');
        var Spe = TextValues[x];

        if (type == 1) {
            var Sup = $('#SubSP' + IDValues[x] + '').find(":selected").text();
            var SupId = $('#SubSP' + IDValues[x] + '').find(":selected").val();
            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', SupId);
            fileData.append('productSep[' + x + '].ValueSpeEn', SupId);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 2) {
            var input = $('#' + IDValues[x] + '').val();

            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', input);
            fileData.append('productSep[' + x + '].ValueSpeEn', input);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 3) {
            var longText = $('#' + IDSubSpec[x] + '').val();

            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', longText);
            fileData.append('productSep[' + x + '].ValueSpeEn', longText);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 4) {
            var numberId = $('#' + IDSubSpec[x] + '').val();

            fileData.append('productSep[' + x + '].HeaderSpeAr', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].HeaderSpeEn', Spe);
            fileData.append('productSep[' + x + '].ValueSpeAr', numberId);
            fileData.append('productSep[' + x + '].ValueSpeEn', numberId);
            fileData.append('productSep[' + x + '].Type', type);
            fileData.append('productSep[' + x + '].SpecificationId', id);
        }
        else if (type == 5) {

            var radioId = $("input[type='radio'][name='SupSpeciRadio']:checked").attr("id");
            var radioChecked = $("input[type='radio'][name='SupSpeciRadio']:checked").val();
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
            var checkboxId = $("input[type='checkbox'][name='SupSpeciCheckbox']:checked").attr("id");
            var checkboxChecked = $("input[type='checkbox'][name='SupSpeciCheckbox']:checked").val();
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


    fileData.append('id', productId);
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

    fileData.append('ProductPublishPrice', productPublishPrice);
    fileData.append('EnableFixedPriceSaleFee', EnableFixedPriceSaleFee);
    fileData.append('EnableAuctionFee', EnableAuctionFee);
    fileData.append('EnableNegotiationFee', EnableNegotiationFee);
    fileData.append('ExtraProductImageFee', ProductImageFee);
    fileData.append('ExtraProductVidoeFee', ProductVidoeFee);
    fileData.append('SubTitleFee', SubTitleFee);
    fileData.append('typePay', 1);
    fileData.append('TotalAmountBeforeCoupon', totalBefore);
    fileData.append('TotalAmountAfterCoupon', total);
    fileData.append('CouponDiscountValue', couponDiscount);
    fileData.append('CouponId', couponId);
    fileData.append('ProductBankAccounts', BankSelected);
    fileData.append('EditOrRepost', editOrRepost);//2 Repost Product
    fileData.append('DeletedMedias', DeletedImagesArray);

    $.ajax({
        type: 'POST',
        url: '/Advertisement/EditProduct',
        contentType: false,
        processData: false,
        data: fileData,
        success: function (response) {
            if (response != "") {
                var jsonResult = JSON.parse(response);
                $('#productId').val(jsonResult.data);
                setCookie("ProductId", jsonResult.data, 90);
                $('#AddedProductSuccessfullyModal').modal('show');
            }
        },
        error: function (result) {

            if (result.status_code == 200) {

            }

        }
    });
}
$('#canceladdid').click(function () {
    document.location = '/Index/Advertisement';
});

function getDuration() {
    /* duration option */
    var oneweek = '', twoweek = '', threeweek = '', fourweek = '',
        oneChecked = '', twoChecked = '', threeChecked = '', fourChecked = '';
    var lable = '';
    if (auctionClosingPeriodsUnit == 1) {
        oneweek = moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
        twoweek = moment().add(2, 'days').format("YYYY-MM-DD HH:mm:ss");
        threeweek = moment().add(3, 'days').format("YYYY-MM-DD HH:mm:ss");
        fourweek = moment().add(4, 'days').format("YYYY-MM-DD HH:mm:ss");
        lable = 'Day';

        if (days == 1) {
            oneChecked = 'checked';
        }
        else if (days == 2) {
            twoChecked = 'checked';
        }
        else if (days == 3) {
            threeChecked = 'checked';
        }
        else if (days == 4) {
            fourChecked = 'checked';
        }
    }

    if (auctionClosingPeriodsUnit == 2) {
        oneweek = moment().add(7, 'days').format("YYYY-MM-DD HH:mm:ss");
        twoweek = moment().add(14, 'days').format("YYYY-MM-DD HH:mm:ss");
        threeweek = moment().add(21, 'days').format("YYYY-MM-DD HH:mm:ss");
        fourweek = moment().add(28, 'days').format("YYYY-MM-DD HH:mm:ss");
        lable = 'Week';

        if (days == 7) {
            oneChecked = 'checked';
        }
        else if (days == 14) {
            twoChecked = 'checked';
        }
        else if (days == 21) {
            threeChecked = 'checked';
        }
        else if (days == 28) {
            fourChecked = 'checked';
        }
    }

    if (auctionClosingPeriodsUnit == 3) {
        oneweek = moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss");
        twoweek = moment().add(60, 'days').format("YYYY-MM-DD HH:mm:ss");
        threeweek = moment().add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
        fourweek = moment().add(120, 'days').format("YYYY-MM-DD HH:mm:ss");
        lable = 'Month';

        if (days == 30) {
            oneChecked = 'checked';
        }
        else if (days == 60) {
            twoChecked = 'checked';
        }
        else if (days == 90) {
            threeChecked = 'checked';
        }
        else if (days == 120) {
            fourChecked = 'checked';
        }

    }


    var duration = '';
    duration = '<div class="single-radio-btn-wrapper" style="margin:50px 0px 0px 0px;">' +
        '<div style="margin-top:-35px;display:flex;">' +
        '<div class="button">' +
        '<input type="radio" id="oneWeek" name="duration" value="' + oneweek + '" ' + oneChecked + '/>' +
        '<label class="btn btn-default" for="oneWeek">1 ' + lable + ' </label>' +
        '</div>' +
        '<div class="button">' +
        '<input type="radio" id="twoWeek" name="duration" value="' + twoweek + '" ' + twoChecked + '/>' +
        '<label class="btn btn-default" for="twoWeek">2 ' + lable + ' </label>' +
        '</div>' +
        '<div class="button">' +
        '<input type="radio" id="threeWeek" name="duration" value="' + threeweek + '" ' + threeChecked + '/>' +
        '<label class="btn btn-default" for="threeWeek">3 ' + lable + '</label>' +
        '</div>' +
        '<div class="button">' +
        '<input type="radio" id="fourWeek" name="duration" value="' + fourweek + '" ' + fourChecked + '/>' +
        '<label class="btn btn-default" for="fourWeek">4 ' + lable + ' </label>' +
        '</div>' +
        '</div>' +
        '</div>';

    $('.list_duration_weeks').append(duration);
}

$(document).on("click", ".img-wrap input[name='mainPic']", function () {
    isMainIndex = $("input[name='mainPic']").index(this);
});

function AddEnglishInfo() {
    var chckBoxValue = ($("#addEnglishInfobtn").is(":checked") ? true : false);
    if (chckBoxValue == true) {
        $('#titlesEnglishModal').modal("show");
    } else {
        $('#titlesEnglishModal').modal("hide");
    }
}