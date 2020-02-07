
var settings = {
    'block_chat_seen': false,
    'block_typing_indicator': false,
    'vk_dark_theme': false,
    'fb_dark_theme': false
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({'url': 'popup.html'}, function(tab) {
    chrome.storage.sync.set(settings, function(){
    });
  });
})


chrome.runtime.onConnect.addListener(function(port){
  port.onMessage.addListener(function(msg){
    settings['block_chat_seen'] = msg.block_chat_seen;
    settings['block_typing_indicator'] = msg.block_typing_indicator;
    settings['vk_dark_theme'] = msg.vk_dark_theme;
    settings['fb_dark_theme'] = msg.fb_dark_theme;
    console.log(msg);
  });
})

chrome.browserAction.onClicked.addListener(function() {
   chrome.tabs.create({'url': 'popup.html'}, function(tab) {
   });
});


function checkAct(body) {
  if ('raw' in body || body['formData']['act'] == 'a_activity')
  return true;
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(details.requestBody);
    return {
      cancel: ( settings.block_chat_seen && 'raw' in details.requestBody)
   };
  },
  // filters
  {urls: ['*://*.vk.com/al_im.php']},
  // extraInfoSpec
  ['blocking', 'requestBody']);


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if ('formData' in details.requestBody){
      console.log(details.requestBody);
      return {
        cancel: ( settings.block_typing_indicator && details.requestBody['formData']['act'] == 'a_activity')
     };
    }
  },
  // filters
  {urls: ['*://*.vk.com/al_im.php']},
  // extraInfoSpec
  ['blocking', 'requestBody']);
