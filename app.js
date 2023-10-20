// const video = document.getElementById('video');
// const switchCameraButton = document.getElementById('switchCamera');
// let currentStream;
// let currentDeviceIndex = 0;

// async function getVideoDevices() {
//   const devices = await navigator.mediaDevices.enumerateDevices();
//   return devices.filter(device => device.kind === 'videoinput');
// }

// async function initCamera(deviceId) {
//   try {
//     if (currentStream) {
//       currentStream.getTracks().forEach(track => track.stop());
//     }

//     const constraints = { video: { deviceId: { exact: deviceId } } };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     video.srcObject = stream;
//     currentStream = stream;
//   } catch (error) {
//     console.error('Error accessing the camera: ', error);
//   }
// }

// async function toggleCamera() {
//   const devices = await getVideoDevices();
//   if (devices.length < 2) {
//     console.error('No other camera available.');
//     return;
//   }

//   currentDeviceIndex = (currentDeviceIndex + 1) % devices.length;
//   const nextDeviceId = devices[currentDeviceIndex].deviceId;
//   initCamera(nextDeviceId);
// }

// switchCameraButton.addEventListener('click', toggleCamera);

function decodeOnce(codeReader, selectedDeviceId) {
  codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
    console.log(result, 'decode result')
    document.getElementById('result').textContent = result.text + ', ' + selectedDeviceId
  }).catch((err) => {
    console.error(err)
    document.getElementById('result').textContent = err + 'decode one'
  })
}


window.addEventListener('load', function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserQRCodeReader()
  console.log('ZXing code reader initialized')

  codeReader.getVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('switchCamera')
      selectedDeviceId = videoInputDevices[0].deviceId
      console.log(videoInputDevices)

      if (videoInputDevices.length > 1) {
        sourceSelect.onclick = () => {
          selectedDeviceId = videoInputDevices[1].deviceId;
          document.getElementById('result').textContent = 'switchbutton clicked' + selectedDeviceId;
        };
      }

      document.getElementById('startButton').addEventListener('click', () => {
        document.getElementById('result').textContent = 'startbutton clicked' + selectedDeviceId;
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