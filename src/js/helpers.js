import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// AJAX request "Asynchronous JavaScript and XML"
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          // headers are snippets texts which are like info about the request itself
          headers: {
            // with this line we tell the API in the request that the data we are going to send is going to be in the JSON format.
            'Content-Type': 'application/json',
          },
          // finally the payload of the request
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // converting the result to json with json() method
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/* 
export const getJSON = async function (url) {
  try {
    // This automatically creates a GET request
    const fetchPro = fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // converting the result to json with json() method
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    // This automatically creates a POST request to send data to API
    const fetchPro = fetch(url, {
      method: 'POST',
      // headers are snippets texts which are like info about the request itself
      headers: {
        // with this line we tell the API in the request that the data we are going to send is going to be in the JSON format.
        'Content-Type': 'application/json',
      },
      // finally the payload of the request
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // converting the result to json with json() method
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
 */
