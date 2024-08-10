import sendRequest from './send-request';
const BASE_URL = '/api/patrols';

export function getPatrols() {
  return sendRequest(BASE_URL, 'GET');
}

