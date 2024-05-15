const fileInput = document.getElementById("fileInput");

fileInput.onchange = evt => {
    let showImage = document.getElementById("showImage");
    let submitBtn = document.getElementById("submitBtn");

    const [file] = fileInput.files;

    if (file) {
        showImage.src = URL.createObjectURL(file);
        showImage.hidden = false;
        submitBtn.hidden = false;
    }
}