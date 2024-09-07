
var page = 2;
var screen = 3;
$(document).ready(function () {
    //localStorage.clear();
    localStorage.setItem("Specifications", "");
    localStorage.setItem("SubID", "");
    localStorage.setItem("CountriesID", "");
    localStorage.setItem("RegionsID", "");
    localStorage.setItem("CitiesID", "");
    screen = getCookie('screen');
});

$("#showMore").click(function () {
    var CountryID = localStorage.getItem("CountriesID");
    var Countries = JSON.parse(CountryID);
    var RegionsID = localStorage.getItem("RegionsID");
    var Regions = JSON.parse(RegionsID);
    var CitiesID = localStorage.getItem("CitiesID");
    var Cities = JSON.parse(CitiesID);
    var SubCateID = localStorage.getItem("SubCateID");
    var SubID = localStorage.getItem("SubID");
    var SubCategory = JSON.parse(SubCateID);
    var SubSubCategory = JSON.parse(SubID);
    var Specifications = localStorage.getItem("Specifications");
    var Spe = JSON.parse(Specifications);
    var from = $("#minval").val();
    var to = $("#maxval").val();

    if (from == undefined) {
        from = 0;
    }
    if (to == undefined) {
        to = 100000;
    }
    var url = '';
    url += '&priceFrom=' + from + '&priceTo=' + to + '';
    if (Countries != null) {
        for (var c = 0; c < Countries.length; c++) {
            url += '&Countries=' + Countries[c];
        }
    }
    if (Regions != null) {
        for (var r = 0; r < Regions.length; r++)
            url += '&Regions=' + Regions[r];
    }
    if (Cities != null) {
        for (var ci = 0; ci < Cities.length; ci++) {
            url += '&Neighborhoods=' + Cities[ci];
        }
    }
    if (SubCategory != null) {
        for (var s = 0; s < SubCategory.length; s++) {
            url += '&subCatIds=' + SubCategory[s];
        }
    }
    if (SubSubCategory != null) {
        for (var ss = 0; ss < SubSubCategory.length; ss++) {
            url += '&subCatIds=' + SubSubCategory[ss];

        }
    }
    if (Spe != null) {
        for (var su = 0; su < Spe.length; su++) {
            url += '&sepNames=' + Spe[su];

        }
    }
    var Word = $('#SearchValue').val();

    if (Word != '') {
        url += '&productName=' + Word + '';
    }
    else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }

    var categoryId = $('#CategoryId').val();

    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: page,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {

            $("#products").append(result);
            if (isShowMore == 0) {
                $("#showMore").hide();
            } else {
                $("#showMore").show();
                page++;
            }
        }
    });
});


$("#SearchBtn").click(function () {
    var CountryID = localStorage.getItem("CountriesID");
    var Countries = JSON.parse(CountryID);
    var RegionsID = localStorage.getItem("RegionsID");
    var Regions = JSON.parse(RegionsID);
    var CitiesID = localStorage.getItem("CitiesID");
    var Cities = JSON.parse(CitiesID);
    var SubCateID = localStorage.getItem("SubCateID");
    var SubID = localStorage.getItem("SubID");
    var SubCategory = JSON.parse(SubCateID);
    var SubSubCategory = JSON.parse(SubID);
    var Specifications = localStorage.getItem("Specifications");
    var Spe = JSON.parse(Specifications);
    var from = $("#minval").val();
    var to = $("#maxval").val();
    if (from == undefined) {
        from = 0;
    }
    if (to == undefined) {
        to = 100000;
    }
    var url = '';
    url += '&priceFrom=' + from + '&priceTo=' + to + '';
    if (Countries != null) {
        for (var c = 0; c < Countries.length; c++) {
            url += '&Countries =' + Countries[c];
        }
    }
    if (Regions != null) {
        for (var r = 0; r < Regions.length; r++)
            url += '&Regions=' + Regions[r];
    }
    if (Cities != null) {
        for (var ci = 0; ci < Cities.length; ci++) {
            url += '&Neighborhoods=' + Cities[ci];
        }
    }
    if (SubCategory != null) {
        for (var s = 0; s < SubCategory.length; s++) {
            url += '&subCatIds=' + SubCategory[s];
        }
    }
    if (SubSubCategory != null) {
        for (var ss = 0; ss < SubSubCategory.length; ss++) {
            url += '&subCatIds=' + SubSubCategory[ss];

        }
    }
    if (Spe != null) {
        for (var su = 0; su < Spe.length; su++) {
            url += '&sepNames=' + Spe[su];

        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }

    var categoryId = $('#CategoryId').val();

    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {

            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }

            $("#ResultCount").text(totalCount + '  Result');
        }
    });
});

