let vk_privacy = document.getElementById("VKDiv");
let features = document.getElementById("Features");

var portSettings = chrome.runtime.connect({name: "settings"});

const vk_options = {"block_chat_seen": "Block 'seen' feature of chat ", "block_typing_indicator": "Block typing indicator",
  "block_story_seen": "Block 'seen' feature of story on VK"};


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
let myButton = document.getElementById('myButton');
myButton.onclick = function(element){
  var settings = {
      'block_chat_seen': document.getElementById('block_chat_seen').checked,
      'block_typing_indicator': document.getElementById('block_typing_indicator').checked,
      'block_story_seen': document.getElementById('block_story_seen').checked

  };

  portSettings.postMessage(settings);

  //location.reload();
};
