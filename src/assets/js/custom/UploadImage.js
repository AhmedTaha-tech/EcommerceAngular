const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
function uploadImage(elementId) {

        const input = event.target;
        const reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            const imgPreview = document.getElementById(elementId);
            imgPreview.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]);

}