$(document).ready(function () {

    var productName = getCookie('productName');
    if (productName != '') {
        $('#SearchValue').val(productName);
        SearchProduct();
        setCookie("productName", '', 30);
    }
});
function SearchProduct() {

    var categoryId = $('#CategoryId').val();
    var CountryID = localStorage.getItem("CountriesID");
    if (CountryID != "") {
        var Countries = JSON.parse(CountryID);
    }
    var RegionsID = localStorage.getItem("RegionsID");
    if (RegionsID != "") {
        var Regions = JSON.parse(RegionsID);
    }

    var CitiesID = localStorage.getItem("CitiesID");
    if (CitiesID != "") {
        var Cities = JSON.parse(CitiesID);
    }

    var SubCateID = localStorage.getItem("SubCateID");
    if (SubCateID != "") {
        var SubCategory = JSON.parse(SubCateID);
    }
    var SubID = localStorage.getItem("SubID");
    if (SubID != "") {
        var SubSubCategory = JSON.parse(SubID);
    }
    var Specifications = localStorage.getItem("Specifications");
    if (Specifications != "") {
        var Spe = JSON.parse(Specifications);
    }





    var from = $("#minval").val();
    var to = $("#maxval").val();
    if (from == undefined) {
        from = 0;
    }
    if (to == undefined) {
        to = 100000;
    }
    var url = '';
    url += '&priceFrom=' + from + '&priceTo=' + to + '';
    if (Countries != null) {
        for (var c = 0; c < Countries.length; c++) {
            url += '&Countries =' + Countries[c];
        }
    }
    if (Regions != null) {
        for (var r = 0; r < Regions.length; r++)
            url += '&Regions=' + Regions[r];
    }
    if (Cities != null) {
        for (var ci = 0; ci < Cities.length; ci++) {
            url += '&Neighborhoods=' + Cities[ci];
        }
    }
    if (SubCategory != null) {
        for (var s = 0; s < SubCategory.length; s++) {
            url += '&subCatIds=' + SubCategory[s];
        }
    }
    if (SubSubCategory != null) {
        for (var ss = 0; ss < SubSubCategory.length; ss++) {
            url += '&subCatIds=' + SubSubCategory[ss];

        }
    }
    if (Spe != null) {
        for (var su = 0; su < Spe.length; su++) {
            url += '&sepNames=' + Spe[su];

        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }

    var categoryId = $('#CategoryId').val();

    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {

            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }

            $("#ResultCount").text(totalCount + '  Result');
        }
    });
}

