function showBid(productid) {
    if (!CheckUserLogin())
        return;

    var highestBidPrice = $('#highestBidPrice').val();
    $('.bidPrice').val(highestBidPrice);
    $('.highestBidPrice').val(highestBidPrice);
    $("#ProductBidModal").modal("show");
}

function addBid(productid) {
    var isChecked = $('#activateAutomatic').is(':checked'); 
    var bidPrice = $('.bidPrice').val();
    var increaseEachTime = $('.increaseEachTime').val();
    var highestBidPrice = $('.highestBidPrice').val();
    highestBidPrice = highestBidPrice == '' ? 0 : highestBidPrice;
    var bidStartPrice = $('#auctionStartPrice').val();

   
    if (isChecked) {
        bidPrice = 0;
        console.log(isChecked) 
        if (parseFloat(highestBidPrice) == 0 ) {
            $('.errorBidPriceMessage').show();
            $('.errorHighPriceMessage').hide();
            $('#ProductBidModal').modal({ backdrop: 'static', keyboard: false });
            return;
        } else if (parseFloat(highestBidPrice) != 0 && parseFloat(highestBidPrice) != '' && parseFloat(highestBidPrice) <= parseFloat(bidStartPrice)) {
            $('.errorHighPriceMessage').show();
            $('.errorBidPriceMessage').hide();
            $('#ProductBidModal').modal({ backdrop: 'static', keyboard: false });
            return;
        } else {
            $('.errorHighPriceMessage').hide();
            $('.errorBidPriceMessage').hide();
            var formdata = new FormData();
            formdata.append('productId', productid);
            formdata.append('bidPrice', bidPrice);
            formdata.append('activateAutomaticBidding', isChecked);
            formdata.append('IncreaseEachTimePrice', increaseEachTime);
            formdata.append('highestBidPrice', highestBidPrice);

            $.ajax({
                type: 'Post',
                url: '/Advertisement/AddBid',
                contentType: false,
                processData: false,
                data: formdata,
                success: function (response) {

                    if (response.status == "Success") {
                        $("#ProductBidModal").modal("hide");
                        $("#AddedBidSuccessfullyModal").modal("show");
                        $('#auction-price-value').text(parseFloat(response.data.bidPrice) + ' ' + decodeEntities(saudiRyal));
                        $('#bidStartPrice').text(parseFloat(response.data.bidPrice) + ' ' + decodeEntities(saudiRyal));
                        $('.bidPrice').val('');
                        $('.increaseEachTime').val('');
                        $('.highestBidPrice').val('');
                    }
                },
                error: function (error) {
                }
            });
        } 
    }
    else {
        console.log(parseFloat(bidPrice))
        console.log(parseFloat(highestBidPrice))
        if (parseFloat(highestBidPrice) == 0 && parseFloat(bidPrice) < parseFloat(bidStartPrice)) {
            $('.errorBidPriceMessage').show();
            $('.errorHighPriceMessage').hide();
            $('#ProductBidModal').modal({ backdrop: 'static', keyboard: false });
            return;
        } else if (parseFloat(highestBidPrice) != 0 && parseFloat(highestBidPrice) != '' && parseFloat(bidPrice) <= parseFloat(highestBidPrice)) {
            $('.errorHighPriceMessage').show();
            $('.errorBidPriceMessage').hide();
            $('#ProductBidModal').modal({ backdrop: 'static', keyboard: false });
            return;
        } else {
            $('.errorHighPriceMessage').hide();
            $('.errorBidPriceMessage').hide();
            var formdata = new FormData();
            formdata.append('productId', productid);
            formdata.append('bidPrice', bidPrice);
            formdata.append('activateAutomaticBidding', isChecked);
            formdata.append('IncreaseEachTimePrice', increaseEachTime);
            formdata.append('highestBidPrice', highestBidPrice);

            $.ajax({
                type: 'Post',
                url: '/Advertisement/AddBid',
                contentType: false,
                processData: false,
                data: formdata,
                success: function (response) {

                    if (response.status == "Success") {
                        $("#ProductBidModal").modal("hide");
                        $("#AddedBidSuccessfullyModal").modal("show");
                        $('#auction-price-value').text(parseFloat(response.data.bidPrice) + ' ' + decodeEntities(saudiRyal));
                        $('#bidStartPrice').text(parseFloat(response.data.bidPrice) + ' ' + decodeEntities(saudiRyal));
                        $('.bidPrice').val('');
                        $('.increaseEachTime').val('');
                        $('.highestBidPrice').val('');
                    }
                },
                error: function (error) {
                }
            });
        } 
    }
  
   


}


var minVal = 1, maxVal = 20;
function increaseQty() {
    var qty = $('.bidPrice').val();
    var val = parseFloat(qty);
    val = (isNaN(val)) ? 0 : val;
    val++;
    $('.bidPrice').val(val);
}
function decreaseQty() {
    var qty = $('.bidPrice').val();
    var highestBidPrice = $('#highestBidPrice').val();
    var val = parseFloat(qty);
    val = (isNaN(val)) ? 0 : val;
    if (val > 0) {
        val--;
    }
    if (val < highestBidPrice) {
        val = highestBidPrice;
    }
    $('.bidPrice').val(val);
}

function activateAutomatic() {
    var isChecked = $('#activateAutomatic').is(':checked');
    if (isChecked) {
        $('#Quanti').css('display', 'none');
        $('.activateBidding').css('display', 'block');
    } else {
        $('#Quanti').css('display', 'block');
        $('.activateBidding').css('display', 'none');
    }
}
 

$(document).on('keypress', '.float', function (event) {
    return isFloatKey(event, this);
});

function isFloatKey(evt, _this) {
    var round = $(_this).attr('data-round'),
        isNegative = $(_this).attr('data-negative'),
        min = $(_this).attr('data-min'),
        max = $(_this).attr('data-max'),
        val = $(_this).val();
    var highestBidPrice = $('#highestBidPrice').val();
    //if (val < bidStartPrice) {
    //    return false;
    //}
    inputMsgDisplay(_this); // clear error messages
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (isNegative == 'true')
        if (charCode == 45)/*minus symbol*/ {
            if ($(_this).val().length == 0)
                return true;
        };
    if (charCode == 32) return false;// space char
    if (charCode == 46) {
        if ($(_this).val().lastIndexOf('.') > -1) return false;
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    if (val.lastIndexOf('.') > -1)
        if (val.substr(val.lastIndexOf('.') + 1).length == round) return false;

    var keyVal = String.fromCharCode(charCode);
    val = parseFloat(val.concat(keyVal));
    if (val > 0) {
        if (max)
            if (val > max) { inputMsgDisplay(_this, 'Max ' + max + ''); }
        if (min)
            if (val < min) { inputMsgDisplay(_this, 'Min ' + min + ''); }
    }
    else
        if (min)
            if (val < min) { inputMsgDisplay(_this, 'Min ' + min + ''); }
    return true;
}
function inputMsgDisplay(_this, msg) {
    $(_this).parent().find('span.error').remove();
    $(_this).removeClass('required');
    if (msg) {
        $(_this).after('<span class="error q-err">' + msg + '</span>');
        $(_this).addClass('required');
    }
}