let httpPostRequest = (request, callback) => {
  $.ajax({
    contentType: 'application/json; charset=utf-8',
    url: request.url,
    method: "POST",
    data: request.body,
    dataType: 'json',
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      console.log("ERROR: request failed at " + request.url);
      console.log(error);
    }
  })
}

let httpGetRequest = (request, callback) => {
  $.ajax({
    contentType: 'application/json; charset=utf-8',
    url: request.url,
    method: "GET",
    data: request.body,
    dataType: 'json',
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      console.log("ERROR: request failed at " + request.url);
      console.log(error);
    }
  })
}