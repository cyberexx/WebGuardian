  var blocked = [];


function onAnchorClick(event) {
  chrome.tabs.create({ url: event.srcElement.href });
  return false;
}
//testing f0r redirect-settings page-working
function clickHandler(e) {
    chrome.tabs.create({url: "settings.html"});
    window.close(); // Note: window.close(), not this.close()
}
//testing for redirect-settings page-working
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('click-me').addEventListener('click', clickHandler);
});

function buildPopupDom(mostVisitedURLs) {
  var popupDiv = document.getElementById('mostVisited_div');
  var ul = popupDiv.appendChild(document.createElement('ul'));

  for (var i = 0; i <6; i++) {
    var li = ul.appendChild(document.createElement('li'));
    var a = li.appendChild(document.createElement('a'));
    var c = mostVisitedURLs[i].url;
    var t1 = c.indexOf("//",0);
    var t2 = c.indexOf("/",t1+2);
    var b = c.substring(t1+2,t2);
   
    if(b.charAt(0) == 'w' && b.charAt(1) == 'w' && b.charAt(2) == 'w' && b.charAt(3) == '.')
        b = b.substring(4,t2);
    var len = b.length;
    if(b.substring(len-4,len) == ".com" || b.substring(len-4,len) == ".org")
    {
        b = b.substring(0,len-4);
    }
    if(b.substring(len-6,len) == ".ac.in" || b.substring(len-6,len) == ".co.in")
    {
        b = b.substring(0,len-6);
    }
    if(b.substring(len-3,len) == ".in" || b.substring(len-3,len) == ".lk")
    {
        b = b.substring(0,len-3);
    }
    b = b.charAt(0).toUpperCase()+b.substr(1).toLowerCase();
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(b));
    a.addEventListener('click', onAnchorClick);
  }
}

chrome.topSites.get(buildPopupDom);

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var popupDiv = document.getElementById('now_viewing');
    var ul = popupDiv.appendChild(document.createElement('ul'));
    var a = ul.appendChild(document.createElement('a'));
    a.href = tabs[0].url;
    a.appendChild(document.createTextNode(url));
});



