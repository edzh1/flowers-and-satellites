import { Base64 } from 'js-base64';

export const api = {
  authorize({ login, password }) {
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
};