function FollowCat(id) {

    $.ajax({
        url: "/Home/AddFollow?id=" + id,
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {
                var html = '<a href="JavaScript:void(0);" onclick="UnFollowCat(' + id + ')"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;">Un Follow</span></a>' +
                    'all ads in this section' +
                    '<input type = "checkbox" id = "seller-notfication" name = "select" value = "seller  notfication" class="custom___checkbox__input__style_2" checked disabled>' +
                    '<label for="seller-notfication" onclick="UnFollowCat(' + id + ')" class="signUp__checkBox custom___checkbox__style_2">' +
                    '<div class="image-radio-wrapper">' +
                    '<span class="notifcation-bg"></span>' +
                    '</div>' +
                    '</label>';
                $('.favoriteSeller').html(html);
            }
            else if (data.message === 'Categories already exists') {
                $("#errorFollowCategory").modal("show");
            } else if (data.status_code) {
                $("#AurhorizationModal").modal("show");
            }

        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });

}
function UnFollowCat(id) {
    $.ajax({
        url: "/Home/RemoveFollow?id=" + id,
        type: 'Delete',
        success: function (data) {
            if (data.status_code == 200) {
                var html = '<a href="JavaScript:void(0);" onclick="FollowCat(' + id + ')"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;">Follow</span></a>' +
                    '<span style="font-size: 23px;font-weight: bold;"> all ads in this section</span>' +
                    '<input type = "checkbox" id = "seller-notfication" name = "select" value = "seller  notfication" class="custom___checkbox__input__style_2" disabled>' +
                    '<label for="seller-notfication"  onclick="FollowCat(' + id + ')" class="signUp__checkBox custom___checkbox__style_2">' +
                    '<div class="image-radio-wrapper">' +
                    '<span class="notifcation-bg"></span>' +
                    '</div>' +
                    '</label>';

                $('.favoriteSeller').html(html);
            }
        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var w1 = 40;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var w2 = 40;
    var r2 = x2 + w2;

    if (r1 < x2 || x1 > r2)
        return false;
    return true;
}



function FilterWithCat(id) {

    var categoryId = $('#CategoryId').val();
    var IDValues = [];
    $("input[name=SubCategories]").each(function () {
        IDValues.push(parseFloat($(this).val()));
    });
    var CountryID = localStorage.getItem("CountriesID");
    if (CountryID != "") {
        var Countries = JSON.parse(CountryID);
    }
    var RegionsID = localStorage.getItem("RegionsID");
    if (RegionsID != "") {
        var Regions = JSON.parse(RegionsID);
    }

    var CitiesID = localStorage.getItem("CitiesID");
    if (CitiesID != "") {
        var Cities = JSON.parse(CitiesID);
    }

    var SubCateID = localStorage.getItem("SubCateID");
    if (SubCateID != "") {
        var SubCategory = JSON.parse(SubCateID);
    }
    var SubID = localStorage.getItem("SubID");
    if (SubID != "") {
        var SubSubCategory = JSON.parse(SubID);
    }
    var Specifications = localStorage.getItem("Specifications");
    if (Specifications != "") {
        var Spe = JSON.parse(Specifications);
    }



    if ($('#Check-' + id + '').val() == id) {
        const index = IDValues.indexOf(id);
        if (index > -1) { // only splice array when item is found
            IDValues.splice(index, 1); // 2nd parameter means remove one item only
        }
        $('#CategoryCollapse-' + id + '').css("background", "transparent")
        $('#CategoryCollapse-' + id + '').css("color", "black")
        $('#Check-' + id + '').val("")
        $('.CheckBoxes-' + id + '').prop("checked", false);
        localStorage.removeItem("SubCateID");

    }
    else {
        $('#CategoryCollapse-' + id + '').css("background", "#ee6c4d")
        $('#CategoryCollapse-' + id + '').css("color", "white");
        $('#Check-' + id + '').val(id)
    }
    localStorage.setItem("SubCateID", JSON.stringify(IDValues));
    var SubIDValues = [];
    $("input:checkbox[name=filter]:checked").each(function () {
        SubIDValues.push($(this).val());
    });

    var url = '';
    for (var a = 0; a < IDValues.length; a++) {
        url += '&subCatIds=' + IDValues[a] + '';
    }
    for (var z = 0; z < SubIDValues.length; z++) {
        url += '&subCatIds=' + SubIDValues[z] + '';
    }
    if (Countries != null) {
        for (var c = 0; c < Countries.length; c++) {
            url += '&Countries =' + Countries[c];
        }
    }
    if (Regions != null) {
        for (var r = 0; r < Regions.length; r++)
            url += '&Regions=' + Regions[r];
    }
    if (Cities != null) {
        for (var ci = 0; ci < Cities.length; ci++) {
            url += '&Neighborhoods=' + Cities[ci];
        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }
            $("#ResultCount").text(totalCount + '  Result');
        }
    });
}
function FilterWithSub(id) {

    var categoryId = $('#CategoryId').val();
    var url = '';
    var MainIDValues = [];
    $("input[name=SubCategories]").each(function () {
        MainIDValues.push(parseFloat($(this).val()));
    });
    for (var a = 0; a < MainIDValues.length; a++) {
        url += '&subCatIds=' + MainIDValues[a] + ''
    }
    var IDValues = [];
    $("input:checkbox[name=filter]:checked").each(function () {
        IDValues.push($(this).val());
    });
    localStorage.setItem("SubID", JSON.stringify(IDValues));

    for (var z = 0; z < IDValues.length; z++) {
        url += '&subCatIds=' + IDValues[z] + ''
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }

            $("#ResultCount").text(totalCount + '  Result');
        }
    });
}
function FilterSub(id) {


 







    var categoryId = $('#CategoryId').val();
    var CountryID = localStorage.getItem("CountriesID");
    if (CountryID != "") {
        var Countries = JSON.parse(CountryID);
    }
    var RegionsID = localStorage.getItem("RegionsID");
    if (RegionsID != "") {
        var Regions = JSON.parse(RegionsID);
    }

    var CitiesID = localStorage.getItem("CitiesID");
    if (CitiesID != "") {
        var Cities = JSON.parse(CitiesID);
    }

    var SubCateID = localStorage.getItem("SubCateID");
    if (SubCateID != "") {
        var SubCategory = JSON.parse(SubCateID);
    }
    var SubID = localStorage.getItem("SubID");
    if (SubID != "") {
        var SubSubCategory = JSON.parse(SubID);
    }
    var Specifications = localStorage.getItem("Specifications");
    if (Specifications != "") {
        var Spe = JSON.parse(Specifications);
    }





    var Id = [];
    var Check = $('#SupVal-' + id + '').val();
    var categoryId = $('#CategoryId').val();
    var url = '';
    if (Countries != null) {
        for (var c = 0; c < Countries.length; c++) {
            url += '&Countries =' + Countries[c];
        }
    }
    if (Regions != null) {
        for (var r = 0; r < Regions.length; r++)
            url += '&Regions=' + Regions[r];
    }
    if (Cities != null) {
        for (var ci = 0; ci < Cities.length; ci++) {
            url += '&Neighborhoods=' + Cities[ci];
        }
    }
    if (SubCategory != null) {
        for (var s = 0; s < SubCategory.length; s++) {
            url += '&subCatIds=' + SubCategory[s];
        }
    }
    if (SubSubCategory != null) {
        for (var ss = 0; ss < SubSubCategory.length; ss++) {
            url += '&subCatIds=' + SubSubCategory[ss];

        }
    }
    if (Check == '') {
        $('#SubID-' + id + '').css("background", "#ee6c4d")
        $('#SubID-' + id + '').css("color", "white");
        $('#SupVal-' + id + '').val(id)
    }
    else {
        $('#SubID-' + id + '').css("background", "#FFE5DF");
        $('#SubID-' + id + '').css("color", "#EE6C4D");
        $('#SupVal-' + id + '').val('')

    }
    $("input:hidden[name=SupSpecifications]").each(function () {
        if ($(this).val() != '') {
            Id.push($(this).val())
        };
    });
    localStorage.setItem("Specifications", JSON.stringify(Id));
    if (Id.length != 0) {
        for (var i = 0; i < Id.length; i++) {
            url += '&sepNames=' + Id[i] + '';
        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {

            $("#products").empty();
            $("#products").append(result);


            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }

            $("#ResultCount").text(totalCount + '  Result');
        }
    });

}
function FilterByCoast(from, to) {
    var categoryId = $('#CategoryId').val();
    var CountryID = localStorage.getItem("CountriesID");
    if (CountryID != "") {
        var Countries = JSON.parse(CountryID);
    }
    var RegionsID = localStorage.getItem("RegionsID");
    if (RegionsID != "") {
        var Regions = JSON.parse(RegionsID);
    }

    var CitiesID = localStorage.getItem("CitiesID");
    if (CitiesID != "") {
        var Cities = JSON.parse(CitiesID);
    }

    var SubCateID = localStorage.getItem("SubCateID");
    if (SubCateID != "") {
        var SubCategory = JSON.parse(SubCateID);
    }
    var SubID = localStorage.getItem("SubID");
    if (SubID != "") {
    var SubSubCategory = JSON.parse(SubID);
    } 
    var Specifications = localStorage.getItem("Specifications");
    if (Specifications != "") {
        var Spe = JSON.parse(Specifications);
    }

    var url = '';
    url += '&priceFrom=' + from + '&priceTo=' + to + '';
    if (Countries != null) {
        for (var c = 0; c < Countries.length; c++) {
            url += '&Countries =' + Countries[c];
        }
    }
    if (Regions != null) {
        for (var r = 0; r < Regions.length; r++)
            url += '&Regions=' + Regions[r];
    }
    if (Cities != null) {
        for (var ci = 0; ci < Cities.length; ci++) {
            url += '&Neighborhoods=' + Cities[ci];
        }
    }
    if (SubCategory != null) {
        for (var s = 0; s < SubCategory.length; s++) {
            url += '&subCatIds=' + SubCategory[s];
        }
    }
    if (SubSubCategory != null) {
        for (var ss = 0; ss < SubSubCategory.length; ss++) {
            url += '&subCatIds=' + SubSubCategory[ss];

        }
    }
    if (Spe != null) {
        for (var su = 0; su < Spe.length; su++) {
            url += '&sepNames=' + Spe[su];

        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);


            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }

            $("#ResultCount").text(totalCount + '  Result');
        }
    });

}
function ResetFilter() {
    location.reload();


}

