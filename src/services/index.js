import { Base64 } from 'js-base64';

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
  fetchSubjectMedia({ subjectId, accessToken, page, limit }) {
    const credentials = `Bearer ${accessToken}`;
    const filter = {
      limit,
      page,
      probability_lower: 0.5,
      robability_upper: 1,
      reverse: true,
      sort: 'time',
    };

    return fetch(`${API_HOST}/1/subjects/${subjectId}/media?${filter}`, {
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
};
