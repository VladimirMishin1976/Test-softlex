import { DEVELOPER_NAME, BASE_URL } from '../utlils//constants';

const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка: ${res.status}`);
}


export const getTasks = (params) => {
  return fetch(`${BASE_URL}?developer=${DEVELOPER_NAME}&page=${params}`)
    .then(checkResponse);
};

export const createTask = (task) => {
  return fetch(`${BASE_URL}create?developer=${DEVELOPER_NAME}`,
    {
      method: 'POST',
      body: task
    }).then(checkResponse);
}

export const login = (loginData) => {
  return fetch(`${BASE_URL}login?developer=${DEVELOPER_NAME}`,
    {
      method: 'POST',
      body: loginData
    }).then(checkResponse);
}

// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}edit/a?developer=${DEVELOPER_NAME}`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   }).then(checkResponse);
// }