import sendRequest from './send-request';
const BASE_URL = '/api/patrols';

export function getPatrols() {
  return sendRequest(BASE_URL, 'GET');
}

export function createPatrol(patrolData) {
  return sendRequest(BASE_URL, 'POST', patrolData);
}

export function deletePatrol(patrolId) {
  return sendRequest(`${BASE_URL}/${patrolId}`, 'DELETE');
}

export function updatePatrol(patrolId, patrolData) {
    return sendRequest(`${BASE_URL}/${patrolId}`, 'PUT', patrolData);
}