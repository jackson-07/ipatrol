import React, { useState, useEffect } from 'react';
import PatrolForm from '../../components/PatrolForm/PatrolForm';
import PatrolList from '../../components/PatrolList/PatrolList';
import * as patrolAPI from '../../utilities/patrols-api';

export default function PatrolDashBoard() {
    const [showForm, setShowForm] = useState(false);
    const [patrols, setPatrols] = useState([]);
    const [sortedPatrols, setSortedPatrols] = useState({ upcoming: [], completed: [] });

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

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                {showForm ? 'Back' : 'Create New Patrol'}
            </button>

            {showForm && <PatrolForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />}

            <div className="patrols-list mt-8">
                <PatrolList
                    patrols={sortedPatrols.upcoming}
                    onDelete={handleDelete}
                    title="Upcoming Patrols"
                />
                <br />
                <PatrolList
                    patrols={sortedPatrols.completed}
                    onDelete={handleDelete}
                    title="Completed Patrols"
                />
            </div>
        </div>
    );
}
