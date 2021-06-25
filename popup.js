let vk_privacy = document.getElementById("VKDiv");
let features = document.getElementById("Features");

var portSettings = chrome.runtime.connect({name: "settings"});

var settings = {
    'block_chat_seen': false,
    'block_typing_indicator': false,
    'block_story_seen': false
};

const vk_options = {"block_chat_seen": "Block 'seen' feature of chat ", "block_typing_indicator": "Block typing indicator",
  "block_story_seen": "Block 'seen' feature of story on VK"};


for (let key in vk_options){
  let div = document.createElement('div');
  div.classList.add("form-check");
  let input = document.createElement('input');
  input.classList.add('form-check-input');
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", key);
  let label = document.createElement('label');
  label.classList.add('form-check-label');
  let text = document.createTextNode(vk_options[key]);
  label.appendChild(text);
  div.appendChild(input);
  div.appendChild(label);
  vk_privacy.appendChild(div);
}

for(let key in settings){
  chrome.storage.sync.get([key], function(old_settings){
    document.getElementById(key).checked = old_settings[key];
  })
}

let myButton = document.getElementById('myButton');
myButton.onclick = function(element){
  for (let key in settings){
    settings[key] = document.getElementById(key).checked
  }

  portSettings.postMessage(settings);
  for (let key in settings){
    chrome.storage.sync.set({key: settings[key]}, function(){
      console.log(key, settings[key]);
    });
  }
};
