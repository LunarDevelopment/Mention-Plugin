'use strict';

console.log('\'Allo \'Allo! Content script');

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  if (request.greeting === 'hello') {
    console.log(request);
    console.log({
      term: ($('.highlight')[0].innerText)
    });
    var pageData = {
      term: ($('.highlight')[0].innerText),
      twitterLink: $(".username").attr("href"),
      company: $(".username b").text(),
      tweet: $('.tweet-content').text(),
      twitter: $(".username i").text().replace("• ", "")
    };
    sendResponse(pageData);
    //doTheThing(request);
  } else if (request.greeting === 'again') {
    console.log(request);
    doTheThing(request);

  } else {
    sendResponse({}); // snub them.
  }
});
function doTheThing(request) {
  //alert('interacting with dom!');
  //console.log(request.tweet);
  //$('.twitter-favorite')[0].click();
  $('.twitter-reply')[0].click();
  $('.message-content').append(request.data.message[0].message);
  setTimeout(
    function () {
      //do something special
      console.log('fired');
      $('.submit')[0].click()
    }, 500);
}
