window.addEventListener('message', function(event) {  
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == 'FROM_PAGE')) {
    var regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    if(regex.test(event.data.text)){
      chrome.runtime.sendMessage({link:event.data.text});
    }else{
      alert('Попытка открыть невалидную ссылку.');
    }
  }
}, false);