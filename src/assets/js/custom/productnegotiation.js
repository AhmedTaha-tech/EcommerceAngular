var productQuantity;
var negotiaitionProductQuantity;
var negotiaitionPrice;
$(document).ready(function () {
    productQuantity = parseInt($('#HiddenProductQuantity').val());
});
function ShowNegotiaitionModal() {
    var price = $("#price").val();
    if (productQuantity == 1) {
        $("#NegotiaitionProductQuantity").hide();
    }
    $("#NegotiaitionModal").modal("show");
}

function checkPrice() {
    negotiaitionPrice = $("#NegotiaitionPrice").val();
    if (negotiaitionPrice == '' || negotiaitionPrice == 0 || negotiaitionPrice == undefined) {
        $('#priceError').show();
    } else {
        $('#priceError').hide();
    }
}
function checkQuantity() {

    negotiaitionProductQuantity = $("#NegotiaitionProductQuantity").val();

    if (negotiaitionProductQuantity == '' || negotiaitionProductQuantity == 0 || negotiaitionProductQuantity == undefined) {
        $('#RequiredQuantity').show();
        $('#QuantityExceeds').hide();
    }
    else if (productQuantity < parseInt(negotiaitionProductQuantity)) {
        $('#QuantityExceeds').show();
        $('#RequiredQuantity').hide();
    } else {
        $('#RequiredQuantity').hide();
        $('#QuantityExceeds').hide();
    }
}

function SendProductNegotiation() {
    if (!CheckUserLogin())
        return;

    if (negotiaitionPrice == '' || negotiaitionPrice == 0 || negotiaitionPrice == undefined) {
        $('#priceError').show();
        return;
    } else {
        $('#priceError').hide();
    }

    if (productQuantity == 1) {
        $('#RequiredQuantity').hide();
        $('#QuantityExceeds').hide();
    }
    else if (negotiaitionProductQuantity == '' || negotiaitionProductQuantity == 0 || negotiaitionProductQuantity == undefined) {
        $('#RequiredQuantity').show();
        $('#QuantityExceeds').hide();
        return;
    }
    else if (productQuantity < parseInt(negotiaitionProductQuantity)) {
        $('#QuantityExceeds').show();
        $('#RequiredQuantity').hide();
        return;
    } else {
        $('#RequiredQuantity').hide();
        $('#QuantityExceeds').hide();
    }

    $.ajax({
        url: sendProductNegotiationUrl,
        type: "Post",
        dataType: "json",
        data: {
            productId: $("#ProductId").val(),
            quantity: productQuantity == 1 ? productQuantity : negotiaitionProductQuantity,
            price: negotiaitionPrice
        },
        success: function (result) {
            if (result.status == "Success") {
                $("#NegotiaitionModal").modal("hide");
                $("#display-price").text(negotiaitionPrice);
                $("#NegotiaitionSuccessModal").modal("show");
                ($("#NegotiaitionPrice").val(''));
                ($("#NegotiaitionProductQuantity").val(''));
            }
        },
        error: function (e) {
        }
    });
}
function OpenTab(tab) {
    if (tab == "received-offers-tab") {
        $("#sent-offers-tab").removeClass("active");
        $("#sent-offers").removeClass("active in");
        $("#received-offers-tab").addClass("active");
        $("#received-offers").addClass("active in");
    }
    else {
        $("#received-offers-tab").removeClass("active");
        $("#received-offers").removeClass("active in");
        $("#sent-offers-tab").addClass("active");
        $("#sent-offers").addClass("active in");
    }
}
function CancelProductOfferByClient(offerId) {
    if ($('#negotiaition-form').valid()) {
        $.ajax({
            url: cancelProductOfferByClientUrl,
            type: "Post",
            dataType: "json",
            data: {
                offerId: offerId
            },
            success: function (result) {
                if (result.status == "Success") {
                    $('#btn-action-' + offerId).hide();
                    $('#offer-status-' + offerId).text("Canceled");
                }
            },
            error: function (e) {
            }
        });
    }
}
function CancelProductOfferByProvider(offerId) {
    if ($('#negotiaition-form').valid()) {
        $.ajax({
            url: cancelProductOfferByProviderUrl,
            type: "Post",
            dataType: "json",
            data: {
                offerId: offerId
            },
            success: function (result) {
                if (result.status == "Success") {
                    $('#btn-action-' + offerId).hide();
                    $('#offer-status-' + offerId).text("Canceled");
                }
            },
            error: function (e) {
            }
        });
    }
}
function PurchaseProductByOffer(offerId) {
    $.ajax({
        url: purchaseProductByOfferUrl,
        type: "Post",
        dataType: "json",
        data: {
            offerId: offerId
        },
        success: function (result) {
            if (result.status == "Success")
                window.location.href = result.redirectToUrl;
        },
        error: function (e) {
        }
    });
}
let selectedOfferId
let selectedProductId
let selectedAcceptOffer
function OpenAcceptOffer(offerId, productId) {
    $("#AcceptNegotiaitionOfferModal").modal("show");
    selectedOfferId = offerId;
    selectedProductId = productId;
    selectedAcceptOffer = true;
}
function OpenRejectOffer(offerId, productId) {
    $("#RejectNegotiaitionOfferModal").modal("show");
    selectedOfferId = offerId;
    selectedProductId = productId;
    selectedAcceptOffer = false;
}
function AcceptRejectOffer() {
    $.ajax({
        url: acceptRejectOfferUrl,
        type: "Post",
        dataType: "json",
        data: {
            offerId: selectedOfferId,
            productId: selectedProductId,
            acceptOffer: selectedAcceptOffer,
            offerExpireHours: $("#exipre-hours-select").val(),
            refuseReason: $("#reject-negotiation-reason").val()
        },
        success: function (result) {
            console.log(result)
            if (result.message == "Success" && result.status == true) {
                $("#AcceptNegotiaitionOfferModal").modal("hide");
                $('#offer-status-' + selectedOfferId).text("Accepted");
            }
            else if (result.message == "Success" && result.status == true) {
                $("#RejectNegotiaitionOfferModal").modal("hide");
                $('#offer-status-' + selectedOfferId).text("Refused");
            }
            else if (result.status == "Failed") {
                $("#AcceptNegotiaitionOfferModal").modal("hide");
                $('#offer-status-' + selectedOfferId).text("Offers Quantity Exceed Product Quantity");
            }
            else {
                $("#RejectNegotiaitionOfferModal").modal("hide");
                $('#offer-status-' + selectedOfferId).text("Refused");
            }

            $('.btn-action-' + selectedOfferId).hide();
        },
        error: function (e) {
        }
    });
}