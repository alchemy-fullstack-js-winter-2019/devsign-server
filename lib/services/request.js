import store from '../store';
import { getToken } from '../selectors/session';

const request = (path, method, body) => {
    return fetch(`${process.env.API_URL}${path}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        Authorization: `Bearer ${getToken(store.getState())}`
      }
    })
    .then(res => [res.ok, res.json()])
    .then(([ok, json]) => {
      if(!ok) throw 'ERROR';
      return json;
  });
};

export const post = (path, body) => request(path, 'POST', body);
export const get = (path, body) => request(path, 'GET', body);
