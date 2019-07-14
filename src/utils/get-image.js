import { api } from '../services';

export default async function getImage(mediaUrl) {
  const tenantToken = localStorage.getItem('tenantToken');
  const mediaBlob = await api.getImage({ mediaUrl, accessToken: tenantToken });
  return mediaBlob.size > 1000
    ? { url: URL.createObjectURL(mediaBlob), isLoading: false }
    : {
        url: '',
        isLoading: false,
      };
}
