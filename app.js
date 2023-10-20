const switchCamera = document.getElementById('switchCamera')

function decodeOnce(codeReader, selectedDeviceId) {
  codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
    document.getElementById('result').textContent = result.text
  }).catch((err) => {
    document.getElementById('result').textContent = err + 'inside decodeOnce'
  })
}


window.addEventListener('load', function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserQRCodeReader()
  console.log('ZXing code reader initialized')

  codeReader.getVideoInputDevices()
    .then((videoInputDevices) => {

      selectedDeviceId = videoInputDevices[0].deviceId

      if (videoInputDevices.length > 1) {
        selectedDeviceId = videoInputDevices[1].deviceId

        switchCamera.onclick = () => {

          if (selectedDeviceId = videoInputDevices[1]) {
            selectedDeviceId = videoInputDevices[0].deviceId
          } else {
            selectedDeviceId = videoInputDevices[1].deviceId
          }
        };
      }

      decodeOnce(codeReader, selectedDeviceId);

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