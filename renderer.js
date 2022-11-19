const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const result = document.querySelector('#result');
const filename = document.querySelector('#filename');


function loadImage(e) {
    const file = e.target.files[0];

    if(!isFileImage(file)) {
        console.log('Please select an image');
        return;
    }

    form.style.display = 'block';
    filename.innerText = file.name;
}

// Send image to main
function sendImage(e){
    e.preventDefault();

    const imgPath = img.files[0].path;

    if(!img.files[0]) {
        console.log('Please upload an image');
        return;
    }

    
   //Send to main with IPCrenderer
   ipcRenderer.send('image:detect', {
        imgPath
   });
}

/*Catch image done event
ipcRenderer.on ('image:done', () => {
    result.innerText = "Healthy"
})*/

// Check  file is image
function isFileImage(file) {
const acceptedImageTypes = ['image/png', 'image/jpeg'];
return file && acceptedImageTypes.includes(file['type']);
}
img.addEventListener('change', loadImage);
form.addEventListener('submit', sendImage);