function GetRegoin(id) {

    $('#RegoinsName').html("Select Regoin");
    $('#CityName').html("Select City");
    var categoryId = $('#CategoryId').val();
    var IDs = [];
    var Check = $('#CheckCoun-' + id + '').val();
    if (Check == '') {
        $('#CountrID-' + id + '').css("background", "#ee6c4d")
        $('#CountrID-' + id + '').css("color", "white");
        $('#CheckCoun-' + id + '').val(id)
        $.ajax({
            url: '/Home/Getregoin',
            type: "Post",
            data: {
                id: id,
                CatID: categoryId
            },
            beforeSend: function () {
            },
            success: function (data) {

                $('#CountryVal').val($('#CountrID-' + id + '').val())
                $('#CountryName').html($('#CountrID-' + id + '').val());
                var Regoins = "";
                for (var i = 0; i < data.data.length; i++) {
                    Regoins += "<div class='col-lg-6' style='margin-top: 10px;'><div class='side-catagory-common-header-action-btn'><input type= 'button' name='RegoinsList' class='filter-btns-color'" +
                        " value= '" + data.data[i].name + "' id = 'RegoinID-" + data.data[i].id + "' onclick = 'GetCities(" + data.data[i].id + ")'>" +
                        "<input type='hidden' value='' id= 'CheckReg-" + data.data[i].id + "' name='RegChecks' >" +
                        "<input type='hidden' values='' id='RegoinName'></div></div>";
                }
                $('#RegionsList').html(Regoins);
                $('#RegoinCard').css("display", "block");
                //$(".ProductsSection").css("display", "none")
            },
            error: function (data) {

            }
        });
    }
    else {
        $('#CountrID-' + id + '').css("background", "#FFE5DF");
        $('#CountrID-' + id + '').css("color", "#EE6C4D");
        $('#CheckCoun-' + id + '').val('')
        $('#CountryVal').val('')
        $('#CountryName').html('Select Country');
        $('#RegoinCard').css("display", "none");
    }

    $("input:hidden[name=CountriesName]").each(function () {
        if ($(this).val() != '') {
            IDs.push($(this).val())
        };
    });


    var url = "";
    var SubCateID = localStorage.getItem("SubCateID");
    var SubID = localStorage.getItem("SubID");
    var SubCategory = JSON.parse(SubCateID);
    var SubSubCategory = JSON.parse(SubID);
    localStorage.setItem("CountriesID", JSON.stringify(IDs));

    if (SubCateID != null & SubID != null) {
        for (var a = 0; a < SubCategory.length; a++) {
            url += "&subCatIds=" + SubCategory[a] + "";
        }
        for (var z = 0; z < SubSubCategory.length; z++) {
            url += "&subCatIds=" + SubSubCategory[z] + "";
        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    for (var i = 0; i < IDs.length; i++) {
        url += "&Countries= " + IDs[i] + "";
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }

            $("#ResultCount").text(totalCount + '  Result');
        }
    });

}
function GetCities(id) {

    var ProductList = [];

    $('#CityName').html("Select City");
    var categoryId = $('#CategoryId').val();
    var IDs = [];
    var Check = $('#CheckReg-' + id + '').val();
    if (Check == '') {
        $('#RegoinID-' + id + '').css("background", "#ee6c4d")
        $('#RegoinID-' + id + '').css("color", "white");
        $('#CheckReg-' + id + '').val(id)
        $.ajax({
            url: '/Home/GetCity',
            type: "Post",
            data: {
                id: id,
                CatID: categoryId
            },
            beforeSend: function () {
            },
            success: function (data) {
                $('#RegoinsName').html($('#RegoinID-' + id + '').val());
                $('#RegoinName').val($('#RegoinID-' + id + '').val());
                var City = "";
                for (var i = 0; i < data.data.length; i++) {
                    City += "<div class='col-lg-6' style='margin-top: 10px;'><div class='side-catagory-common-header-action-btn'>" +
                        "<input name = 'CitiesList' type= 'button' class='filter-btns-color' value= '" + data.data[i].name + "' id = 'CityID-" + data.data[i].id + "'" +
                        " onclick ='SelectCity(" + data.data[i].id + ")'><input name = 'CityList' type='hidden' value='' id='CheckCity-" + data.data[i].id + "'>" +
                        "</div></div>";
                }
                $('#CitiesList').html(City);
                $('#CityCard').css("display", "block");
            }
        });
    }
    else {
        $('#RegoinID-' + id + '').css("background", "#FFE5DF");
        $('#RegoinID-' + id + '').css("color", "#EE6C4D");
        $('#CheckReg-' + id + '').val('')
        $('#CountryVal').val('')
        $('#RegoinsName').html('Select Regoin');
        $('#CityCard').css("display", "none");
    }
    $("input:hidden[name=RegChecks]").each(function () {
        if ($(this).val() != '') {
            IDs.push($(this).val())
        };
    });


    var url = "";
    var CountryID = localStorage.getItem("CountriesID");
    var Countries = JSON.parse(CountryID);
    for (var z = 0; z < Countries.length; z++) {
        url += "&Countries =" + Countries[z];
    }
    for (var i = 0; i < IDs.length; i++) {
        url += "&Regions= " + IDs[i] + "";
    }
    localStorage.setItem("RegionsID", JSON.stringify(IDs))
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }
            $("#ResultCount").text(totalCount + '  Result');
        }
    });
}
function SelectCity(id) {

    var ProductList = [];
    var categoryId = $('#CategoryId').val();
    var IDs = [];
    var Check = $('#CheckCity-' + id + '').val();
    if (Check == '') {
        $('#CityID-' + id + '').css("background", "#ee6c4d")
        $('#CityID-' + id + '').css("color", "white");
        $('#CheckCity-' + id + '').val(id)
    }
    else {
        $('#CityID-' + id + '').css("background", "#FFE5DF");
        $('#CityID-' + id + '').css("color", "#EE6C4D");
        $('#CheckCity-' + id + '').val('')
        $('#CityName').html('Select City');
    }
    $("input:hidden[name=CityList]").each(function () {
        if ($(this).val() != '') {
            IDs.push($(this).val())
        };
    });
    var url = "";
    for (var i = 0; i < IDs.length; i++) {
        url += "&Neighborhoods= " + IDs[i] + "";
    }
    localStorage.setItem("CitiesID", JSON.stringify(IDs));
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }
            $("#ResultCount").text(totalCount + '  Result');
        }
    });
}


