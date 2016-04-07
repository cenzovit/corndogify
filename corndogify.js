'use strict';

var corndogify = {};
var current_dog = 0;
const corndog_images = [
  chrome.extension.getURL("corndogs/1.jpeg"),
  chrome.extension.getURL("corndogs/2.jpeg"),
  chrome.extension.getURL("corndogs/3.jpeg"),
  chrome.extension.getURL("corndogs/4.jpeg"),
  chrome.extension.getURL("corndogs/5.jpeg"),
  chrome.extension.getURL("corndogs/6.jpeg"),
  chrome.extension.getURL("corndogs/7.jpeg"),
  chrome.extension.getURL("corndogs/8.jpeg"),
  chrome.extension.getURL("corndogs/9.jpeg"),
  chrome.extension.getURL("corndogs/10.jpeg"),
  chrome.extension.getURL("corndogs/11.jpeg"),
  chrome.extension.getURL("corndogs/12.jpeg")
];

$(document).ready(function(){
  corndogify.nextCorndog = function(){
    if (current_dog >= corndog_images.length){
      current_dog = 0;
    }
    return corndog_images[current_dog++];
  };

  corndogify.corndogify = function(){
    $("img:not([vvcos])").each(function(){
      var src = $(this).attr("src");
      if (src){
        $(this).attr('vvcos', src);
        $(this).attr("src", corndogify.nextCorndog());
      }
    });
  };

  corndogify.observer = new MutationObserver(function() {
    corndogify.corndogify();
  });

  corndogify.start = function(){
    corndogify.corndogify();

    if (!corndogify.observer){
      corndogify.observer = new MutationObserver(function() {
        corndogify.corndogify();
      });
    }

    var target = $('body')[0];
    var config = { childList: true };
    corndogify.observer.observe(target, config);
  };

  corndogify.stop = function(){
    corndogify.observer.disconnect();
    $("img[vvcos]").each(function(){
      $(this).attr("src", $(this).attr("vvcos"));
      $(this).removeAttr('vvcos');
    });
  };
});

$(window).load(function(){
  chrome.runtime.sendMessage({message: "loaded"});
});
