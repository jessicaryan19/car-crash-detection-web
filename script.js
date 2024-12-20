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

function getApiUrlForModel(model) {
    switch (model) {
        case 'logistic-regression':
            return
        case 'random-forest':
            return
        case 'mobilenetv3':
            return
        case 'vgg19':
            return
    }
}

document.getElementById('predict-btn').addEventListener('click', function() {
    const file = window.selectedImage;
    const model = document.getElementById('model').value;
    const error = document.getElementById('error-msg');
    const resultModal = document.getElementById('result-modal');
    const result = document.getElementById('result-msg');
    const loading = document.getElementById('loading');

    if (model == "") {
        error.textContent = 'Please select a model!';
        return;
    }
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const apiUrl = getApiUrlForModel(model);

        loading.classList.remove('hidden');

        fetch(apiUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            loading.classList.add('hidden');
            resultModal.classList.remove('hidden');

            const predictionResult = data.predction[0][0] == 0 ? 'No Car Crash' : 'Car Crash';
            result.textContent = predictionResult;
        })
        .catch((error) => {
            loading.classList.add('hidden');
            resultModal.classList.remove('hidden');
            result.textContent = 'An error occurred. Please try again later.';
            result.classList.add('text-red-600');
        });
    }
});

document.getElementById('close-modal').addEventListener('click', function() {
    const resultModal = document.getElementById('result-modal');
    resultModal.classList.add('hidden');
});