$(document).on('click', '.country', function () {
    var _this = this;
    var isChecked = false;
    var url = "";
    var IDs = [];
    var categoryId = $('#CategoryId').val();
    var list = document.querySelectorAll('input[name=country]:checked');
    $.each(list, function (key, val) {
        $(val).attr('checked', 'checked');
        $(this).prop('checked', true);
        if ($(this).val() != '') {
            IDs.push($(this).val())
        };
    });
    if ($(this).is(':checked')) {
        isChecked = $(this).is(':checked');
        var countryId = $(this).val();
    }
    else {
    }

    var SubCateID = localStorage.getItem("SubCateID");
    var SubID = localStorage.getItem("SubID");
    var SubCategory = JSON.parse(SubCateID);
    var SubSubCategory = JSON.parse(SubID);
    localStorage.setItem("CountriesID", JSON.stringify(IDs));

    if (SubCateID != null & SubID != null) {
        for (var a = 0; a < SubCategory.length; a++) {
            url += "&subCatIds=" + SubCategory[a] + "";
        }
        for (var z = 0; z < SubSubCategory.length; z++) {
            url += "&subCatIds=" + SubSubCategory[z] + "";
        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    for (var i = 0; i < IDs.length; i++) {
        url += "&Countries= " + IDs[i] + "";
    }

    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }
            $("#ResultCount").text(totalCount + '  Result');
        }
    });
});

