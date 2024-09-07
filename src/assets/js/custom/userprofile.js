
function uploadProfilePicture(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profilePicture')
                .attr('src', e.target.result)
                .width(150)
                .height(150);
        };
        reader.readAsDataURL(input.files[0]);

        var fileData = new FormData();
        var imag = input.files[0];
        fileData.append('imgProfile', imag); 
         
        $.ajax({
            //Headers: header,
            type: 'POST',
            url: '/User/EditProfileImage',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status_code == 200) {

                }
            },
            error: function (error) {
            }

        });
    }
}


function deleteProfilePicture() {
   

    var fileData = new FormData();
    var imag = null;
    fileData.append('imgProfile', imag);

    $.ajax({
        //Headers: header,
        type: 'POST',
        url: '/User/EditProfileImage',
        data: fileData,
        contentType: false,
        processData: false,
        success: function (response) { 
            if (response) {
                $('#profilePicture')
                    .attr('src', '/assets/images/man-avatar-profile-picture-male-silhouette-vector-35845815.jpg')
                    .width(150)
                    .height(150);
            }
        },
        error: function (error) {
        }

    });
}