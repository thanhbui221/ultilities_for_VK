
var settings = {
    'block_chat_seen': false,
    'block_typing_indicator': false,
    'block_story_seen': false
};


chrome.runtime.onConnect.addListener(function(port){
  if (port.name == 'settings'){
    port.onMessage.addListener(function(msg){
      settings['block_chat_seen'] = msg.block_chat_seen;
      settings['block_typing_indicator'] = msg.block_typing_indicator;
      settings['block_story_seen'] = msg.block_story_seen;
      chrome.storage.sync.set(settings);
    });
  };
})

for(let key in settings){
  chrome.storage.sync.get([key], function(old_settings){
    settings[key] = old_settings[key];
  })
}


chrome.browserAction.onClicked.addListener(function() {
   chrome.tabs.create({'url': 'popup.html'}, function(tab) {
   });
});


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.requestBody){
      return {
        cancel: settings['block_chat_seen']
     };
    }
  },
  // filters
  {urls: ['*://vk.com/al_im.php?act=a_mark_read']},
  // extraInfoSpec
  ['blocking', 'requestBody']);


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.requestBody && 'formData' in details.requestBody){
      return {
        cancel: settings['block_typing_indicator']
     };
    }
    console.log(details.requestBody);
  },
  // filters
  {urls: ['*://vk.com/al_im.php?act=a_activity']},
  // extraInfoSpec
  ['blocking', 'requestBody']);


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
      return {
        cancel: settings.block_story_seen
     };
  },
  // filters
  {urls: ['*://*.vk.com/al_stories.php']},
  // extraInfoSpec
  ['blocking']);
