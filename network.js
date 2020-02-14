const myHeaders = new Headers({
  'Content-Type': 'application/json; charset=utf-8',
});

chrome.runtime.onMessage.addListener(
  function(request, sender, callback) {
    switch(request.contentScriptQuery){
      case "httpPostRequest":
        fetch(request.url, {
          method: "POST",
          headers: myHeaders,
          body: request.body
        })
        .then((response) => {
          response.text().then((text) => {
            callback(JSON.parse(text))
          })
        })
        .catch((error) => {
          console.log("ERROR: request failed at " + request.url);
          console.log(error);
        })
        break
    case "httpGetRequest":
      fetch(request.url, {
        method: "GET",
        headers: myHeaders,
        body: request.body
      })
      .then((response) => {
        response.text().then((text) => {
          callback(JSON.parse(text))
        })
      })
      .catch((error) => {
        console.log("ERROR: request failed at " + request.url);
        console.log(error)
      })
      break
    }
    return true
  });