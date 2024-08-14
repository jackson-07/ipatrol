import sendRequest from './send-request';
const BASE_URL = '/api/incidents';

export function getIncidents() {
    return sendRequest(BASE_URL, 'GET');
  }
  
  export function createIncident(incidentData) {
    return sendRequest(BASE_URL, 'POST', incidentData);
  }
  
  export function deleteIncident(incidentId) {
    return sendRequest(`${BASE_URL}/${incidentId}`, 'DELETE');
  }
  
  export function updateIncident(incidentId, incidentData) {
      return sendRequest(`${BASE_URL}/${incidentId}`, 'PUT', incidentData);
  }