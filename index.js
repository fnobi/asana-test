require('dotenv').config()
const request = require('request-promise');

const API_ENDPOINT = 'https://app.asana.com/api/1.0';
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
    path: '/users/me'
  });
}

function getProjects() {
  return callApi({
    path: '/projects'
  });
}

function getProjectsTasks(projectGid) {
  return callApi({
    path: `/projects/${projectGid}/tasks`
  });
}

function getProjectsSections(projectGid) {
  return callApi({
    path: `/projects/${projectGid}/sections`
  });
}

function getSectionsTasks(sectionGid) {
  return callApi({
    path: `/sections/${sectionGid}/tasks`
  });
}

Promise.resolve()
  .then(() => getProjectsSections(process.env.PROJECT_GID))
  .then((res) => {
    const json = JSON.parse(res);
    const firstSection = json.data[0];
    if (!firstSection) return Promise.reject('no section.');
    return getSectionsTasks(firstSection.gid);
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.error(err);
  });
