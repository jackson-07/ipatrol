import React, { useState, useEffect } from 'react';
import PatrolList from '../../components/PatrolList/PatrolList';
import EditPatrolForm from '../../components/EditPatrolForm/EditPatrolForm';
import CreatePatrolForm from '../../components/CreatePatrolForm/CreatePatrolForm';
import * as patrolAPI from '../../utilities/patrols-api';

export default function PatrolDashBoard() {
    const [showForm, setShowForm] = useState(false);
    const [patrols, setPatrols] = useState([]);
    const [sortedPatrols, setSortedPatrols] = useState({ upcoming: [], completed: [] });
    const [editingPatrol, setEditingPatrol] = useState(null);

    useEffect(() => {
        fetchPatrols();
    }, []);

    useEffect(() => {
        setSortedPatrols(sortPatrols(patrols));
    }, [patrols]);

    const fetchPatrols = async () => {
        try {
            const response = await patrolAPI.getPatrols();
            setPatrols(response);
        } catch (error) {
            console.error('Error fetching patrols:', error);
        }
    };

    const sortPatrols = (patrols) => {
        const now = new Date();
        return patrols.reduce((acc, patrol) => {
            const patrolStartDate = new Date(patrol.start_time);
            if (patrolStartDate > now) {
                acc.upcoming.push(patrol);
            } else {
                acc.completed.push(patrol);
            }
            return acc;
        }, { upcoming: [], completed: [] });
    };

    const handleSubmit = async (formData) => {
        try {
            await patrolAPI.createPatrol(formData);
            setShowForm(false);
            fetchPatrols();
        } catch (error) {
            console.error('Error creating patrol:', error);
        }
    };

    const handleDelete = async (patrolId) => {
        try {
            await patrolAPI.deletePatrol(patrolId);
            fetchPatrols();
        } catch (error) {
            console.error('Error deleting patrol:', error);
        }
    };

    const handleEdit = (patrol) => {
        setEditingPatrol(patrol);
        setShowForm(false);
    };

    const handleUpdate = async (updatedPatrol) => {
        try {
            await patrolAPI.updatePatrol(updatedPatrol._id, updatedPatrol);
            setEditingPatrol(null);
            fetchPatrols();
        } catch (error) {
            console.error('Error updating patrol:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {!showForm && !editingPatrol && (
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingPatrol(null);
                    }}
                    className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Create New Patrol
                </button>
            )}

            {showForm && !editingPatrol && (
                <CreatePatrolForm 
                    onSubmit={handleSubmit} 
                    onCancel={() => setShowForm(false)} 
                />
            )}
            {editingPatrol && (
                <EditPatrolForm
                    patrol={editingPatrol}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingPatrol(null)}
                />
            )}

            <div className="patrols-list mt-8">
                <PatrolList
                    patrols={sortedPatrols.upcoming}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    title="Upcoming Patrols"
                />
                <br />
                <PatrolList
                    patrols={sortedPatrols.completed}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    title="Completed Patrols"
                />
            </div>
        </div>
    );
}

