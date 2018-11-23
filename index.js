require('dotenv').config()
const request = require('request-promise');

const API_ENDPOINT = 'https://app.asana.com/api/1.0/';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

function callApi({ path, method = 'get' }) {
  return request({
    method,
    uri: `${API_ENDPOINT}${path}`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });
}

function getUsersMe() {
  return callApi({
    path: 'users/me'
  });
}

getUsersMe().then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});
