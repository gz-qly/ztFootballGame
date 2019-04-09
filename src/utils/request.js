import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
var prodUrl = "http://www.weidingzhi.net/bank/bankant"
//var prodUrl = "http://nptest.weidingzhi.net:9080/ncms"

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(url, options) {
  url = process.env.NODE_ENV === 'development' ? `/bankant${url}` : prodUrl + url;
  if (options.method === 'post') {
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => ({ data }))
      .catch(err => ({ err }));
  } else {
    const { body } = options
    const postbody = JSON.parse(body)
    url += "?"
    for (var key in postbody) {
      url += key + "=" + postbody[key] + "&"
    }
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem("token")
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => ({ data }))
      .catch(err => ({ err }));
  }
}