$(document).on('click', '.region', function () {
    var _this = this;
    var isChecked = false;
    var url = "";
    var IDs = [];
    var categoryId = $('#CategoryId').val();
    var list = document.querySelectorAll('input[name=region]:checked');
    $.each(list, function (key, val) {
        $(val).attr('checked', 'checked');
        $(this).prop('checked', true);
        if ($(this).val() != '') {
            IDs.push($(this).val())
        };
    });
    var SubCateID = localStorage.getItem("SubCateID");
    var SubID = localStorage.getItem("SubID");
    var SubCategory = JSON.parse(SubCateID);
    var SubSubCategory = JSON.parse(SubID);
    var url = "";
    var CountryID = localStorage.getItem("CountriesID");
    var Countries = JSON.parse(CountryID);
    if (Countries != null) {
        for (var z = 0; z < Countries.length; z++) {
            url += "&Countries =" + Countries[z];
        }
    }

    for (var i = 0; i < IDs.length; i++) {
        url += "&Regions= " + IDs[i] + "";
    }
    localStorage.setItem("RegionsID", JSON.stringify(IDs));

    if (SubCateID != null & SubID != null) {
        for (var a = 0; a < SubCategory.length; a++) {
            url += "&subCatIds=" + SubCategory[a] + "";
        }
        for (var z = 0; z < SubSubCategory.length; z++) {
            url += "&subCatIds=" + SubSubCategory[z] + "";
        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }


    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }
            $("#ResultCount").text(totalCount + '  Result');
        }
    });
});

$(document).on('click', '.city', function () {
    var _this = this;
    var isChecked = false;
    var url = "";
    var IDs = [];
    var categoryId = $('#CategoryId').val();
    var list = document.querySelectorAll('input[name=city]:checked');
    $.each(list, function (key, val) {
        $(val).attr('checked', 'checked');
        $(this).prop('checked', true);
        if ($(this).val() != '') {
            IDs.push($(this).val())
        };
    });
    var SubCateID = localStorage.getItem("SubCateID");
    var SubID = localStorage.getItem("SubID");
    var SubCategory = JSON.parse(SubCateID);
    var SubSubCategory = JSON.parse(SubID);
    var url = "";
    var CountryID = localStorage.getItem("CountriesID");
    var Countries = JSON.parse(CountryID);
    var RegionsIDs = localStorage.getItem("RegionsID");
    var Regions = JSON.parse(RegionsIDs);
    if (Countries != null) {
        for (var z = 0; z < Countries.length; z++) {
            url += "&Countries =" + Countries[z];
        }
    }
    if (Regions != null) {
        for (var i = 0; i < Regions.length; i++) {
            url += "&Regions= " + Regions[i] + "";
        }
    }

    for (var i = 0; i < IDs.length; i++) {
        url += "&Neighborhoods= " + IDs[i] + "";
    }
    localStorage.setItem("CitiesID", JSON.stringify(IDs));

    if (SubCateID != null & SubID != null) {
        for (var a = 0; a < SubCategory.length; a++) {
            url += "&subCatIds=" + SubCategory[a] + "";
        }
        for (var z = 0; z < SubSubCategory.length; z++) {
            url += "&subCatIds=" + SubSubCategory[z] + "";
        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }

    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }

            $("#ResultCount").text(totalCount + '  Result');
        }
    });
});

$(document).on('click', '.reset-regions', function () {
    var _this = this;
    $('input[type=checkbox]').prop('checked', false);

    var url = "";
    var IDcountries = [];
    var IDregions = [];
    var IDcities = [];
    var categoryId = $('#CategoryId').val();
    var listcountry = document.querySelectorAll('input[name=country]:checked');
    var listregion = document.querySelectorAll('input[name=region]:checked');
    var listcity = document.querySelectorAll('input[name=city]:checked');
    $.each(listcountry, function (key, val) {
        if ($(this).val() != '') {
            IDcountries.push($(this).val())
        };
    });
    $.each(listregion, function (key, val) {
        if ($(this).val() != '') {
            IDregions.push($(this).val())
        };
    });
    $.each(listcity, function (key, val) {
        if ($(this).val() != '') {
            IDcities.push($(this).val())
        };
    });


    var SubCateID = localStorage.getItem("SubCateID");
    var SubID = localStorage.getItem("SubID");
    var SubCategory = JSON.parse(SubCateID);
    var SubSubCategory = JSON.parse(SubID);
    localStorage.setItem("CountriesID", JSON.stringify(IDcountries));
    localStorage.setItem("RegionsID", JSON.stringify(IDregions));
    localStorage.setItem("CitiesID", JSON.stringify(IDcities));

    if (SubCateID != null & SubID != null) {
        for (var a = 0; a < SubCategory.length; a++) {
            url += "&subCatIds=" + SubCategory[a] + "";
        }
        for (var z = 0; z < SubSubCategory.length; z++) {
            url += "&subCatIds=" + SubSubCategory[z] + "";
        }
    }
    var Word = $('#SearchValue').val();
    if (Word != '') {
        url += '&productName=' + Word + '';

    } else {
        var productName = getCookie('productName');
        if (productName != '' || productName != null) {
            url += '&productName=' + productName + '';
        }
        setCookie("productName", '', 30);
    }
    $.ajax({
        url: "/Home/GetMoreProducts",
        type: 'GET',
        data: {
            id: categoryId,
            page: 1,
            paramSearch: url,
            Screen: screen
        },
        success: function (result) {
            $("#products").empty();
            $("#products").append(result);

            if (isShowMore == 0) {
                $("#showMore").hide();
                $(".favoriteSeller").hide();
            } else {
                $("#showMore").show();
                $(".favoriteSeller").show();
            }
            $("#ResultCount").text(totalCount + '  Result');
        }
    });
});



