

export function requestOpts(method, body = null, token = null) {
  const headers = createHeaders(method, token);
  const options = {
    headers,
    method: method.toUpperCase(),
    mode: 'cors'
  }
  if (!!body) options.body = JSON.stringify(body);
  return options;
};


export function requestApi(url, opts, type = 'json') {
  return fetch(url, opts)
    .then(handleResponse)
    .then(response => {
      if (type === 'json') {
        return response.json()
      } else {
        return response.text()
      }
    })
    .then(data => data)
    .catch(error => {
      throw error
    })
};


export function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    if (response.statusText) {
      throw new Error(`(${response.status}) ${response.statusText}`);
    } else {
      throw new Error(`(${500}) Received data was not in JSON`)
    }
  }
};


function createHeaders(method, token = null) {
  let headers = {
    Accept: 'application/json, application/xml, text/javascript, *.*',
    'Content-Type': 'application/json'
  }
  try {
    headers = new Headers(headers);
  } catch(e) {}
  if (!!token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
