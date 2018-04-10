

export const getOptions = requestOptions('GET');


export function requestApi(url, options, type = 'json') {
  return fetch(url, options)
    .then(handleResponse)
    .then(response => {
      if (type === 'json') {
        return response.json()
      } else {
        return response.text()
      }
    })
    .then(function(data) {
      return data;
    }).catch(function(error) {
      throw error;
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


export function requestOptions(method, body = null, token = null) {
  const options = {
    method: method.toUpperCase(),
    mode: 'cors'
  }
  const headers = {
    Accept: 'application/json, application/xml, text/javascript, *.*',
    'Content-Type': 'application/json'
  }
  try {
    options.headers = new Headers(headers);
  } catch(e) {
    options.headers = headers;
  }
  if (!!token) options.headers.Authorization = `Bearer ${token}`;
  if (!!body) options.body = JSON.stringify(body);
  return options;
};
