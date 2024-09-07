var result1 = {};
var countArray = 1;
var imagesArray = [];
$(document).ready(function () {
    const EL_browse = document.getElementById('browse');
    const EL_preview = document.getElementById('preview');
    function insertAndShift(arr, from, to) {
        let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
        arr.splice(to, 0, cutOut);            // insert it at index 'to'
    }

    const readImage = file => {

        if (!(/^image\/(png|jpe?g|gif)$/).test(file.type))
            return EL_preview.insertAdjacentHTML('beforeend', `<div>Unsupported format ${file.type}: ${file.name}</div>`);

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const img = new Image();
            if (imagesArray.length < 10) {

                img.addEventListener('load', () => {
                    var z = document.createElement('div');
                    z.setAttribute('class', 'preview-image-upload-wrapper col-lg-4');
                    var element2 = EL_preview.appendChild(img);
                    z.appendChild(element2);
                    EL_preview.appendChild(z);
                    var closeSpan = document.createElement("div");
                    var checkbox = document.createElement("div");
                    checkbox.setAttribute("class", "select-as-main-img");
                    //checkbox.innerHTML = '<input type="radio"  name="selectasmain" value="1">'
                    checkbox.innerHTML = `<div class="main-image-check"><div class="main-image-check-label"> <label class="main-images-mark" for="main-image-pic-1">${file.name}</label>  </div><div class="custom-checkbox-wrapper with-position-control">   <input id="main-image-pic-1" type="radio" name="selectasmain">   <label for="main-image-pic-1"></label> <br /> </div> `
                    //closeSpan.setAttribute("class", "remove-img");
                  //  closeSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
                    z.appendChild(checkbox);
                    z.appendChild(closeSpan);
                   // z.insertAdjacentHTML('beforeend', `<div class="info-img"><div class="filename">${file.name}</div> </div>`);

                    $(".remove-img").click(function () {
                        $(this).parent().remove();
                    });

                    $(".preview-image-upload-wrapper input[type='radio']").click(function () {
                      var a =  $(".preview-image-upload-wrapper").removeClass("get-img-url");
                        $(".preview-image-upload-wrapper").removeClass("get-img-url");
                        $(this).parent().parent().parent().parent().addClass("get-img-url");
                        var fetchedurl = $(".get-img-url img").attr('src');
                        //insertAndShift(imagesArray,fetchedurl,0);
                        $('#mainimg').attr('src', fetchedurl);
                        $('#prvAdImg').attr('src', fetchedurl);
                    });
                });
            } else {
                alert('Only 10 images allow');
            }



            $(function () {
                $(jQuery.unique(
                    $('#preview input:radio')
                        .map(function (i, e) {
                            return $(e).attr('name')
                        }
                        ).get()
                )).each(function (i, e) {
                    $('#preview input:radio[name="' + e + '"]:visible:first')
                        .trigger('click');
                });
            });

            img.src = reader.result;

            imagesArray.push(reader.result);
        });
        reader.readAsDataURL(file); 
    };
    EL_browse.addEventListener('change', ev => {
        // EL_preview.innerHTML = ''; // Clear Preview
        const files = ev.target.files;
        [...files].forEach(readImage);
    });
});



//function readURL(input, input_id) {
//   // alert('ok');
//            if (input.files && input.files[0]) {
//                var reader = new FileReader();

//                reader.onload = function (e) {
//                    $('#' + input_id).attr('src', e.target.result);
//                    $(input).data('myval', e.target.result); 
//                   // alert(e.target.result);

//                   // $('#prvAdImg').attr('src',);
//                    result1[$(input).attr("name")] = e.target.result ;


//                        console.log(result1);

//                   // $(this).val(reader.result);
//                };
//               // alert('ok');
//                reader.readAsDataURL(input.files[0]);
//            }
//        }


