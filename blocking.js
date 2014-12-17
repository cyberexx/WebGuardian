

  var n=1;




document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('block_this').addEventListener('click', function() {  //opening apps page
        
           chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        var len = blocked.length;
        for(var i = 0;i < len; i++)
        {
          if(blocked[i] == tablink)
          {
            alert("Already in the list");
            n=0;
            break;
          }

          
        }

        if(n==1)
            {
              blocked[len] = tablink;
              alert("Newly added");
            }
      n=1;


    });



    });
})

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        var len = blocked.length;
        for(var i = 0;i < len; i++)
        {
          if(blocked[i] == tablink)
          {
             chrome.tabs.update({url: "show.html"});
            alert("blocked site ,cant acess");
            
            break;
          }

          
        }

      


    });
   
        
         
    },
    
    {
        urls: [
           "*://*/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);


