import { useState, useEffect } from 'react';
import sendRequest from '../../utilities/send-request';
import * as patrolAPI from '../../utilities/patrols-api'

export default function PatrolDashBoard() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        start_time: '',
        end_time: '',
        total_hours: 0
    });
    const [patrols, setPatrols] = useState([]);
    const [sortedPatrols, setSortedPatrols] = useState({ upcoming: [], completed: [] })

    useEffect(() => {
        fetchPatrols();
    }, []);

    useEffect(() => {
        setSortedPatrols(sortPatrols(patrols));
    }, [patrols]);

    useEffect(() => {
        setSortedPatrols(prevSorted => ({
            ...prevSorted,
            upcoming: [...prevSorted.upcoming].sort((a, b) => 
                new Date(a.start_time) - new Date(b.start_time)
            )
        }));
    }, [sortedPatrols.upcoming]);

    useEffect(() => {
        setSortedPatrols(prevSorted => ({
            ...prevSorted,
            completed: [...prevSorted.completed].sort((a, b) => 
                new Date(b.start_time) - new Date(a.start_time)
            )
        }));
    }, [sortedPatrols.completed]);

    const toggleForm = () => {
        setShowForm(!showForm)
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'total_hours' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            const data = await sendRequest('/api/patrols', 'POST', formData);
            setFormData({
                start_time: '',
                end_time: '',
                total_hours: ''
            });

            setShowForm(false);
            fetchPatrols();

        } catch (error) {
            console.error('Error creating patrol:', error);

        }
    };

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

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={toggleForm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                {showForm ? 'Cancel' : 'Create New Patrol'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="start_time" className="block text-gray-700 text-sm font-bold mb-2">Start Time:</label>
                        <input
                            type="datetime-local"
                            id="start_time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleForm}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="end_time" className="block text-gray-700 text-sm font-bold mb-2">End Time:</label>
                        <input
                            type="datetime-local"
                            id="end_time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleForm}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="total_hours" className="block text-gray-700 text-sm font-bold mb-2">Total Hours:</label>
                        <input
                            type="number"
                            id="total_hours"
                            name="total_hours"
                            value={formData.total_hours}
                            onChange={handleForm}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Create Patrol
                    </button>
                </form>
            )}

            <div className="patrols-list mt-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Upcoming Patrols</h2>
                {sortedPatrols.upcoming.length === 0 ? (
                    <p>No upcoming patrols.</p>
                ) : (
                    <ul className="space-y-4">
                        {sortedPatrols.upcoming.map((patrol) => (
                            <li key={patrol._id} className="border p-4 rounded-lg shadow bg-gray-100">
                                <p><strong>Start Time:</strong> {new Date(patrol.start_time).toLocaleString()}</p>
                                <p><strong>End Time:</strong> {new Date(patrol.end_time).toLocaleString()}</p>
                                <p><strong>Total Hours:</strong> {patrol.total_hours}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <h2 className="text-2xl font-bold mb-4 mt-8 text-blue-600">Completed Patrols</h2>
                {sortedPatrols.completed.length === 0 ? (
                    <p>No completed patrols.</p>
                ) : (
                    <ul className="space-y-4">
                        {sortedPatrols.completed.map((patrol) => (
                            <li key={patrol._id} className="border p-4 rounded-lg shadow bg-gray-100">
                                <p><strong>Start Time:</strong> {new Date(patrol.start_time).toLocaleString()}</p>
                                <p><strong>End Time:</strong> {new Date(patrol.end_time).toLocaleString()}</p>
                                <p><strong>Total Hours:</strong> {patrol.total_hours}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}