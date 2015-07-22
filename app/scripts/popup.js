'use strict';

console.log('\'Allo \'Allo! Popup');

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('theButton');
  // onClick's logic below:
  link.addEventListener('click', function() {
    //var tweet = document.getElementById('tweet').value;
    chrome.tabs.getSelected(null, function (tab) {
      //https://developer.chrome.com/extensions/tabs
      // sendRequest Deprecated since Chrome 33. Please use runtime.sendMessage.
      chrome.tabs.sendRequest(tab.id, {
        greeting: 'hello'
        //tweet: tweet
      }, function (response) {
        //document.getElementById('response').innerHTML = response.term;
        $.post( 'http://www.emaildatabases.co.uk/Social/api/index.php/search', response)
          .done(function( data ) {
          document.getElementById('response').innerHTML = data;
          chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, {
              greeting: 'again',
              data: JSON.parse(data)
            }, function (response) {
              alert(response.farewell);
            });
          });
        });
      });
    });
  });
});
