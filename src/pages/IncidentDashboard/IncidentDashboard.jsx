import React, { useState, useEffect } from 'react';
import IncidentList from '../../components/IncidentList/IncidentList';
import CreateIncidentForm from '../../components/CreateIncidentForm/CreateIncidentForm';
import EditIncidentForm from '../../components/EditIncidentForm/EditIncidentForm';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import * as incidentAPI from '../../utilities/incidents-api';
import * as patrolAPI from '../../utilities/patrols-api';

export default function IncidentDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const [patrols, setPatrols] = useState([]);
    const [editingIncident, setEditingIncident] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, incidentId: null });

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

    const handleDeleteClick = (incidentId) => {
        setConfirmDelete({ isOpen: true, incidentId });
    };

    const handleDeleteCancel = () => {
        setConfirmDelete({ isOpen: false, incidentId: null });
    };

    const handleDelete = async () => {
        if (confirmDelete.incidentId) {
            try {
                await incidentAPI.deleteIncident(confirmDelete.incidentId);
                fetchIncidents();
            } catch (error) {
                console.error('Error deleting incident:', error);
            }
        }
        setConfirmDelete({ isOpen: false, incidentId: null });
    };

    const handleEdit = (incident) => {
        setEditingIncident(incident);
        setShowForm(false);
    };

    const handleUpdate = async (updatedIncident) => {
        try {
            await incidentAPI.updateIncident(updatedIncident._id, updatedIncident);
            setEditingIncident(null);
            fetchIncidents();
        } catch (error) {
            console.error('Error updating incident:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {!showForm && !editingIncident && (
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingIncident(null);
                    }}
                    className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Create New Incident
                </button>
            )}

            {showForm && !editingIncident && (
                <CreateIncidentForm
                    patrols={patrols}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}
            {editingIncident && (
                <EditIncidentForm
                    incident={editingIncident}
                    patrols={patrols}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingIncident(null)}
                />
            )}

            <div className="incidents-list mt-8">
                <IncidentList
                    incidents={incidents}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                    title="Incidents"
                />
            </div>

            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                onConfirm={handleDelete}
                onCancel={handleDeleteCancel}
                message="Are you sure you want to delete this incident?"
            />
        </div>
    );
}