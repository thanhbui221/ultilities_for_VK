let vk_privacy = document.getElementById("VKDiv");
let features = document.getElementById("Features");

var port = chrome.runtime.connect({name: "message"});

const vk_options = {"block_chat_seen": "Block 'seen' feature of chat ", "block_typing_indicator": "Block typing indicator"};
const features_options = {"vk_dark_theme": "VK Dark Theme", "fb_dark_theme": "FB Dark Theme (chua bik lam)"};

function construcSection(section, obj){
  chrome.storage.sync.get(null, function(data){
    for (let key in obj){
      let div = document.createElement('div');
      div.classList.add("form-check");
      let input = document.createElement('input');
      input.classList.add('form-check-input');
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", key);
      input.checked = data[key];
      let label = document.createElement('label');
      label.classList.add('form-check-label');
      let text = document.createTextNode(obj[key]);
      label.appendChild(text);
      div.appendChild(input);
      div.appendChild(label);
      section.appendChild(div);
    }
  })
}

construcSection(vk_privacy ,vk_options);
construcSection(features, features_options);

let myButton = document.getElementById('myButton');
myButton.onclick = function(element){
  var settings = {
      'block_chat_seen': document.getElementById('block_chat_seen').checked,
      'block_typing_indicator': document.getElementById('block_typing_indicator').checked,
      'vk_dark_theme': document.getElementById('vk_dark_theme').checked,
      'fb_dark_theme': document.getElementById('fb_dark_theme').checked
  };
  port.postMessage(settings);
  chrome.storage.sync.set(settings, function(){
  });
  location.reload();
};
