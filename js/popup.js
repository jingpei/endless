$(document).ready(function () {
  // sync checkbox state
  chrome.storage.sync.get('endlessRepeatEnabled', function(data) {
    var isEnabled = data['endlessRepeatEnabled']
    $(':checkbox').prop('checked', isEnabled)
  })

  $(':checkbox').on('click', function () {
    chrome.storage.sync.get('endlessRepeatEnabled', function(data) {
      var isEnabled = !data['endlessRepeatEnabled']
      $(':checkbox').prop('checked', isEnabled)
      chrome.storage.sync.set({endlessRepeatEnabled: isEnabled})
    })
  })
})