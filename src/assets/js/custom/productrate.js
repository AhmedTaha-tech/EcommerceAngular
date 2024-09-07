
function AddRate() {
    $("#AddRateModal").modal("show");

}

const radioElement = document.querySelectorAll('input');

const rating = document.querySelector('.rating-value');

radioElement.forEach((radio) => {
    radio.addEventListener('click', () => {
        let value = radio.value;
        if (value == '') {
            value = 0;
        }
        rating.innerText = `${value} of 5`;
        $('#rateId').val(value);
    });
});

function Save() {
    var comment = $('#comment').val();
    var rate = $('#rateId').val();
    var productId = $('#productId').val();
    $.ajax({
        type: 'Post',
        dataType: "json",
        url: '/Home/AddRateProduct',
        data: {
            rate:rate,
            productId: productId,
            comment: comment
        },
        success: function (result) {
            if (result.data) {
                window.location.href = '/Home/GetProductById?id=' + productId;
            } 
        },
        error: function (result) {

        }

    });
}