$('.brande-slider').owlCarousel({
    stagePadding: 0,
    loop: false,
    margin: 10,
    nav: true,
    rewind: false,
    navText: ["<img src='/new/images/mainPage/slider-arrow-left.svg'>", "<img src='/new/images/mainPage/slider-arrow-right.svg'>"],
    smartSpeed: 1200,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 3
        }
    }
});

$('.version-filter-slider').owlCarousel({
    stagePadding: 0,
    loop: false,
    margin: 10,
    nav: true,
    rewind: false,
    navText: ["<img src='/new/images/mainPage/slider-arrow-left.svg'>", "<img src='/new/images/mainPage/slider-arrow-right.svg'>"],
    smartSpeed: 1200,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 3
        }
    }
});

$('.item-condition-filter-slider').owlCarousel({
    stagePadding: 0,
    loop: false,
    navigation: true,
    margin: 10,
    nav: true,
    rewind: false,
    navText: ["<img src='assets/images/mainPage/slider-arrow-left.svg'>", "<img src='assets/images/mainPage/slider-arrow-right.svg'>"],
    smartSpeed: 1200,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 3
        }
    }
});

function AddFavoriteSeller() {
    $.ajax({
        url: "/User/AddFavoriteSeller",
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {
                var html = '<a href="JavaScript:void(0);" onclick="RemoveFavoriteSeller()"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;">UnFollow</span></a>' +
                    '<span style = "font-size: 23px;font-weight: bold;" > all ads in this section</span>' +
                    '<input type="checkbox" id="seller-notfication" name="select" value="seller  notfication" class="custom___checkbox__input__style_2" checked disabled>' +
                    '<label for="seller-notfication" onclick="RemoveFavoriteSeller()" class="signUp__checkBox custom___checkbox__style_2">' +
                    '<div class="image-radio-wrapper">' +
                    '<span class="notifcation-bg"></span>' +
                    '</div>' +
                    '</label>';
                $('.favoriteSeller').html(html);
            }
            else {
                $("#AurhorizationModal").modal("show");
            }

        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });
}

function RemoveFavoriteSeller() {
    $.ajax({
        url: "/User/RemoveFavoriteSeller",
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {
                var html = '<a href="JavaScript:void(0);" onclick="AddFavoriteSeller()"><span style="font-size: 23px;font-weight: bold;color:#EE6C4D;">Follow</span></a>' +
                    '<span style="font-size: 23px;font-weight: bold;"> all ads in this section</span>' +
                    '<input type = "checkbox" id = "seller-notfication" name = "select" value = "seller  notfication" class="custom___checkbox__input__style_2" disabled>' +
                    '<label for="seller-notfication"  onclick="AddFavoriteSeller()" class="signUp__checkBox custom___checkbox__style_2">' +
                    '<div class="image-radio-wrapper">' +
                    '<span class="notifcation-bg"></span>' +
                    '</div>' +
                    '</label>';

                $('.favoriteSeller').html(html);
            }
        },
        error: function (data) {
            $("#AurhorizationModal").modal("show");
        }
    });
}

function SaveThisSearch() {
    var Word = $('#SearchValue').val();
    $.ajax({
        url: "/User/SaveThisSearch?search=" + Word,
        type: 'POST',
        success: function (data) {
            if (data.status_code == 200) {
                $('.saved').css('background', '#EE6C4D');
                $("#SearchSavedSuccessfullyModal").modal("show");

            } else if (data.status_code == 401) {
                $("#AurhorizationModal").modal("show");
            }

        },
        error: function (data) {
        }
    });
}


$('#maincat').on('change', function () {
    var catID = $(this).val();
    $('#CategoryId').val(catID);
    if (catID) {
        $(".subCategory").load("/Advertisement/GetSubCategoryAndSpecificationsByCategory?id=" + catID);
    }
});



