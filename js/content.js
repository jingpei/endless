var btnId = 'endless--repeat'
var ytCtrl = document.getElementsByClassName('ytp-right-controls')[0]

chrome.storage.sync.get('endlessRepeatEnabled', function(data) {
  var isEnabled = data['endlessRepeatEnabled']
  if(isEnabled) {
    appendRepeatControls()
  }
})

chrome.storage.onChanged.addListener(function (changes, areaName) {
  // update the player if settings change
  var isEnabled = changes['endlessRepeatEnabled'].newValue
  if(isEnabled !== undefined) {
    isEnabled ? appendRepeatControls() : removeRepeatControls()
  }
})

function appendRepeatControls () {
  var btn, btnImg
  
  // if the control isn't already there and youtube player is present
  if(!document.getElementById(btnId) && ytCtrl) {
    btn = document.createElement('button')
    btn.className = 'ytp-button'
    btn.id = btnId
    btnImg = document.createElement('span')
    btn.appendChild(btnImg)
    ytCtrl.appendChild(btn)
    // add listeners for that control
    btn.addEventListener('click', function () {
      toggleLoop()
    })
  }

  // make sure loop attribute is set
  toggleLoop(true)
}

function removeRepeatControls () {
  var btn = document.getElementById(btnId)
  toggleLoop(false)
  ytCtrl.removeChild(btn)
}

function toggleClass (el, target, isEnabled) {
  isEnabled ? el.classList.add(target) : el.classList.remove(target)
}

function toggleLoop (isEnabled) {
  var video = document.getElementsByTagName('video')[0]
  var btn = document.getElementById(btnId)
  if(isEnabled !== undefined) {
    video.loop = isEnabled
  } else {
    video.loop = !video.loop
  }
  toggleClass(btn, 'e-repeat', video.loop)
}
