# onwi-chrome-extension
Google chrome extension for open new window in incognito mode.

1. - clone repo
2. - change host1, host2 and host 3 in background.js on yours hosts
3. - change host1, host2 and host 3 in manifest.json on yours hosts
4. - in chrome://extensions/ load unpack -> folder with this project on yours PC
5. - window.postMessage({type: 'FROM_PAGE', text: link}, '*'); - on yours site, 
where link - valid link with http/https
EXAMPLE:
in index.html 
<button id='open_link'>Open in incognito mode</button>
in script.js
const btn = document.getElementById('open_link');
const link = 'https://www.google.com';
btn.onclick = function(){
  window.postMessage({type: 'FROM_PAGE', text: link}, '*'); 
};

