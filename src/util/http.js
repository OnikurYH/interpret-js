const Promise = require("promise");

function ajax (opts, callback) {
  if (XMLHttpRequest != undefined)
    return _vanillaAJAX(opts, callback);

  return Promise.reject(new Error("AJAX not support on this environment")).nodeify(callback);
}

function _vanillaAJAX (opts, callback) {
  let {
    url = "./",
    method = "GET"
  } = opts;

  return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if ( xmlhttp.readyState == XMLHttpRequest.DONE ) {
        if (xmlhttp.status == 200) {
          resolve(xmlhttp.responseText);
        } else {
          reject(new Error(xmlhttp.statusText));
        }
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }).nodeify(callback);
}

module.exports = {
  ajax: ajax
};