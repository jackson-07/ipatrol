import React, { useState, useEffect } from 'react';
import IncidentList from '../../components/IncidentList/IncidentList';
import CreateIncidentForm from '../../components/CreateIncidentForm/CreateIncidentForm'
import * as incidentAPI from '../../utilities/incidents-api';

export default function IncidentDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            const incidents = await incidentAPI.getIncidents();
            setIncidents(incidents);
        } catch (error) {
            console.error('Failed to fetch incidents:', error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await incidentAPI.createIncident(formData);
            setShowForm(false);
            fetchIncidents();
        } catch (error) {
            console.error('Error creating incident:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Create New Incident
                </button>
            )}

            {showForm && (
                <CreateIncidentForm 
                    incidents={incidents}
                    onSubmit={handleSubmit} 
                    onCancel={() => setShowForm(false)} 
                />
            )}

            <div className="incidents-list mt-8">
                <IncidentList
                    incidents={incidents}
                    title="Incidents"
                />
            </div>
        </div>
    );
}