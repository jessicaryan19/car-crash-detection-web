document.getElementById('image-file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    // console.log(file);

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreviewContainer = document.getElementById('image-preview-container');
            const imagePreview = document.getElementById('image-preview');
            imagePreview.src = e.target.result;
            imagePreviewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
        window.selectedImage = file;
    }
});

document.getElementById('predict-btn').addEventListener('click', function() {
    const file = window.selectedImage;
    const model = document.getElementById('model').value;

    if (model == "") {
        const error = document.getElementById('error-msg');
        error.textContent = 'Please select a model!';
        return;
    }
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const apiUrl = ''

        fetch(apiUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});