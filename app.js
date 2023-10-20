const sourceSelect = document.getElementById('switchCamera')

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

      selectedDeviceId = videoInputDevices[1].deviceId

      if (videoInputDevices.length > 1) {
        sourceSelect.onclick = () => {
          selectedDeviceId = videoInputDevices[1].deviceId;
          document.getElementById('result').textContent = 'switchbutton ' + videoInputDevices.length;
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