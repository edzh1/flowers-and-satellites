import { Base64 } from 'js-base64';
import queryString from 'query-string';

const API_HOST = 'https://api.cogniac.io';

export const api = {
  userAuth({ login, password }) {
    const credentials = Base64.encode(`${login}:${password}`);

    return fetch(`${API_HOST}/1/token`, {
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

    return fetch(`${API_HOST}/1/users/current/tenants?user_id=current`, {
      method: 'GET',
      headers: {
        Authorization: `${credentials}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Fetch tenants failure');
    });
  },
  tenantAuth({ tenantId, genericAccessToken }) {
    const credentials = `Bearer ${genericAccessToken}`;

    return fetch(`${API_HOST}/1/token?scope=all&tenant_id=${tenantId}`, {
      method: 'GET',
      headers: {
        Authorization: `${credentials}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Tenant auth failure');
    });
  },
  fetchSubjectMedia({ subjectId, accessToken, limit }) {
    const credentials = `Bearer ${accessToken}`;
    const filter = queryString.stringify({
      limit,
      probability_lower: 0.5,
      robability_upper: 1,
      reverse: true,
      sort: 'time',
    });

    return fetch(`${API_HOST}/1/subjects/${subjectId}/media?${filter}`, {
      method: 'GET',
      headers: {
        Authorization: `${credentials}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Fetch subject media failure');
    });
  },
  fetchMoreMedia({ url, accessToken }) {
    const credentials = `Bearer ${accessToken}`;

    return fetch(`${url}`, {
      method: 'GET',
      headers: {
        Authorization: `${credentials}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Fetch more media failure');
    });
  },
  getImage({ mediaUrl, accessToken }) {
    const credentials = `Bearer ${accessToken}`;

    return fetch(`${mediaUrl}`, {
      method: 'GET',
      headers: {
        Authorization: `${credentials}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.blob();
      }

      throw new Error('Fetch image failure');
    });
  },
};
