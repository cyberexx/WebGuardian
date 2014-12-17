var sites = [];

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
   
        chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        var len = sites.length;
        for(var i = 0;i < len; i++)
        {
          if(sites[i] == tablink)
          {
            console.log("Already in list");
            break;
          }
        }
        if(i == len)
        {
          sites[i] = tablink;
          console.log("Newly added");
        }
    });
     var len1 = sites.length;
    for(var i = 0; i < len1; i++)
    {
            console.log(sites[i]);
    }
         
    },
    
    {
        urls: [
            "*://*/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
     ["blocking"]
    
);