import { Base64 } from 'js-base64';

export const api = {
  userAuth({ login, password }) {
    const credentials = Base64.encode(`${login}:${password}`);

    return fetch('https://api.cogniac.io/1/token', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Login failure');
    });
  },
  fetchTenants(genericAccessToken) {
    const credentials = `Bearer ${genericAccessToken}`;

    return fetch('https://api.cogniac.io/1/users/current/tenants?user_id=current', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Fetch tenants failure');
    });
  },
};
