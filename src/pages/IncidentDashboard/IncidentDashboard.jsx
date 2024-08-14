import React, { useState, useEffect } from 'react';
import IncidentList from '../../components/IncidentList/IncidentList';
import CreateIncidentForm from '../../components/CreateIncidentForm/CreateIncidentForm'
import * as incidentAPI from '../../utilities/incidents-api';
import * as patrolAPI from '../../utilities/patrols-api';


export default function IncidentDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const [patrols, setPatrols] = useState([]);

    // consider using useContext to stop prop drilling patrol useState

    useEffect(() => {
        fetchIncidents();
        fetchPatrols();
    }, []);

    const fetchIncidents = async () => {
        try {
            const incidentsData = await incidentAPI.getIncidents();
            setIncidents(incidentsData);
        } catch (error) {
            console.error('Failed to fetch incidents:', error);
        }
    };

    const fetchPatrols = async () => {
        try {
            const patrolData = await patrolAPI.getPatrols();
            setPatrols(patrolData);
        } catch (error) {
            console.error('Error fetching patrols:', error);
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
                    patrols={patrols}
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