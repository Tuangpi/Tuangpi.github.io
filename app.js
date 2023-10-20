function decodeOnce(codeReader, selectedDeviceId) {
  codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
    console.log(result)
    document.getElementById('result').textContent = result.text
  }).catch((err) => {
    console.error(err)
    document.getElementById('result').textContent = err
  })
}
let currentFacingMode = 'environment';
const video = document.getElementById('video');
const switchCameraButton = document.getElementById('switchCamera');
switchCameraButton.addEventListener('click', toggleCamera);
function toggleCamera() {
  if (currentFacingMode === 'environment') {
    initCamera('user');
  } else {
    initCamera('environment');
  }
}

function initCamera(facingMode) {
  const constraints = {
    video: { facingMode: facingMode }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
      currentFacingMode = facingMode;
    })
    .catch(function (error) {
      console.error('Error accessing the camera: ', error);
    });
}


window.addEventListener('load', function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserQRCodeReader()
  console.log('ZXing code reader initialized')

  codeReader.getVideoInputDevices()
    .then((videoInputDevices) => {
      selectedDeviceId = videoInputDevices[0].deviceId

      document.getElementById('startButton').addEventListener('click', () => {
        initCamera(currentFacingMode);
        decodeOnce(codeReader, selectedDeviceId);
      })

      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset()
        document.getElementById('result').textContent = '';
        console.log('Reset.')
      })

    })
    .catch((err) => {
      console.error(err)
    })
})