// Fetch Url value 
var getQueryString = function (parameter) {
    var href = window.location.href;
    var reg = new RegExp('[?&]' + parameter + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
// End url

// // slider call
$('#price-range-slider').slider({
    range: true,
    min: 0,
    max: 100000,
    step: 1,
    values: [getQueryString('minval') ? getQueryString('minval') : 0, getQueryString('maxval') ? getQueryString('maxval') : 100000],

    stop: function (event, ui) {

        $('.ui-slider-handle:eq(0) .price-range-min').html(ui.values[0] + '&nbsp;S.R');
        $('.ui-slider-handle:eq(1) .price-range-max').html(ui.values[1] + '&nbsp;S.R');
        $('.price-range-both').html('<i>S.R&nbsp;' + ui.values[0] + ' - </i>&nbsp;S.R' + ui.values[1]);

        // get values of min and max
        $("#minval").val(ui.values[0]);
        $("#maxval").val(ui.values[1]);

        if (ui.values[0] == ui.values[1]) {
            $('.price-range-both i').css('display', 'none');
        } else {
            $('.price-range-both i').css('display', 'inline');
        }

        if (collision($('.price-range-min'), $('.price-range-max')) == true) {
            $('.price-range-min, .price-range-max').css('opacity', '0');
            $('.price-range-both').css('display', 'block');
        } else {
            $('.price-range-min, .price-range-max').css('opacity', '1');
            $('.price-range-both').css('display', 'none');
        }

        FilterByCoast(ui.values[0], ui.values[1])
    }
});

$('.ui-slider-range').append('<span class="price-range-both value-range-slider"><i>&nbsp;' + $('#price-range-slider').slider('values', 0) + '&nbsp;S.R- </i>' + $('#price-range-slider').slider('values', 1) + '</span>');

$('.ui-slider-handle:eq(0)').append('<span class="price-range-min value-range-slider">' + $('#price-range-slider').slider('values', 0) + '&nbsp;S.R</span>');

$('.ui-slider-handle:eq(1)').append('<span class="price-range-max value-range-slider" style="margin-left:-50px;">' + $('#price-range-slider').slider('values', 1) + '&nbsp;S.R</span>');


/*
$('#maincat').on('change', function () {
    var catID = $(this).val();
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    FinalSubCat = this.value;
    $('#SubcatTitle').html(FinalSubCat);
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
                $('.subCategory').empty();
                var targetSubCategory = '',counter=0;
                if ((html.data.length > 0) || (html.subdata.length > 0))
                {
                    targetSubCategory = '<div class="catagory-menu-accordion-wrapper mt-5">';
                                    
                    for (var x = 0; x < html.data.length; x++)
                    {
                        var data = html.data[x];
                        targetSubCategory += '<div class="card">' +
                            '<div class="card-header">' +
                            '<a href = "#collapse1-' + counter + '" id = "CategoryCollapse-@item.id" class="expand CategoryColl" onclick="FilterWithCat(' + data.id + ')">' + data.name +
                            '</a>' +
                            '<input type="hidden" name="SubCategories" value="' + data.id + '">' +
                            '<input type="hidden" value="" id="Check-' + data.id + '">' +
                            '</div>';                       
                        for (var sub = 0; sub < data.list.length; sub++) {
                            targetSubCategory += '<div id="collapse1-' + counter +'" class="card-body collapsed">'+
                                '<div class="single-accord-filter-wrapper">'+
                                '<ul>' +
                                '<li>' +
                                '<div class="single-filter-wrapper">' +
                                '<div class="single-filter-value">' +
                                '<label>@sub.name</label>' +
                                '</div>' +
                                '<div class="single-filter-checkbox">' +
                                '<div class="custom-checkbox-wrapper">' +
                                '<input id="filter-@sub.id" name="filter" onchange="FilterWithSub()" class="CheckBoxes-@item.id" type="checkbox" value="@sub.id">' +
                                '<label for="filter-@sub.id"></label>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</li>' +
                                '<span>-</span>'+
                                    //    <li>
                                    //        @foreach (var Sub2 in sub.list)
                                    //        {
                                    //            <ul>
                                    //                <li>
                                    //                    <div class="single-filter-wrapper">
                                    //                        <div class="single-filter-value">
                                    //                            <label>@Sub2.name</label>
                                    //                        </div>
                                    //                        <div class="single-filter-checkbox">
                                    //                            <div class="custom-checkbox-wrapper">
                                    //                                <input id="filter-@Sub2.id" name="filter" onclick="FilterWithSub(@item.id)" class="CheckBoxes-@item.id" type="checkbox" value="@Sub2.id">
                                    //                                    <label for="filter-@Sub2.id"></label>
                                    //                            </div>
                                    //                        </div>
                                    //                    </div>
                                    //                </li>
                                    //                <li>
                                    //                    @foreach (var Sub3 in Sub2.list)
                                    //                    {
                                    //                        <ul>
                                    //                            <li>
                                    //                                <div class="single-filter-wrapper">
                                    //                                    <div class="single-filter-value">
                                    //                                        <label>@Sub3.name</label>
                                    //                                    </div>
                                    //                                    <div class="single-filter-checkbox">
                                    //                                        <div class="custom-checkbox-wrapper">
                                    //                                            <input id="filter-@Sub3.id" name="filter" onclick="FilterWithSub(@item.id)" class="CheckBoxes-@item.id" type="checkbox" value="@Sub3.id">
                                    //                                                <label for="filter-@Sub3.id"></label>
                                    //                                        </div>
                                    //                                    </div>
                                    //                                </div>
                                    //                            </li>
                                    //                            <li>

                                    //                            </li>
                                    //                        </ul>
                                    //                    }
                                    //                </li>
                                    //            </ul>
                                    //        }
                                    //    </li>
                                    //</ul>
                                    //        </div >
                                    //    </div > '
                        }
                        '</div>';
                    }
                    targetSubCategory += '<div class="accordion accordion-bg accordion-gutter-md accordion-border show-code-action">';
                    $('.subCategory').append(targetSubCategory);
                }
            }
        });
    }

});*/